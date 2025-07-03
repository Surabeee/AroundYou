import 'dotenv/config';
import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

// Helper: Get POIs by category near location
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

// Main endpoint
app.post('/api/places', async (req, res) => {
  try {
    const { lng, lat, interests, transport, radius, maxResults = 8 } = req.body;
    // Map interests to Mapbox categories
    const categories = interests.length ? interests : ['cafe', 'park', 'museum', 'restaurant'];
    const mode = transport === 'walking' ? 'walking' : 'driving';
    const maxMinutes = mode === 'walking' ? 12 : 8;
    // 1. Get POIs by category
    let pois = await getPOIs({ lng, lat, categories, limit: 20 });
    // 2. Filter by travel time
    pois = await filterByTravelTime([lng, lat], pois, mode, maxMinutes);
    // 3. Limit and curate
    pois = pois.slice(0, maxResults);
    res.json({ places: pois });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch places' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 