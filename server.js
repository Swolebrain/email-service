const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const xoauth2 = require('xoauth2');
//NODEMAILER
const nodemailer = require('nodemailer');
const emailConfig = require('./.config.js');
const transporter = nodemailer.createTransport("SMTP",{
        service:"Gmail",
        auth:{
            XOAuth2: {
                user: emailConfig.user,
                clientId: emailConfig.clientId,
                clientSecret: emailConfig.clientSecret,
                refreshToken: emailConfig.refreshToken
            }
        }
});

app.set('port', 8082);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req,res){
  console.log("got a request to the server root");
  res.sendFile(__dirname + '/views/email-form.html');
});

app.post('/', function(req, res){
  console.log('Received post request');
  console.log(req.body);
  var mailOptions = {
    to: req.body.to,
    from: "fvialumn@gmail.com",
    subject: req.body.subject,
    html: req.body.message
  };
  transporter.sendMail(mailOptions, function(err, info){
    if (err){
      console.log(err.toString());
      return res.status(500).send("te jodiste");
    }
    console.log("sending email");
    console.log(info);
    res.send("Email sent: "+JSON.stringify(info));
  });
});


app.listen(app.get('port'), function(){
  console.log("Server listening at "+app.get('port'));
});
