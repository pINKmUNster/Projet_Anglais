/**
 * Created by atbe7403 on 26/11/2014.
 */
var http = require('http');
var https = require('https');
var tls = require('tls');
var tunnel = require('tunnel');
var log4js = require('log4js')

var myLog = log4js.getLogger();

// if true -> vNumber API is called via apigee gateway
// if false -> vNumber API is called directly
var viaApigee=true;
var tokenbearer='';
var key='';
if (process.env.OPENSHIFT_APP_NAME == 'vnumberadmin'){  //PROD
    key = 'V3prOTNYQ2hOMVl4WHNLcFBKN1JRWGlCbDhUVEFOVzQ6ZlRzTk1ET0Zxa1M5Y0FzRQ=='
}
else{  // OTHER
    key = 'cjc5bnpwUkN1QmhhdW5iQVJvQUNFaE1hYUVrbFAyczI6c2NQUzZ0WHhuZ0h2RGFHbw=='
}

var api = {
    "admin":{
       "host":"integ.api.orangeadd.com",
        "port":"443",
        "path":"/vnumbers/admin/v1"
    },
    "secondNumber":{
        "host":"integ.api.orangeadd.com",
        "port":"443",
        "path":"/vnumbers/SecondNumber/v1"
    },
    "token": {
        "host": "integ.api.orangeadd.com",
//        "host": "api.orange.com",
        "port": "443",
        "path": "/oauth/v2/token",
        "key": key
    }
}

// do the HTTPS request whatever the proxy environment
// returns a JSON object {'status':return code HTTP,'msg':JSON response or error message}

exports.doHttpsRequest = function(whichApi,remotepath,action,data,cb) {
    myLog.trace("doHttpsRequest : " + action + " " + remotepath + " data :" + JSON.stringify(data))
//    console.log("doHttpsRequest data :" + JSON.stringify(data))
    var headers={};

    // if POST request, set content-type
    if (action === "POST" || action === "PATCH") {
            headers["Content-Type"] = "application/json";
    }

    var options = {
        host: api[whichApi].host,
        port: api[whichApi].port,
        path: api[whichApi].path + remotepath,
        method: action,
        headers: headers
    };

    if (viaApigee) { // call through apigee gateway
        if (isEmpty(tokenbearer)) {
            // no token yet
            myLog.trace("no token yet")
//            console.log("no token yet")
            getTokenAndDoTheRequest(options,data,function(reponse){
                cb(reponse);
            })
        } else {
            // token exists
            myLog.trace("token exists")
//            console.log("token exists")
            options.headers["Authorization"] = "Bearer " + tokenbearer;
            doRequest(options, data, function (reponse) {
                // if token expired, get a new one
                if (isTokenExpired(reponse)) {
                    getTokenAndDoTheRequest(options, data, function (reponse) {
                        cb(reponse);
                    })
                } else {
                    cb(reponse);
                }
            })
        }
    } else { // call APi vnumber directly
        options.headers["X-OAPI-Application-Id"] = "1542";
        doRequest(options, data, function (reponse) {
            cb(reponse);
        })
    }
}

function getTokenAndDoTheRequest(options, data, cb){
    getApigeeToken(function (reponse) {
        myLog.trace("getTokenAndDoTheRequest getApigeeToken reponse : " + JSON.stringify(reponse))
        if (reponse.status != 200) {
//            console.log("getTokenAndDoTheRequest getApigeeToken reponse: " + JSON.stringify(reponse))
            var retour = {};
            retour.status = 401;
            retour.msg = {message:'NO_TOKEN', description:'unable to get a valid token. Check your orangepartner credentials',translateId: 'ERR006_NO_TOKEN'};
            cb(retour);
        } else {
            tokenbearer = reponse.msg.access_token;
            options.headers["Authorization"] = "Bearer " + tokenbearer;
            doRequest(options, data, function (reponse) {
//                console.log("getTokenAndDoTheRequest getApigeeToken doRequest reponse:")
//                console.log(reponse)
                cb(reponse);
            })
        }
    })
}

