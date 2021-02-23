// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html")
});

app.post("/", function(req, res){

  var city = req.body.cityName;

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=695d94d472acd25ab61666a7e431fa14&units=metric"

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      var weatherData = JSON.parse(data)
      var temp = weatherData.main.temp;
      var weatherDesc = weatherData.weather[0].description;
      var icon = weatherData.weather[0].icon;
      var imageUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";

      res.write("<h1>Current temp in "+city+" is "+ temp +" degree celcius</h1>");
      res.write("<p>It feels like "+weatherDesc+"</p>");
      res.write("<img src="+imageUrl+">");
      res.send();
    })
  })

})


app.listen(3000, function(){
  console.log("server is running on port 3000");
})
