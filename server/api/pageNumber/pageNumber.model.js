'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PageNumberSchema = new Schema({
  pageNumber: Number,
  classroomId: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PageNumber', PageNumberSchema);