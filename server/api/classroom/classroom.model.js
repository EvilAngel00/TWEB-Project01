'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ClassroomSchema = new Schema({
  name: String,
  creator: String,
  creatorId: String,
  pdf: String,
  isActive: Boolean,
  dateCreated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Classroom', ClassroomSchema);