/**
 * Warp Calculator Functions
 */

// Conversion constant: 1 Pamaruk light year = 1.28 Earth light years
const PAMARUK_TO_EARTH = 1.28;

/**
 * Convert distance to Earth light years
 * @param {number} distance - The distance value
 * @param {string} unit - The unit ('earth' or 'pamaruk')
 * @returns {number} Distance in Earth light years
 */
function convertToEarthLightYears(distance, unit) {
    if (unit === 'pamaruk') {
        return distance * PAMARUK_TO_EARTH;
    }
    return distance;
}

/**
 * Convert Earth light years to Pamaruk light years
 * @param {number} earthLightYears - Distance in Earth light years
 * @returns {number} Distance in Pamaruk light years
 */
function convertToParamukLightYears(earthLightYears) {
    return earthLightYears / PAMARUK_TO_EARTH;
}

/**
 * Calculate speed in light-years per year based on warp factor
 * Speed in c = (warp factor)³
 * @param {number} warpFactor - The warp factor (e.g., 1, 2, 3)
 * @returns {number} Speed in multiples of the speed of light (c)
 */
function calculateSpeedInC(warpFactor) {
    return Math.pow(warpFactor, 3);
}

/**
 * Calculate travel time
 * @param {number} distanceLightYears - Distance in light years
 * @param {number} speedInC - Speed in multiples of c
 * @returns {number} Time in years
 */
function calculateTravelTime(distanceLightYears, speedInC) {
    if (speedInC === 0) return Infinity;
    return distanceLightYears / speedInC;
}

/**
 * Format time in years to a readable string
 * @param {number} years - Time in years
 * @returns {string} Formatted time string
 */
function formatTime(years) {
    if (!isFinite(years)) return "∞ (No movement)";
    
    if (years < 1) {
        const days = years * 365.25;
        if (days < 1) {
            const hours = days * 24;
            return `${hours.toFixed(2)} hours`;
        }
        return `${days.toFixed(2)} days`;
    }
    
    if (years < 1000) {
        return `${years.toFixed(2)} years`;
    }
    
    const millennia = years / 1000;
    return `${millennia.toFixed(3)} millennia`;
}

/**
 * Main calculation and display
 */
function calculateTrip() {
    const distance = parseFloat(document.getElementById('distance').value);
    const distanceUnit = document.getElementById('distanceUnit').value;
    const warpFactor = parseFloat(document.getElementById('warpFactor').value);
    
    // Validate inputs
    if (isNaN(distance) || isNaN(warpFactor) || distance < 0 || warpFactor < 0) {
        alert('Please enter valid positive numbers');
        return;
    }
    
    // Convert to Earth light years
    const distanceEarthLy = convertToEarthLightYears(distance, distanceUnit);
    const distanceParamukLy = convertToParamukLightYears(distanceEarthLy);
    
    // Perform calculations
    const speedInC = calculateSpeedInC(warpFactor);
    const travelTime = calculateTravelTime(distanceEarthLy, speedInC);
    
    // Display results
    document.getElementById('resultDistanceEarth').textContent = `${distanceEarthLy.toFixed(2)} ly`;
    document.getElementById('resultDistanceParamuk').textContent = `${distanceParamukLy.toFixed(2)} ly`;
    document.getElementById('resultWarpFactor').textContent = `${warpFactor.toFixed(2)}`;
    document.getElementById('resultSpeed').textContent = `${speedInC.toFixed(2)}c`;
    document.getElementById('resultTime').textContent = formatTime(travelTime);
    
    // Show result section
    document.getElementById('result').classList.remove('hidden');
}

// Event listener
document.getElementById('calculatorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateTrip();
});
