
const {parse} = require("csv-parse");
const fs = require("fs");

let result = [];

fs.createReadStream("kepler_data.csv")
.on('data', (data) => {
    result.push(data);
})
.on("error", (err) => {
    console.error("Error reading file: ", err);
})
.on("end", () => {
    console.log("File read started....");
    console.log("File:", result);
    console.log("File read complete.");
})
