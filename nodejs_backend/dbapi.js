var mongodbSimpleApiURL = '/MongoSimple/'
var mongodbSimpleApiNoCallbackURL = '/MongoSimpleNoCallback/'
var allowedDB = ['weather_db']
var http = require('http')
//extends array prototype :)
Array.prototype.contains = function(e){
  return this.indexOf(e) > -1;
}

exports.MongoNoCallbackAPIUrl = function(){
  return mongodbSimpleApiNoCallbackURL + '*'
}

exports.MongoAPIUrl = function(){
  return mongodbSimpleApiURL + '*'
}

exports.MongoNoCallbackAPIHandler = function (req, mongores) {
  common_process(req, mongores,false,mongodbSimpleApiNoCallbackURL.length)
}


exports.MongoAPIHandler = function (req, mongores) {
  common_process(req, mongores,true,mongodbSimpleApiURL.length)
}

common_process = function(req, mongores,allowCallback,substring_length){
  if(!(allowedDB.contains(getDBNamefromURL(req.url)))){
    mongores.send("Invalid access to " + getDBNamefromURL(req.url) +
          ". DB not permmited to access.");
    return;
  }
  var options = {
    host: 'localhost',
    port: 28017,
    path: '/' + req.url.substring(substring_length)
  };
  // console.log(options.path)
  var request = http.request(options, function(res) {
    // console.log('STATUS: ' + res.statusCode)
    var body = '';
    res.on('data', function(d) {
        body += d;
    });
    res.on('end',function(){
      if(allowCallback){
        mongores.send("mycallback(" + body + ")");
      }else{
        mongores.send(body);
      }
    })
  })
  request.on('error', function(err) {
      console.log(err)
      mongores.send("Error while trying to access " + options.path +"<br> Code: " + err['code'])
      // Handle error
  })
  request.end();
}

function getDBNamefromURL(ReqURL){
  return ReqURL.split("/")[2];
}