function doRequest (options,data,cb) {
    var proxy_host = process.env.KERMIT_HTTP_PROXY_INTERNET_HOST;
    var proxy_port = process.env.KERMIT_HTTP_PROXY_INTERNET_PORT;

    var tunnelingAgent={};

    if (typeof proxy_host === "undefined") {
        proxy_host="localhost"
        proxy_port=53128
    }
    tunnelingAgent = tunnel.httpsOverHttp({
        maxSockets: 5, // Defaults to 5

        proxy: { // Proxy settings
            host: proxy_host,
            port: proxy_port
        }
    });
    options["agent"]=tunnelingAgent;
    myLog.trace("doRequest options : " + JSON.stringify(options))
    myLog.trace("doRequest data : "+ JSON.stringify(data))
//    console.log("doRequest options : " + JSON.stringify(options))
//    console.log('doRequest data='+ JSON.stringify(data))

    var reqServer = https.request(options, function (resServer) {
        resServer.setEncoding('utf-8');
        var responseString = '';
        resServer.on('data', function (data) {
            responseString += data;
        });
        resServer.on('end', function () {
            var retour = {};
            retour.status = resServer.statusCode;
            myLog.trace("doRequest end status -- responseString: " + retour.status + " -- " + responseString)
//            console.log("doRequest end status -- responseString: " + retour.status + "--" + responseString)
            try {
                retour.msg=JSON.parse(responseString);
            } catch (e) {
                myLog.trace("doRequest end not json: " + retour)
//                console.log("doRequest end not json: " + retour);
                retour.msg={};
            }
            cb(retour);
            return;
        });
    });
    reqServer.on('error', function (e) {
        myLog.error("doRequest e : " + JSON.stringify(e))
//        console.log("doRequest error : " + JSON.stringify(e));
        var retour = {};
        retour.status = 400;
        retour.msg= {message: e.code, description:e.message};
        cb(retour);
        return;
    });
    if(options.method=="POST" || options.method=="PATCH"){
        myLog.trace("doRequest Content-Type : " + options.headers["Content-Type"])
//        console.log("doRequest Content-Type : " + options.headers["Content-Type"])
        if (options.headers["Content-Type"].indexOf("json")> -1){
            reqServer.write(JSON.stringify(data));
        }
        else{
            reqServer.write(data);
        }
    }
    reqServer.end();
}

function getApigeeToken (cb) {

    var options = {
        host: api["token"].host,
        port: api["token"].port,
        path: api["token"].path,
        method: "POST",
        headers: {"Authorization":" Basic "+api["token"].key,"Content-Type":"application/x-www-form-urlencoded"}
    };

    var data="grant_type=client_credentials";

    doRequest(options,data,function(reponse) {
        myLog.trace("getApigeeToken :" + JSON.stringify(reponse))
//        console.log("getApigeeToken :" + JSON.stringify(reponse));
        cb(reponse);
    })
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function isTokenExpired(reponse) {
    if (!reponse.status) {
        myLog.warn("isTokenExpired: !reponse.status")
//        console.log("isTokenExpired: !reponse.status");
        return false;
    }
    if (reponse.status == "200") {
        myLog.warn("isTokenExpired: reponse.status == 200")
//        console.log("isTokenExpired: reponse.status == 200");
        return false;
    }
    if (!reponse.msg.error) {
        myLog.warn("isTokenExpired: !reponse.msg.error")
//        console.log("isTokenExpired: !reponse.msg.error");
        return false;
    }
    if (!reponse.msg.error.code) {
        myLog.warn("isTokenExpired: !reponse.msg.error.code")
//        console.log("isTokenExpired: !reponse.msg.error.code");
        return false;
    }
    if (reponse.msg.error.code == "42") {
        myLog.warn("isTokenExpired: reponse.msg.error.code == 42")
//        console.log("isTokenExpired: reponse.msg.error.code == 42");
        return true;
    }
    return false;
}

function isGetTokenOk(reponse) {


}


