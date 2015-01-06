'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PdfSchema = new Schema({
  name: String,
  pdf: Object,
  creator: String
});

module.exports = mongoose.model('Pdf', PdfSchema);