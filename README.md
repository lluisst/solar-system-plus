# Solar System Plus

A 3D interactive model of the solar system using Three.js.

## Features
- Accurate relative sizes and orbits (scaled for clarity)
- Realistic orbital inclinations for planets and moons
- Saturn's and Uranus' rings correctly tilted
- Earth's axis accurately tilted
- Textured Sun, planets, and rings
- Interactive 3D controls (rotate, zoom, pan)
- Animated planetary and lunar orbits with adjustable speed
- Optional: orbit trails, time control
- Overlay with localized planet/moon data and surface image
- Full localization (Catalan, Spanish, English, French)
- Responsive, modern UI

## Overlay Redesign (NEW)
- Overlay displays all data left-aligned, with smaller text
- Surface image shown at the top right (for planets and moons)
- No more 'Surface View' button: image always visible if available
- Overlay adapts to language changes

## Getting Started
1. Install dependencies: `npm install`
2. Start local server: `npm start`
3. Open `http://localhost:3000` (or the shown port) in your browser

## Project Structure
- `index.html`: Main HTML file
- `style.css`: Basic styles
- `src/`: JavaScript modules (main logic, UI, rendering)
- `src/assets/`: Textures and surface images

## Adding Surface Images
To add or update surface images, place a file named `<planet|moon>_surface.jpg` in `src/assets/` (e.g. `mars_surface.jpg`, `moon_surface.jpg`).

## License
MIT
