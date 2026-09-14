/**
 * Warp Calculator Functions
 */

// Conversion constant: 1 Pamaruk light year = 1.28 Earth light years
const PAMARUK_TO_EARTH = 1.28;

// Current starship index
let currentShipIndex = 0;

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
 * Calculate speed in c from warp factor
 * Speed in c = (warp factor)³
 * @param {number} warpFactor - The warp factor (e.g., 1, 2, 3)
 * @returns {number} Speed in multiples of the speed of light (c)
 */
function calculateSpeedInC(warpFactor) {
    return Math.pow(warpFactor, 3);
}

/**
 * Calculate warp factor from speed in c
 * Warp factor = ∛(speed in c)
 * @param {number} speedInC - Speed in multiples of c
 * @returns {number} Warp factor
 */
function calculateWarpFactor(speedInC) {
    return Math.cbrt(speedInC);
}

/**
 * Get the maximum allowed value for the selected speed mode.
 * @returns {number} Maximum warp factor or maximum speed in c
 */
function getCurrentShipSpeedLimit() {
    const ship = STARSHIPS[currentShipIndex];
    const speedMode = document.getElementById('speedMode').value;

    return speedMode === 'warp'
        ? ship.maxWarp
        : calculateSpeedInC(ship.maxWarp);
}

/**
 * Get the selected ship's cruise speed for the selected speed mode.
 * @returns {number} Cruise warp factor or cruise speed in c
 */
function getCurrentShipCruiseSpeed() {
    const ship = STARSHIPS[currentShipIndex];
    const speedMode = document.getElementById('speedMode').value;

    return speedMode === 'warp'
        ? ship.cruiseWarp
        : calculateSpeedInC(ship.cruiseWarp);
}

/**
 * Fill the speed input with the selected ship's cruise speed.
 */
function setSpeedInputToCruise() {
    document.getElementById('speedInput').value = getCurrentShipCruiseSpeed();
}

/**
 * Apply the selected ship's maximum speed to the speed input.
 */
