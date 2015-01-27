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
  },
  weeks: {
    type: Number,
    default: 4
  },
  hrsWeek: {
    type: Number,
    default: 10
  }
});

ProjectSchema.plugin(findOrCreate);

module.exports = mongoose.model('projects', ProjectSchema);