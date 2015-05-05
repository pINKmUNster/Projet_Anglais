var express = require('express')
    , bodyParser = require('body-parser')
    , fs = require('fs')
    , app = express()
    , path = require('path')
    , rootPath = path.normalize(__dirname)

app.set('port', (process.env.PORT || 5001))

app.post('/json', function (req, res)
{
    req.on('data', function (chunk)
    {
        fs.writeFile(rootPath + "/client/phrases.json", chunk, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
        });

    });
    req.on('end', function ()
    {
        res.writeHead(200, "OK", {'Content-Type': 'text/html'});
        res.end();
    });
})

app.use(express.static(__dirname + '/client'))

app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'))
})
