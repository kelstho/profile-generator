const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const util = require("util");

//const writeFileAsync = util.promisify(fs.writeFile);

inquirer.prompt({
        message: "Enter your Github username:",
        name: "username"
    },
    {
        message: "Enter your favorite color:",
        name: "color"
    });

// function writeFile(fileName, data) {
 
// }

// function init() {

// init();
