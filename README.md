# Shikanaverse Trip Calculator

An interstellar trip calculator for the Shikanaverse science fiction worldbuilding project and RPG.

The web app can be found at: https://emperorjake.github.io/shikanaverse-trip-calculator/

## Features

- **Dual Distance Units**: Enter distance in either Earth light-years or Pamaruk light-years
  - 1 Pamaruk light-year = 1.28 Earth light-years
- **Warp Factor Support**: Input warp factor (1.0+) for your ship
- **Automatic Speed Calculation**: Calculates actual speed in multiples of light speed (c) using the formula: Speed = (Warp Factor)³
- **Travel Time Calculation**: Computes how long your journey will take
- **Dual Output Display**: Shows results in both Earth and Pamaruk light-years
- **Flexible Time Display**: Shows results in hours, days, years, or millennia as appropriate

## How It Works

### The Physics

The calculator uses a simple warp factor system:
- **Warp Factor Formula**: Speed in c = (warp factor)³
- **Travel Time**: Time = Distance (light-years) / Speed (in c)

### Distance Conversion

- **1 Pamaruk light-year = 1.28 Earth light-years**
- Input either unit, and the calculator will show results in both!

### Example Calculations

| Distance Input | Warp Factor | Speed (c) | Travel Time |
|---|---|---|---|
| 10 Earth ly | 1 | 1c | 10 years |
| 10 Earth ly | 2 | 8c | 1.25 years |
| 100 Pamaruk ly (128 Earth ly) | 3 | 27c | 4.74 years |
| 1000 Earth ly | 5 | 125c | 8 years |

## Usage

1. Open `index.html` in your web browser
2. Enter the distance (in either Earth or Pamaruk light-years)
3. Select your preferred unit from the dropdown
4. Enter your ship's warp factor
5. Click "Calculate Trip Time"
6. View your travel time and journey details in both measurement systems

## File Structure

- `index.html` - Main HTML structure with unit selector
- `styles.css` - Styling with sci-fi theme
- `script.js` - Calculator logic with unit conversion
- `README.md` - Documentation

## Browser Compatibility

Works in all modern browsers that support:
- HTML5
- CSS3 (including backdrop-filter)
- JavaScript ES6+

## Future Enhancements

- Shikanaverse Time Units
- Acceleration Factor
- Multiple ship presets
- Distance presets for famous locations in the Shikanaverse
