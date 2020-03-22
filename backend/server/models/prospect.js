import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProspectSchema = new Schema(
  {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    status: { type: String, default: "NEW" },
    chatted: { type: Boolean, default: false },
    campaign: { type: String, default: "" }
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

const fields = [
  "firstName",
  "lastName",
  "phone",
  "email",
  "status",
  "campaign"
];

ProspectSchema.methods = {};

ProspectSchema.statics = {
  load: function(options, cb) {
    options.select = options.select || "firstName";
    return this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  },

  findByFilters: function(options) {
    let where = {};

    const { filters, searchKey } = options;

    for (let i = 0; filters && i < filters.length; i++) {
      if (fields.includes(filters[i].key)) {
        if (filters[i].value == "") continue;
        if (filters[i].rule == "is") {
          where = { ...where, [filters[i].key]: filters.value };
        } else if (filters[i].rule == "contains") {
          where = {
            ...where,
            [filters[i].key]: new RegExp(filters[i].value, "i")
          };
        } else if (filters[i].rule == "not contains") {
          where = {
            ...where,
            [filters[i].key]: new new RegExp(
              `^((?!${filters[i].value}).)*$`,
              "i"
            )()
          };
        }
      }
    }
    let searchWhere = [];
    if (searchKey) {
      for (let i = 0; i < fields.length; i++) {
        searchWhere = [
          ...searchWhere,
          { [fields[i]]: new RegExp(`${searchKey}`, "i") }
        ];
      }
    }
    const query = this.find(where);
    if (searchKey) return query.or(searchWhere);
    return query;
  },

  assignCampaign: async function(options) {
    let query = this.find();
    if (options.checkAll) {
      query = this.findByFilters(options);
      query.where("_id").nin(options.selectedProspectIds);
    } else {
      query.where("_id").in(options.selectedProspectIds);
    }
    const prospects = await query.updateMany(
      {},
      {
        $set: {
          campaign: options.campaign
        }
      }
    );
  },

  assignStatus: async function(options) {
    let query = this.find();
    if (options.checkAll) {
      query = this.findByFilters(options);
      query.where("_id").nin(options.selectedProspectIds);
    } else {
      query.where("_id").in(options.selectedProspectIds);
    }
    const prospects = await query.updateMany(
      {},
      {
        $set: {
          status: options.status
        }
      }
    );
  },

  deleteProspects: async function(options) {
    let query = this.find();
    if (options.checkAll) {
      query = this.findByFilters(options);
      query.where("_id").nin(options.selectedProspectIds);
    } else {
      query.where("_id").in(options.selectedProspectIds);
    }
    const prospects = await query.deleteMany({});
  }
};

export default mongoose.model("Prospect", ProspectSchema);
