'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  user: {type: Schema.Types.ObjectId, 
		 ref: 'User'},
  content: String,
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Message', MessageSchema);