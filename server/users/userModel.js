var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Q = require('q');
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  salt: String,
  uType: {
    type: Number,
    require: true
  },
  profileId: {
    type: String,
    default: ''
  },
  projects: {
    type: Array,
    default: []
  }
});

UserSchema.methods.comparePasswords = function (candidatePassword) {
  var defer = Q.defer();
  var savedPassword = this.password;
  bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
    err ? defer.reject(err) : defer.resolve(isMatch);
  });
  return defer.promise;
};

UserSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

module.exports = mongoose.model('users', UserSchema);