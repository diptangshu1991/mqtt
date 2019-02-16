
var http = require('http');
var path = require('path');
var express = require('express');


var app = express();
var server = http.createServer(app);

var dt = new Date();
var utcDate = dt.toUTCString();


var mqtt = require('mqtt');
var options = {
    port: 17080,
    host: 'mqtt://m16.cloudmqtt.com',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'ydgjhgsj',
    password: 'qsrmKBKV_0o_',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};
var client = mqtt.connect('mqtt://m16.cloudmqtt.com', options);
client.on('connect', function() { // When connected
    console.log('connected');
    // subscribe to a topic
    client.subscribe('esp/test', function() {
        // when a message arrives, do something with it
        client.on('message', function(topic, message, packet) {
            console.log("Received '" + message + "' on '" + topic + "'");
        });
    });
});

app.get('/apk', function(req, res){
  var file = __dirname + '/downloads/test.apk';
  res.download(file); // Set disposition and send it.
});



client.on('message', function(topic, message, packet) {
      console.log("Received '" + message + "' on '" + topic + "'");
    });

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'diptangshudolui@gmail.com',
        pass: 'Dip1991)(*'
    }
});
const mailOptions = {
  from: 'diptangshudolui@gmail.com', // sender address
  to: 'smiling.tamo@gmail.com', // list of receivers
  subject: 'Subject of your email', // Subject line
  html: '<p>Security Breach at '+utcDate+' </p>'// plain text body
};

app.get('/alert', function (req, res) {
   
transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
});
res.end("a");
});
app.get('/mqtton', function (req, res) {
   client.publish('esp/test', 'on', function() {
    console.log("Message is published");
     // Close the connection when published
  });

res.end("Light ON");
});
app.get('/mqttoff', function (req, res) {
   client.publish('esp/test', 'off', function() {
    console.log("Message is published");
     // Close the connection when published
  });

res.end("Light OFF");
});

var port= process.env.PORT||3000;
app.listen(port);
console.log("server started");