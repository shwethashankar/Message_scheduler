"use strict";

var bodyParser = require("body-parser");
var express = require("express");
var app = express();
var dotenv = require("dotenv").config();
var http = require("http");
var path = require("path");


var logger = require("./log/logger").logger;
var openapiJSDoc = require('openapi-jsdoc');
var port = process.env.SERVER_PORT

var swaggerUi = require("swagger-ui-express");

var swaggerDefinition = {
  info: {
    title: "Message Scheduler API",
    version: '1.0.0',
    description: 'Description of different API’s provided by message scheduler '
  } ,
  servers: "http://localhost:" + port
};


var options = {
  // import swaggerDefinitions
  definition: swaggerDefinition,
  // path to the API docs
  apis: ["./routes/*.js"],// pass all in array 


  };

  var swaggeropts = {
    swaggerOptions : {
    customOptions : {

      defaultModelsExpandDepth : -1
    }
  }
}
var swaggerSpec = openapiJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec,swaggeropts));

// Serve OpenAPI docs
app.get('/api-docs.json', function (req, res) {
res.setHeader('Content-Type', 'application/json')
res.send(swaggerSpec)
})


http = require("http").Server(app);

app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
require("./routes/routes")(app);
app.set("port", port);

http.listen(app.get("port"), function() {
    logger.info('Running in development.');
    logger.info("listening on port " + app.get("port"));
  });

