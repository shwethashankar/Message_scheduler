"use strict";
/*
Function to  print message as per given time

*/
var messageController = {};

const appRoot = require("app-root-path");
var logger = require("../log/logger").logger;

var moment = require('moment');
var redis = require('redis');
var RedisNotifier = require('redis-notifier');
const RedisServer = require('redis-server');
var client;
const server = new RedisServer(process.env.REDIS_PORT);
 
server.open((err) => {
  if (err) {
    return;
  }
    client = redis.createClient({port:process.env.REDIS_PORT});
    client.on('error', function(err){
      res.status(400).json({
        err: "Redis Connection Failed"
      });
      res.end();
    });
    client.on("ready", () => {
      client.config('set', 'notify-keyspace-events', 'EKx', function(err) { if (err) { console.log(err); } });
    });
  
});


var eventNotifier = new RedisNotifier(redis, {
  redis : { host : process.env.REDIS_SERVER, port : process.env.REDIS_PORT },
  expired : true,
  logLevel : "ERROR"
});

eventNotifier.on('message', function(pattern, channelPattern, emittedKey) {
  var channel = this.parseMessageChannel(channelPattern);
  switch(channel.key) {
    case 'expired':
      let keyExpired = emittedKey.substring(emittedKey.indexOf(':')+1)
       client.get(keyExpired.toString(), function(error, result) {
        if (error) throw error;
        console.log(result);
        client.del(keyExpired);
      });
   
      break;
   
    default:
      logger.debug("Unrecognized Channel Type:" + channel.type);
  }
});

messageController.printMessage =  async function(req, res, next) {

  

  logger.info("Received a request to print message  ", req.body);
  let reqData = req.body;
 
  var data = req.body;
  let message = data.message;
  let scheduledTime = data.time;
  if(!message)
  {
    res.status(400).json({
      err: "Missing message"
    });
    res.end();
  }
  if(!scheduledTime)
  {
    res.status(400).json({
      err: "Missing Scheduled time"
    });
    res.end();
  }
  var status = 202;
  
  var currentDate = moment(new Date (), 'MM/DD/YYYY H:mm'); 
  var scheduleddate = moment(scheduledTime,'MM/DD/YYYY H:mm');

 var timediff = scheduleddate.diff(currentDate,"second");
  if(timediff < 0){
    res.status(400);
    res.end();
  }
  else {
    client.set(message+"_"+scheduledTime, message);
    client.setex("dup:"+message+"_"+scheduledTime,timediff, "");
   
    res.status(status).json({message :"Message scheduled successfully"})
}

}

module.exports = messageController;
