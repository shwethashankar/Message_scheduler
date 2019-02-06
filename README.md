# Message Scheduler
Module which schedules printing of message at given time.

API accepts date and time in MM/DD/YYYY HH:MM format and time is in 24 hr format

## Steps to install
Clone/Download source files.

Go to downloaded folder

npm install

npm start

## Pre-requisites
Redis v >= 4.0.9 should be installed in the server

## Configurations 
Configurations to be updated in .env file

SERVER_PORT = 9341

REDIS_PORT = 6390

REDIS_SERVER = 127.0.0.1

LOG_FILE_NAME = messsageScheduler.log

LOG_LEVEL = INFO

## Docs
Once the server is running, API document can be accessed from

http://localhost:9341/api-docs/
