//stock market portfolio App by Luca Saccomanno
//https://expressjs.com/en/4x/api.html

const express = require("express");
const app = express();
// const exphbs = require("express-handlebars"); //handlebar
const { engine } = require("express-handlebars");
const path = require("path");

const request = require("request"); // per la richiesta API

//create call API function

//
function call_api(finishedAPI) {
  request(
    "https://fmpcloud.io/api/v3/income-statement/AAPL?limit=120&apikey=3d20787cbde974ccbfea8853dac6bd07",
    //"https://fmpcloud.io/api/v3/quote/AAPL?apikey=3d20787cbde974ccbfea8853dac6bd07",
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.loge(err);
      }
      if (res.statusCode === 200) {
        //console.log(body);
        finishedAPI(body); //richiama la funzion finished API
      }
    }
  );
}

const PORT = process.env.PORT || 5000;

//https://www.npmjs.com/package/express-handlebars
//devi creare la directory del progetto come ti spiega nel sito
// set handlebars middleware

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

const otherstuff = "hello there, this is other stuff!";

//set handlebar routes for dynamic pages
app.get("/", function (req, res) {
  call_api(function (doneAPI) {
    // chiami call_api che richiama la callback function doneAPI solo dopo che finishedAPI è andata a buon fine?
    res.render("home", {
      stock: doneAPI,
    });
  });
});
//console.log(api);

// create about page route
app.get("/about.html", function (req, res) {
  res.render("about");
});

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

//chiediamo all'app di ascoltare quella porta
app.listen(PORT, () => console.log("server listening on port " + PORT));
