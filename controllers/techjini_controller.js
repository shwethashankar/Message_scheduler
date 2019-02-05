"use strict";
/*
Function to  push message to specified channel

*/
var techjiniController = {};

const appRoot = require("app-root-path");
var logger = require("../log/logger").logger;
var config = require(appRoot + "/config");

var moment = require('moment');

techjiniController.printMessage =  async function(req, res, next) {
  logger.info("Received a request to print message", req.body);
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
  var scheduleddate = moment(scheduledTime,'H:mm');

 var timediff = scheduleddate.diff(currentDate,"second");
  if(timediff < 0){
    res.status(400);
    res.end();
  }
  else {
  const timeoutObj = setTimeout(() => {
    console.log(message);
  }, timediff*1000);

    res.status(status).json({message :"Message scheduled successfully"})
}
}




module.exports = techjiniController;
