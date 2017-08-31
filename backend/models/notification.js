
const mongoose = require('mongoose');
const AlertType=['alert','info','warning','special'];
// todos Schema
const NotificationSchema = mongoose.Schema({

  notified: {
    type: Boolean,
    default:false,
    required: false
  },
  descryption: {
    type: String,
    default:'',
    required: false
  },
  duration: {
    type: Number,
    default:3,
    required: false
  },
  type:{
    type:String,
    enum:AlertType,
    required:false
  }, 
  position:{
    type: String,
    default:'',
    required: false
  } 

});

const Notification = module.exports = mongoose.model('Notification', NotificationSchema);


module.exports.getNotiByQuery = function(query, callback){
    Notification.find(query, callback);
}


module.exports.add = function(newNoti, callback){
  console.log('newNoti',newNoti);
  newNoti.save(callback);
}


module.exports.dismiss = function(id, callback){
  console.log('dismiss',id);
  let noti = {
    notified: true
  }

  Notification.findByIdAndUpdate(id,noti,callback);
}


