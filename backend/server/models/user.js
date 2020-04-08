import mongoose from "mongoose";
const crypto = require("crypto");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    default: ""
  },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  phone: { type: String, default: ""},
  hashedPassword: {
    type: String,
    default: ""
  },
  salt: { type: String, default: "" }
});

const validatePresenceOf = value => value && value.length;

UserSchema.virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

UserSchema.path("firstName").validate(function(name) {
  return name.length;
}, "first name cannot be blank");

UserSchema.path("lastName").validate(function(name) {
  return name.length;
}, "last name cannot be blank");

UserSchema.path("email").validate(function(email) {
  return email.length;
}, "Email cannot be blank");

UserSchema.path("email").validate(function(email) {
  return new Promise(resolve => {
    const User = mongoose.model("User");

    // Check only when it is a new user or when email field is modified
    if (this.isNew || this.isModified("email")) {
      User.find({ email }).exec((err, users) => resolve(!err && !users.length));
    } else resolve(true);
  });
}, "Email `{VALUE}` already exists");

UserSchema.path("hashedPassword").validate(function(hashedPassword) {
  return hashedPassword.length && this._password.length;
}, "Password cannot be blank");

UserSchema.pre("save", function(next) {
  if (!this.isNew) return next();

  if (!validatePresenceOf(this.password)) {
    next(new Error("Invalid pasword"));
  } else {
    next();
  }
});

UserSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },

  encryptPassword: function(password) {
    if (!password) return "";
    try {
      const hashedPassword = crypto
        .createHmac("sha256", this.salt)
        .update(password)
        .digest("hex");
      return hashedPassword;
    } catch (err) {
      throw err;
    }
  }
};

UserSchema.statics = {
  load: function(options, cb) {
    options.select = options.select || "firstName";
    return this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  }
};

export default mongoose.model("User", UserSchema);
