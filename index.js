
const {parse} = require("csv-parse");
const fs = require("fs");

const habtabilePlanets = [];

function isHabitablePlanet(planet){
    return planet["koi_disposition"] === "CONFIRMED" && planet["koi_insol"] > 0.36 && planet["koi_insol"] < 1.11
    && planet["koi_prad"] < 1.6;
}

fs.createReadStream("kepler_data.csv")
.pipe(parse({
    comment: "#",
    columns: true,
})) 
.on('data', (data) => {
    if (isHabitablePlanet(data)) {
        habtabilePlanets.push(data);
    }
})
.on("error", (err) => {
    console.error("Error reading file: ", err);
})
.on("end", () => {
    console.log(habtabilePlanets.map(planet => planet["kepler_name"]));
    console.log(`Data: ${habtabilePlanets.length} of planets found.`);
    console.log("File read complete.");
})
