/**
 * Starships Database
 * Add new starships by adding objects to this array
 * Template:
 * {
 *     name: "Ship Name",
 *     class: "Ship Class",
 *     maxWarp: 5,
 *     image: "ships/ship-name.png"
 * }
 */

const STARSHIPS = [
    {
        name: "Space Cruiser 1",
        builder: "Stardrive Guild",
        buildYear: "1463",
        type: "Experimental",
        engineClass: "Y",
        shipLengthMetres: "42m",
        maxWarp: 5,
        cruiseWarp: 2,
        image: "ships/sg_sc1.png"
    },
    {
        name: "PSY Courier Ship",
        builder: "Pamaruk Ship Yards",
        buildYear: "1700",
        type: "Couier",
        engineClass: "X",
        shipLengthMetres: "41m",
        maxWarp: 25,
        cruiseWarp: 20,
        image: "ships/psy_courier_ship.png"
    },
    {
        name: "PSY Breadbox",
        builder: "Pamaruk Ship Yards",
        buildYear: "2900",
        type: "Freighter",
        engineClass: "X",
        shipLengthMetres: "75m",
        maxWarp: 50,
        cruiseWarp: 40,
        image: "ships/psy_breadbox.png"
    },
    {
        name: "TSI General Mk1",
        builder: "Tarco Starship Industries",
        buildYear: "2707",
        type: "Transport",
        engineClass: "A",
        shipLengthMetres: "50m",
        maxWarp: 60,
        cruiseWarp: 50,
        image: "ships/tsi_general_mk1.png"
    }
    // Add more starships below this line
];
