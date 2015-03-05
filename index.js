var moment = require('moment');
var express = require('express')
    , fs = require('fs')
    ,   path = require('path')
    ,   rootPath = path.normalize(__dirname)
    ,   bodyParser = require('body-parser')
    ,   passport = require('passport')
    ,   expressSession = require('express-session')
    ,   mongoConfig = require('./server/config/mongo')
var favicon = require("serve-favicon");
var morgan = require('morgan')
var log4js = require('log4js')

var myLog = log4js.getLogger();

myLog.info("Init node server vNumberAdmin")
//console.log("[" + moment(new Date()).format("YYYY/MM/DD HH:mm:ss") + "] Init node server vNumberAdmin");
var theHTTPLog = morgan("combined",{"stream":{write : function(str){myLog.debug(str)}}})

// nécessaire pour pouvoir accéder à l'API sinon erreur DEPTH_ZERO_SELF_SIGNED_CERT avec https.request
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

// Load configurations
// if test env, load example file

// Démarrage mongodb
mongoConfig.initialize()

// Bootstrap models
// this requires (= executes code + create exports) for every js file in the
// models folder
var models_path = rootPath + '/server/models'
fs.readdirSync(models_path).forEach(function (file) {
    if (~file.indexOf('.js')) {
        myLog.info("load model " + models_path + "/" + file)
//        console.log("[" + moment(new Date()).format("YYYY/MM/DD HH:mm:ss") + "] load model " + models_path + "/" + file)
        require(models_path + '/' + file)
    }
})



var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//app.use(morgan('dev'))
app.use(theHTTPLog)

// configure build passport
require('./server/config/mypassport')(passport);

app.use(expressSession({secret: '<mysecret>',
    saveUninitialized: true,
    resave: true}));

app.use(passport.initialize());
app.use(passport.session());

// Bootstrap routes
var routes_path = rootPath + '/server/routes'
fs.readdirSync(routes_path).forEach(function (file) {
    if (~file.indexOf('.js')) {
        myLog.info("Add routes from "+routes_path + "/" + file)
//        console.log("[" + moment(new Date()).format("YYYY/MM/DD HH:mm:ss") + "] Add routes from "+routes_path + "/" + file)
        require(routes_path + '/' + file)(app,passport)
    }
})


app.use(function(req, res, next){
    //add header to allow cross domain javascript on request
    res.set({'Access-Control-Allow-Origin': '*'})
    next()
})

app.use(favicon(__dirname + "/server/img/favicon.ico"))

app.setupVariables = function () {
    //  Set the environment variables we need.
    app.ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
    app.port = process.env.OPENSHIFT_NODEJS_PORT || 3100;
}

app.setupVariables();

app.use(express.static(__dirname + '/client'))

app.use(function(req, res, next){
    res.status(404).redirect('/#/error');
});


app.listen(app.port,app.ipaddress, function() {
    myLog.info("Node server Started on " + app.ipaddress + ":" + app.port)
//    console.log("[" + moment(new Date()).format("YYYY/MM/DD HH:mm:ss") + "] Node server Started on %s:%d...",app.ipaddress,app.port)
})

