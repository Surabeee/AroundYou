# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/f34e3a91-e821-4705-9e65-257dcf59254e

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f34e3a91-e821-4705-9e65-257dcf59254e) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Express.js (Backend)
- Mapbox API (Geocoding & Mapping)
- Google Gemini AI (Place Suggestions)

## Environment Setup

To run this project locally, you'll need to set up the following environment variables:

Create a `.env` file in the root directory with:

```env
# Mapbox API Key for geocoding and mapping
MAPBOX_TOKEN=your_mapbox_token_here

# Google Gemini API Key for AI place suggestions
GEMINI_API_KEY=your_gemini_api_key_here

# Server port (optional, defaults to 5000)
PORT=5000
```

### Getting API Keys:

1. **Mapbox Token**: Sign up at [Mapbox](https://www.mapbox.com/) and get your access token
2. **Gemini API Key**: Get your API key from [Google AI Studio](https://aistudio.google.com/) (free tier available)

The app will fallback to Mapbox Search Box API if Gemini API is not available.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/f34e3a91-e821-4705-9e65-257dcf59254e) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
