/**
This file exports a merged JSON object of all the required configuration files.
If the NODE_ENV is undefined development is assumed as default environment.
There is no need to actually load the configuration files directly.
*/

var config = require("./config")(process.env.NODE_ENV || "development");
module.exports = config;
