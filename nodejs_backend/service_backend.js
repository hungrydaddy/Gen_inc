//Backend server for mongo db, notification subscription, automatic email
// for subscription (and possible for user verification in future)
var port = 12000
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

//custum mongodb API handler
var dbmodule = require('./dbapi')
var rendermodule = require ('./render')
var emailmodule = require('./emailapi')

// setup static folder
app.use(express.static(__dirname + '/static'))
// setup post request Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))//support URL-encoded

// set view engine to handlerbars.js, with hbs wrapper
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
// setup routing
app.get('/',rendermodule.main)
app.get(dbmodule.MongoAPIUrl(), dbmodule.MongoAPIHandler)
app.get(dbmodule.MongoNoCallbackAPIUrl(), dbmodule.MongoNoCallbackAPIHandler)
app.get(emailmodule.EmailVerifyApiURL(),emailmodule.EmailVerifyHanlder)
app.post(emailmodule.EmailReqApiURL(),emailmodule.EmailReqHanlder)
app.post(emailmodule.EmailConfigApiURL(),emailmodule.EmailConfigHanlder)

app.listen(port, function () {
  console.log('Example app listening on port '+ port +'!')
})
