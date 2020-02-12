const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

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

promptUser().then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(function(data){
        console.log(data);
    })
})

// function writeFile(fileName, data) {
 
// }

// function init() {

// init();
