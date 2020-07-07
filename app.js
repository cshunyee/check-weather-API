const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = "237f5a934d5679788b62bde5f9c62f7d";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&APPID=" + apiKey + "&units=" + unit;
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {

      //JSON.stringify(data) does the opposite of JSON.parse(data)
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>The temperature in " + query + " is " + temp + " degree Celcius.</h1>");
      res.write("<p> The Weather is currently " + description);
      res.write("<img src=" + imageURL + ">");

      res.send();
    });
  });
})

app.listen(5260, function() {
  console.log("Server is running on port 5260");
});
