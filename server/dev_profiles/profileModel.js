var mongoose = require('mongoose');
var Q = require('q');
var findOrCreate = require('mongoose-findorcreate');

var DevProfileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  expertise: {
    type: String,
    default: ''
  },
  applied: {
    type: [],
    default: []
  },
  pastProjects: {
    type: [],
    default: []
  },
  currentProject: {
    type: String,
    default: ''
  }
});

DevProfileSchema.plugin(findOrCreate);

module.exports = mongoose.model('dev_profiles', DevProfileSchema);