function updateSpeedInputLimit() {
    if (STARSHIPS.length === 0) return;

    const speedInput = document.getElementById('speedInput');
    const speedMode = document.getElementById('speedMode').value;
    const maximum = getCurrentShipSpeedLimit();

    speedInput.max = maximum;

    if (speedInput.value !== '' && Number(speedInput.value) > maximum) {
        speedInput.value = maximum;
    }

    return speedMode === 'warp'
        ? `Maximum for this ship: Warp ${maximum}`
        : `Maximum for this ship: ${maximum.toLocaleString()}c (Warp ${STARSHIPS[currentShipIndex].maxWarp})`;
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
 * Break a duration into digital-clock time units.
 * @param {number} years - Time in years
 * @returns {{years: number, days: number, hours: number, minutes: number}}
 */
function getTimeComponents(years) {
    const minutesPerHour = 60;
    const minutesPerDay = 24 * minutesPerHour;
    const minutesPerYear = 365.25 * minutesPerDay;
    let remainingMinutes = Math.round(years * minutesPerYear);

    const wholeYears = Math.floor(remainingMinutes / minutesPerYear);
    remainingMinutes -= wholeYears * minutesPerYear;

    const days = Math.floor(remainingMinutes / minutesPerDay);
    remainingMinutes -= days * minutesPerDay;

    const hours = Math.floor(remainingMinutes / minutesPerHour);
    const minutes = remainingMinutes % minutesPerHour;

    return { years: wholeYears, days, hours, minutes };
}

/**
 * Update the speed input label based on selected mode
 */
function updateSpeedLabel() {
    const speedMode = document.getElementById('speedMode').value;
    const speedLabel = document.getElementById('speedHelp');
    const inputPlaceholder = document.getElementById('speedInput');
    const limitText = updateSpeedInputLimit();
    
    if (speedMode === 'warp') {
        speedLabel.textContent = `Speed in c = (warp factor)³. ${limitText}`;
        inputPlaceholder.placeholder = 'Enter warp factor';
    } else {
        speedLabel.textContent = `Warp factor = ∛(speed in c). ${limitText}`;
        inputPlaceholder.placeholder = 'Enter speed in c';
    }
}

/**
 * Refresh the speed field when its unit changes.
 */
function handleSpeedModeChange() {
    updateSpeedLabel();
    setSpeedInputToCruise();
}

/**
 * Display the current starship
 */
function displayCurrentShip() {
    if (STARSHIPS.length === 0) return;
    
    const ship = STARSHIPS[currentShipIndex];
    document.getElementById('shipImage').src = ship.image;
    document.getElementById('shipName').textContent = ship.name;
    document.getElementById('shipBuilder').textContent = ship.builder;
    document.getElementById('shipBuildYear').textContent = ship.buildYear;
    document.getElementById('shipType').textContent = ship.type;
    document.getElementById('shipEngineClass').textContent = ship.engineClass;
    document.getElementById('shipLength').textContent = ship.shipLengthMetres;
    document.getElementById('shipMaxWarp').textContent = ship.maxWarp;
    document.getElementById('shipCruiseWarp').textContent = ship.cruiseWarp;
    updateSpeedLabel();
}

/**
 * Navigate to the next starship
 */
function nextShip() {
    currentShipIndex = (currentShipIndex + 1) % STARSHIPS.length;
    displayCurrentShip();
    setSpeedInputToCruise();
}

/**
 * Navigate to the previous starship
 */
function prevShip() {
    currentShipIndex = (currentShipIndex - 1 + STARSHIPS.length) % STARSHIPS.length;
    displayCurrentShip();
    setSpeedInputToCruise();
}

/**
 * Main calculation and display
 */
function calculateTrip() {
    const distance = parseFloat(document.getElementById('distance').value);
    const distanceUnit = document.getElementById('distanceUnit').value;
    const speedMode = document.getElementById('speedMode').value;
    const speedInput = parseFloat(document.getElementById('speedInput').value);
    const maximumSpeedInput = getCurrentShipSpeedLimit();
    
    // Validate inputs
    if (isNaN(distance) || isNaN(speedInput) || distance < 0 || speedInput <= 0) {
        alert('Please enter valid positive numbers');
        return;
    }

    if (speedInput > maximumSpeedInput) {
        const unit = speedMode === 'warp' ? 'warp' : 'c';
        alert(`The selected ship's maximum speed is ${maximumSpeedInput.toLocaleString()} ${unit}.`);
        return;
    }
    
    // Convert to Earth light years
    const distanceEarthLy = convertToEarthLightYears(distance, distanceUnit);
    const distanceParamukLy = convertToParamukLightYears(distanceEarthLy);
    
    // Calculate speed in c and warp factor based on input mode
    let speedInC, warpFactor;
    if (speedMode === 'warp') {
        warpFactor = speedInput;
        speedInC = calculateSpeedInC(warpFactor);
    } else {
        speedInC = speedInput;
        warpFactor = calculateWarpFactor(speedInC);
    }
    
    // Perform travel time calculation
    const travelTime = calculateTravelTime(distanceEarthLy, speedInC);
    const time = getTimeComponents(travelTime);
    
    // Display results - always show both warp factor and speed in c
    document.getElementById('resultDistanceEarth').textContent = `${distanceEarthLy.toFixed(2)} LY`;
    document.getElementById('resultDistanceParamuk').textContent = `${distanceParamukLy.toFixed(2)} PLY`;
    document.getElementById('resultWarpFactor').textContent = `Wp ${warpFactor.toFixed(2)}`;
    document.getElementById('resultSpeed').textContent = `${speedInC.toFixed(2)}c`;
    document.getElementById('resultYears').textContent = String(time.years);
    document.getElementById('resultDays').textContent = String(time.days).padStart(3, '0');
    document.getElementById('resultHours').textContent = String(time.hours).padStart(2, '0');
    document.getElementById('resultMinutes').textContent = String(time.minutes).padStart(2, '0');
    
    // Show result section
    document.getElementById('result').classList.remove('hidden');
}

// Event listeners
document.getElementById('calculatorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateTrip();
});

document.getElementById('speedMode').addEventListener('change', handleSpeedModeChange);

document.getElementById('nextShip').addEventListener('click', nextShip);
document.getElementById('prevShip').addEventListener('click', prevShip);

// Initialize on page load
window.addEventListener('DOMContentLoaded', function() {
    updateSpeedLabel();
    displayCurrentShip();
    setSpeedInputToCruise();
});
