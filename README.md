# Interactive Running Shoe Finder

A free static website that ranks 100+ running shoes based on goal, foot fit, and training focus.

## Files
- `index.html` - Main HTML structure
- `styles.css` - Styling and responsive design
- `script.js` - Interactive filtering and sorting logic
- `data.js` - Shoe database with scores

## Features
- ✅ Filter shoes by training goal (daily, speed, long distance, recovery, racing)
- ✅ Filter by foot width (narrow, medium, wide)
- ✅ Filter by training focus (cushion, speed, stability, value)
- ✅ Real-time sorting by relevance
- ✅ Detailed scoring for 10 different metrics per shoe
- ✅ Responsive design for mobile, tablet, and desktop
- ✅ Beautiful UI with gradient backgrounds and hover effects

## Free Hosting Options

### Option 1: GitHub Pages (Recommended)
1. Go to Settings → Pages
2. Under "Build and deployment", select:
   - Source: `Deploy from a branch`
   - Branch: `main` and `/root`
3. Save. GitHub will generate a public link in 1-2 minutes

### Option 2: Cloudflare Pages
1. Go to https://pages.cloudflare.com/
2. Create a new project
3. Connect your GitHub repo
4. Cloudflare will give you a public URL you can share

## Editing Shoes

Open `data.js` to add or modify shoes. Each shoe object includes:

```javascript
{
    id: 1,
    name: "Shoe Name",
    brand: "Brand",
    width: "medium", // narrow, medium, or wide
    scores: {
        width: 7,       // How well it fits the width (1-10)
        cushion: 7,     // Cushioning level (1-10)
        speed: 7,       // Responsiveness for speed (1-10)
        stability: 6,   // Lateral support (1-10)
        value: 8,       // Price-to-quality ratio (1-10)
        longrun: 8,     // Good for long distances (1-10)
        daily: 9,       // Good for daily training (1-10)
        recovery: 7,    // Good for easy/recovery runs (1-10)
        tempo: 8,       // Good for tempo runs (1-10)
        race: 6         // Good for racing (1-10)
    },
    tags: ["daily", "speed", "longrun"] // Categories the shoe fits
}
```

## Available Tags
- **Training Goals**: `daily`, `speed`, `longrun`, `recovery`, `race`
- **Focus Areas**: `cushion`, `speed`, `stability`, `value`
- **Fit**: `narrow`, `medium`, `wide`

## Customization

### Change colors
Edit the gradient in `styles.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Add more shoes
Simply add new shoe objects to the `shoes` array in `data.js`. The filtering logic will automatically work with any number of shoes.

### Modify scoring categories
Update the `goalMap` and `focusMap` objects in `script.js` to add or rename categories.

## License
Free to use and modify for any purpose.