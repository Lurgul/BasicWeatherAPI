const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({expression:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"\\index.html" );
    });


    app.post("/",function(req,res){
    console.log(req.body.cityName);

    const query = req.body.cityName;
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=949c1532a03458031feca36eafaeec2b&units=metric"

   
            https.get(url,function(response){
                console.log(response.statusCode);

            response.on("data",function(data){
                const weatherdate = JSON.parse(data)
                const temp = weatherdate.main.temp;
                const desc = weatherdate.weather[0].description;
                const iconid = weatherdate.weather[0].icon;
                const iconurl = "https://openweathermap.org/img/wn/"+iconid+"@2x.png";
                res.write("<h1>The temperature in " +query+" is " + temp + " degree and currenctly " + desc +"</h1>");
                res.write("<img src="+ iconurl +">");

            });
        })
    
});

    














app.listen(3000,function(){
    console.log("Server listening on port 3000");
});