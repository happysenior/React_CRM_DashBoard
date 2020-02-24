import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProspectSchema = new Schema(
  {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    phone: { type: String, default: "" },
    status: { type: String, default: "NEW" },
    chatted: { type: Boolean, default: false }
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const validatePresenceOf = value => value && value.length;

// ProspectSchema.path("firstName").validate(function(name) {
//   return name.length;
// }, "first name cannot be blank");

// ProspectSchema.path("lastName").validate(function(name) {
//   return name.length;
// }, "last name cannot be blank");

// ProspectSchema.path("phone").validate(function(phone) {
//   return phone.length;
// }, "phone cannot be blank");

// ProspectSchema.path("phone").validate(function(phone) {
//   return new Promise(resolve => {
//     const Prospect = mongoose.model("Prospect");

//     // Check only when it is a new user or when email field is modified
//     if (this.isNew || this.isModified("phone")) {
//       Prospect.find({ phone }).exec((err, prospects) =>
//         resolve(!err && !prospects.length)
//       );
//     } else resolve(true);
//   });
// }, "Phone `{VALUE}` already exists");

// ProspectSchema.pre("save", function(next) {
//   if (!this.isNew) return next();

//   if (!validatePresenceOf(this.phone)) {
//     next(new Error("Invalid phone"));
//   } else {
//     next();
//   }
// });

ProspectSchema.methods = {};

ProspectSchema.statics = {
  load: function(options, cb) {
    options.select = options.select || "firstName";
    return this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  }
};

export default mongoose.model("Prospect", ProspectSchema);
