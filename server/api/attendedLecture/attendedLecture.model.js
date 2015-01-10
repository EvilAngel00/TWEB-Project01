'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AttendedlectureSchema = new Schema({
  userId: String,
  classroomId: String,
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Attendedlecture', AttendedlectureSchema);