

var printerConfig = {
  production: {
    log: {
      level: "info",
      file: "printerserver-api.log"
    },
    server_url: "http://localhost:9341",
    server_port_number: 9341,
   
  },
  development: {
    log: {
      level: "debug",
      file: "notificationserver-api.log"
    },
    server_url: "http://localhost:9341",
    server_port_number: 9341
  }
 

};

var get = function(env) {
  var envSpecificConfiguration = printerConfig[env];
  
  var configuration = Object.assign(
    {},
    envSpecificConfiguration
    
   );
  return configuration;
};

module.exports = get;
