var mongoose = require('mongoose');
var Q = require('q');
var findOrCreate = require('mongoose-findorcreate');

var NpProfileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  organizationName: {
    type: String,
    default: ''
  },
  accountHolder: {
    type: String,
    default: ''
  },
  projects: {
    type: [],
    default: []
  }
});

NpProfileSchema.plugin(findOrCreate);

module.exports = mongoose.model('np_profiles', NpProfileSchema);