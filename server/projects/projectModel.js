var mongoose = require('mongoose');
var Q = require('q');
var findOrCreate = require('mongoose-findorcreate');

var ProjectSchema = new mongoose.Schema({
  npId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  requirements: {
    type: String,
    default: ''
  },
  applicants: {
    type: [],
    default: []
  }
});

ProjectSchema.plugin(findOrCreate);

module.exports = mongoose.model('projects', ProjectSchema);