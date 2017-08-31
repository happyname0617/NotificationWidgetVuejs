var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];
const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
var winston = require('winston');
var async = require("async");
var cors = require('cors')
var app = express()
var VError = require('verror');
var fs = require('fs')
var _ = require('underscore');
var assert = require('assert');
const mongoose = require('mongoose');
const Notification = require('./models/notification');

app.use(express.static(path.join(__dirname, 'client')))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'pug');
app.set('views', './views');
app.use(cors());

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: true
    })
  ]
});





function initialize(){
    // Connect To Database
  
  mongoose.connect(config.DB_URL);
  var db = mongoose.connection;
  // On Connection
  db.on('open', () => {
    console.log('Connected to database '+config.DB_URL);
  });

  // On Error
  db.on('error', (err) => {
    console.log('Database error: '+err);
  });

}

initialize();

 
app.get('/notification/get',function(req, res) {
    console.log('/notification/get');
    
    var query = {notified:req.query.notified};

    Notification.getNotiByQuery(query, (err, list) => {
      if(err){
        console.log(err);
        res.json({success: false, msg:'Failed to retreave notification'});
      }
      else{
        res.json(list);
      }
      
    })

});


app.get('/notification/dismiss/:id',function(req, res) {
  console.log('/notification/dismiss',req.params.id);
  
  var id = req.params.id;

  Notification.dismiss(id, (err, result) => {
    if(err){
      console.log(err);
      res.json({success: false, msg:'Failed to dismiss notification'});
    }
    else{
      res.json({success: true, msg:'succeed to dismiss notification'});
    }
    
  })

});

    
app.post('/notification/add',function(req, res) {
    console.log('/notification/add',req.body);
    let noti = new Notification({
      notified: false,
      descryption: req.body.descryption,
      type: req.body.type,
      position: req.body.position,
      duration:req.body.duration
    })

    Notification.add(noti, (err, result) => {
      if(err){
        console.log(err);
        res.json({success: false, msg:'Failed to add new Notification into list'});
      }
      else{
        res.json({success: true, msg:'succeed to add new Notification item into list'});
      }
      
    })

});




app.listen(process.env.PORT || config.NODE_PORT, process.env.IP || "0.0.0.0",function(){
  logger.info('listening on %s',process.env.PORT||config.NODE_PORT)
})
