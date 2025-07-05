import 'dotenv/config';
import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Helper: Get POIs by category near location (keeping for fallback)
async function getPOIs({ lng, lat, categories, limit = 10 }) {
  const categoriesStr = categories.join(',');
  const url = `https://api.mapbox.com/search/searchbox/v1/category/${encodeURIComponent(categoriesStr)}?proximity=${lng},${lat}&limit=${limit}&access_token=${MAPBOX_TOKEN}`;
  const res = await axios.get(url);
  return res.data.features;
}

// Helper: Filter POIs by travel time using Directions API
async function filterByTravelTime(origin, pois, mode = 'walking', maxMinutes = 10) {
  const filtered = [];
  for (const poi of pois) {
    const dest = poi.geometry.coordinates;
    const url = `https://api.mapbox.com/directions/v5/mapbox/${mode}/${origin[0]},${origin[1]};${dest[0]},${dest[1]}?access_token=${MAPBOX_TOKEN}`;
    const res = await axios.get(url);
    const duration = res.data.routes[0]?.duration || Infinity;
    if (duration / 60 <= maxMinutes) filtered.push(poi);
  }
  return filtered;
}

// New: Get place suggestions from Gemini AI
async function getGeminiSuggestions(location, radius, interests, transport) {
  try {
    console.log('🤖 Sending request to Gemini AI:');
    console.log(`📍 Location: ${location}`);
    console.log(`📏 Radius: ${radius} km`);
    console.log(`🎯 Interests: ${interests.join(', ')}`);
    console.log(`🚗 Transport: ${transport}`);
    console.log('---');
    
    const prompt = `[System Instruction: You are a helpful local travel expert who specializes in curating unique, vibe-based itineraries for people exploring urban neighborhoods.]

[User Input]  
Location: ${location}  
Radius: ${radius} km  
Interests: ${interests.join(', ')}  
Transport: ${transport}

[Task]  
Based on the input above, suggest a curated **mini-itinerary** of exactly **3 to 4 interesting, real places** in or around the given area that match the user's interests.

🔸 Avoid suggesting generic, commercial, or chain places that can be found in many cities (e.g., Starbucks, Third Wave, CCD, etc.).  
🔸 Instead, focus on **unique, locally loved, or culturally relevant places** that reflect the vibe of the area.  
🔸 The itinerary should feel fresh, fun, and rooted in the identity of the place — like something a local would recommend to a friend visiting for the first time.

[Output Instructions]  
- Present your output in **valid JSON only**.  
- List places in the order they could be visited (based on transport).  
- For each place, include only:
  - \`name\`: the name of the place  
  - \`description\`: a one-line explanation of why it's interesting  
- Include \`transport\` at the end to confirm the mode of travel.

[Output Format – JSON ONLY]
{
  "itinerary": [
    {
      "name": "Place 1",
      "description": "..."
    },
    {
      "name": "Place 2", 
      "description": "..."
    },
    {
      "name": "Place 3",
      "description": "..."
    }
  ],
  "transport": "${transport}"
}`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      }
    );

    const content = response.data.candidates[0].content.parts[0].text;
    
    // Log the raw Gemini response
    console.log('🔍 Raw Gemini Response:');
    console.log(content);
    console.log('---');
    
    // Extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('❌ No valid JSON found in Gemini response');
      throw new Error('No valid JSON found in Gemini response');
    }
    
    const parsedResponse = JSON.parse(jsonMatch[0]);
    console.log('✅ Parsed Gemini Response:');
    console.log(JSON.stringify(parsedResponse, null, 2));
    console.log('---');
    
    return parsedResponse;
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to get AI suggestions');
  }
}

// New: Geocode place names to get coordinates
async function geocodePlaces(placeNames, location) {
  const geocodedPlaces = [];
  
  for (const placeName of placeNames) {
    try {
      // Add location context to improve geocoding accuracy
      const searchQuery = `${placeName}, ${location}`;
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${MAPBOX_TOKEN}&limit=1`;
      const response = await axios.get(url);
      
      if (response.data.features && response.data.features.length > 0) {
        const feature = response.data.features[0];
        geocodedPlaces.push({
          name: placeName,
          coordinates: feature.geometry.coordinates,
          address: feature.place_name,
          description: feature.description || ''
        });
      } else {
        console.warn(`Could not geocode: ${placeName}`);
      }
    } catch (error) {
      console.error(`Error geocoding ${placeName}:`, error);
    }
  }
  
  return geocodedPlaces;
}

// Main endpoint - Updated to use hybrid approach
app.post('/api/places', async (req, res) => {
  try {
    const { lng, lat, interests, transport, radius, maxResults = 8 } = req.body;
    
    // Get location name for context (reverse geocode if needed)
    let locationName = req.body.location || 'the area';
    if (!req.body.location && lng && lat) {
      try {
        const geoRes = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}&limit=1`
        );
        if (geoRes.data.features && geoRes.data.features.length > 0) {
          locationName = geoRes.data.features[0].place_name.split(',')[0];
        }
      } catch (error) {
        console.warn('Could not reverse geocode location');
      }
    }

    let places = [];
    
    // Try Gemini AI approach first
    if (GEMINI_API_KEY) {
      try {
        console.log('Using Gemini AI for place suggestions...');
        const suggestions = await getGeminiSuggestions(locationName, radius, interests, transport);
        const placeNames = suggestions.itinerary.map(item => item.name);
        
        // Geocode the suggested places
        const geocodedPlaces = await geocodePlaces(placeNames, locationName);
        
        // Combine AI suggestions with geocoded data
        places = suggestions.itinerary.map((item, index) => {
          const geocoded = geocodedPlaces.find(p => p.name === item.name);
          return {
            name: item.name,
            description: item.description,
            address: geocoded?.address || '',
            geometry: {
              coordinates: geocoded?.coordinates || [lng, lat]
            },
            category: interests[0] || 'attraction'
          };
        }).filter(place => place.geometry.coordinates[0] !== lng || place.geometry.coordinates[1] !== lat);
        
        console.log(`✅ Gemini AI suggested ${places.length} places:`);
        places.forEach((place, index) => {
          console.log(`  ${index + 1}. ${place.name} - ${place.description}`);
          console.log(`     📍 ${place.address}`);
          console.log(`     🗺️  [${place.geometry.coordinates[0]}, ${place.geometry.coordinates[1]}]`);
        });
        console.log('---');
      } catch (error) {
        console.error('Gemini AI failed, falling back to Mapbox:', error);
      }
    }
    
    // Fallback to original Mapbox approach if Gemini fails or no API key
    if (places.length === 0) {
      console.log('Using Mapbox Search Box API...');
      const categories = interests.length ? interests : ['cafe', 'park', 'museum', 'restaurant'];
      const mode = transport === 'walking' ? 'walking' : 'driving';
      const maxMinutes = mode === 'walking' ? 12 : 8;
      
      // 1. Get POIs by category
      let pois = await getPOIs({ lng, lat, categories, limit: 20 });
      // 2. Filter by travel time
      pois = await filterByTravelTime([lng, lat], pois, mode, maxMinutes);
      // 3. Limit and curate
      places = pois.slice(0, maxResults);
    }
    
    res.json({ places });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch places' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 