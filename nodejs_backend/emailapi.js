var email_api_url = 'http://icyns.vicp.io'
var ReqApiURL = "/emailapi/ReqApiURL"
var ConfigApiURL = "/emailapi/Config"
var VerifyURL = "/emailapi/Verify/"


var nodemailer = require('nodemailer');
var cuid = require('cuid');

exports.EmailReqApiURL = function(){
  return ReqApiURL + "*"
}
exports.EmailVerifyApiURL = function(){
  return VerifyURL + "*"
}
exports.EmailConfigApiURL = function(){
  return ConfigApiURL + "*"
}
exports.EmailVerifyHanlder = function(req,res){
  res.send("in development");
}

exports.EmailReqHanlder = function(req,res){
  //console.log(req.body.emailaddress)
  //console.log(req.body.enableEmail)
  //console.log(req.body.enableDevice)
  //console.log(req.body.timeframe)
  if(!validateEmail(req.body.emailaddress)){
    var state = {
      s_success: false,
      code:"Invalid Email Address"
    }
    res.send(state)
    return;
  }
  //generate unique id
  var uid = cuid();
  // setup email option
  var mailopt = {
    from: '"Geninc Sunnydays " <geninc_unimelb@outlook.com>',
    to: req.body.emailaddress,
    subject: 'Keep up with your weather updates! ',
    text: 'Last step!',
    html: '<p>Hi there! Almost done! Click this link to keep up with all the updates!</p><p>'+email_api_url+VerifyURL+uid+'</p>' // html body
  };
  // send mail with defined transport object
  var transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      secureConnection: false, // disable default secure method to enable TLS using SSLv3 encryption
      port: 587,
      tls: {
        ciphers:'SSLv3'
      },
      auth: {
          user: 'geninc_unimelb@outlook.com',
          pass: '@n#YJF*^WlJA76qv'
      }
  });

  transporter.sendMail(mailopt, function(error, info){
      if(error){
          var state = {
            s_success: false,
            code:error
          }
          res.send(state)
          return;
      }
      var state = {
        s_success: true,
        code:"Email Sent"
      }
      res.send(state)
      transporter.close();
  });

}

exports.EmailConfigHanlder = function(req,res){
  res.send("under development")
}

//RC2282 implementation in validating Email. Retrived from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
function validateEmail(email) {
  var re = /^(([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?))$/;
  return re.test(email);
}
