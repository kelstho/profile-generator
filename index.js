const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const util = require("util");

//const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            message: "Enter your Github username:",
            name: "username"
        },
        {
            type: "input",
            message: "Enter your favorite color:",
            name: "color"
        }
    ]);
}

promptUser();

// function writeFile(fileName, data) {
 
// }

// function init() {

// init();
