//stock market portfolio App by Luca Saccomanno
//https://expressjs.com/en/4x/api.html

const express = require("express");
const app = express();
// const exphbs = require("express-handlebars"); //handlebar
const { engine } = require("express-handlebars");
const path = require("path");

const PORT = process.env.PORT || 5000;

//https://www.npmjs.com/package/express-handlebars
//devi creare la directory del progetto come ti spiega nel sito
// set handlebars middleware

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

const otherstuff = "hello there, this is other stuff!";
//set handlebar routes for dynamic pages
app.get("/", function (req, res) {
  res.render("home", {
    stuff: otherstuff,
  });
});

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

//chiediamo all'app di ascoltare quella porta
app.listen(PORT, () => console.log("server listening on port " + PORT));
