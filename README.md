# Shikanaverse Trip Calculator

An interstellar trip calculator for the Shikanaverse science fiction RPG.

## Features

- **Distance Input**: Enter your desired travel distance in light-years
- **Warp Factor Support**: Input warp factor (1.0+) for your ship
- **Automatic Speed Calculation**: Calculates actual speed in multiples of light speed (c) using the formula: Speed = (Warp Factor)³
- **Travel Time Calculation**: Computes how long your journey will take
- **Flexible Time Display**: Shows results in hours, days, years, or millennia as appropriate

## How It Works

### The Physics

The calculator uses a simple warp factor system:
- **Warp Factor Formula**: Speed in c = (warp factor)³
- **Travel Time**: Time = Distance (light-years) / Speed (in c)

### Example Calculations

| Warp Factor | Speed (c) | Distance (ly) | Travel Time |
|---|---|---|---|
| 1 | 1c | 10 | 10 years |
| 2 | 8c | 10 | 1.25 years |
| 3 | 27c | 100 | 3.7 years |
| 5 | 125c | 1000 | 8 years |

## Usage

1. Open `index.html` in your web browser
2. Enter the distance in light-years
3. Enter your ship's warp factor
4. Click "Calculate Trip Time"
5. View your travel time and journey details

## File Structure

- `index.html` - Main HTML structure
- `styles.css` - Styling with sci-fi theme
- `script.js` - Calculator logic and event handling
- `README.md` - Documentation

## Browser Compatibility

Works in all modern browsers that support:
- HTML5
- CSS3 (including backdrop-filter)
- JavaScript ES6+

## Future Enhancements

- Add fuel consumption calculations
- Support for relativistic effects
- Save favorite routes
- Multiple ship presets
- Distance presets for famous locations
