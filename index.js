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
      }
  ]);
}

function generateHTML(res) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
      <title>${res.data.name}</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  </head>
  <body>
    <div class="jumbotron" style="background-color: ;">
      <div class="text-center">
      <img src="${res.data.avatar_url}" class= "rounded-circle" style="max-height: 200px;">
      </div>
      <h1 class="display-4 text-center">${res.data.name}</h1>
      <h4 class="text-center">${res.data.login}</h4>
      <div class="row justify-content-sm-center">
        <div class="col-sm-8">
          <p class="lead text-center">${res.data.bio}</p>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-4 text-center">
          <p><a href="https://www.google.com/maps/place/${res.data.location}">${res.data.location}</a></p>
        </div>
        <div class="col-sm-12 col-md-4 text-center">
          <p><a href="${res.data.html_url}">Github</a></p>
        </div>
        <div class="col-sm-12 col-md-4 text-center">
          <p><a href="${res.data.blog}" class="text-center">Portfolio</a></p>
        </div>
      </div>
    </div>
    <div class="container" style="margin-top: 30px; margin-bottom: 50px;">
      <div class="row">
        <div class="col-sm-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title text-center">Followers:</h5>
              <p class="card-text text-center">${res.data.followers}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title text-center">Following:</h5>
              <p class="card-text text-center">${res.data.following}</p>
            </div>
          </div>
        </div>  
        <div class="col-sm-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title text-center">Stars:</h5>
              <p class="card-text text-center">${res.data.public_gists}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title text-center">Public Repos:</h5>
              <p class="card-text text-center">${res.data.public_repos}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>`;
}

promptUser()
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(function(res){
        const html = generateHTML(res);
        
        return writeFileAsync("profile.html", html);
    }).then(function(){
        console.log("Successfully wrote to profile.html");
    }).catch(function(err){
        console.log(err);
  })
});