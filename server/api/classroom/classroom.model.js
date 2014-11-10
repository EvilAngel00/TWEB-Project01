'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ClassroomSchema = new Schema({
  name: String,
  creator: String,
  pdf: String,
  isActive: Boolean
});

module.exports = mongoose.model('Classroom', ClassroomSchema);