'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  user: {type: String, 
		 default: "Unknown user"},
  content: String,
  date: {type: Date, default: Date.now},
  classroomId: String
});

module.exports = mongoose.model('Message', MessageSchema);