/**
 * Created by TNVL6480 on 30/10/2014.
 */
// Load configurations
var mongoose = require('mongoose')
var moment = require('moment')
var log4js = require('log4js')

var myLog = log4js.getLogger();
var handler = {}
/*
 * Initialize the mongo db connection with
 * the given configuration
 */
var database =
{
    "host": "localhost",
    "port": 27017,
    "name": "authentvNumber",
    "url": "mongodb://localhost:27017/authentvNumber"
}
module.exports.initialize = function() {
    var mongoDbUrl="";
    if(process.env.OPENSHIFT_APP_NAME){  // on KERMIT prod ou int
        mongoDbUrl = process.env.OPENSHIFT_MONGODB_DB_URL + database.name;
    }
    else{
        mongoDbUrl=database.url;
    }
    // Bootstrap db connection
    // Connect to mongodb
    var connect = function () {
        var options = { server: { socketOptions: { keepAlive: 1 } } }
        if(mongoose.connection.readyState === 0){
            if (mongoDbUrl) {
                mongoose.connect(mongoDbUrl, options);
                myLog.info("connected to db : " + mongoDbUrl)
//                console.log("[" + moment(new Date()).format("YYYY/MM/DD HH:mm:ss") + "] connected to db : " + mongoDbUrl);
            }
        }
    };
    connect()

    handler.mongoReconnector = (function() {
        connect()
    })

    // Error handler
    mongoose.connection.on('error', function (err) {
        myLog.error("mongo : " + err)
//        console.log("[" + moment(new Date()).format("YYYY/MM/DD HH:mm:ss") + "] mongo : " + err)
    })

    // Reconnect when closed
    mongoose.connection.on('disconnected', handler.mongoReconnector)
}

module.exports.close = function() {
    mongoose.connection.removeListener('disconnected', handler.mongoReconnector)
    mongoose.connection.close()
    myLog.info("closed db connection")
//    console.log("[" + moment(new Date()).format("YYYY/MM/DD HH:mm:ss") + "] closed db connection")
}