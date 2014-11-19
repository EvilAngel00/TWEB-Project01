'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
  number: Number,
  classroomId: String,
});

module.exports = mongoose.model('Feedback', FeedbackSchema);