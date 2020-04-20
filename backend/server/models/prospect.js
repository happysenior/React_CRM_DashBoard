import mongoose from "mongoose";
import Campaign from "./campaign";
import campaignRouter from "../controllers/campaign.controller";

const Schema = mongoose.Schema;

const ProspectSchema = new Schema(
  {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    status: { type: String, default: "NEW" },
    chatted: { type: Boolean, default: false },
    campaign: {
      type: Schema.Types.ObjectId,
      ref: "Campaign",
    },
    autoSequence: { type: Boolean, default: true },
    dateOfAssignment: { type: Date, default: undefined },
    address: { type: String, default: "" },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const fields = ["firstName", "lastName", "phone", "email", "status"];

ProspectSchema.methods = {};

ProspectSchema.statics = {
  load: function (options, cb) {
    options.select = options.select || "firstName";
    return this.findOne(options.criteria).select(options.select).exec(cb);
  },

  findByFilters: function (options) {
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
            [filters[i].key]: new RegExp(filters[i].value, "i"),
          };
        } else if (filters[i].rule == "not contains") {
          where = {
            ...where,
            [filters[i].key]: new new RegExp(
              `^((?!${filters[i].value}).)*$`,
              "i"
            )(),
          };
        }
      }
    }
    let searchWhere = [];
    if (searchKey) {
      for (let i = 0; i < fields.length; i++) {
        searchWhere = [
          ...searchWhere,
          { [fields[i]]: new RegExp(`${searchKey}`, "i") },
        ];
      }
    }
    const query = this.find(where);
    if (searchKey) return query.or(searchWhere).populate("campaign");
    return query.populate("campaign");
  },

  assignCampaign: async function (options) {
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
          campaign: options.campaign,
          status: "NEW",
        },
      }
    );
  },

  assignStatus: async function (options) {
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
          status: options.status,
        },
      }
    );
  },

  deleteProspects: async function (options) {
    let query = this.find();
    if (options.checkAll) {
      query = this.findByFilters(options);
      query.where("_id").nin(options.selectedProspectIds);
    } else {
      query.where("_id").in(options.selectedProspectIds);
    }
    const prospects = await query.deleteMany({});
  },

  updateProspect: async function (id, options) {
    if (options.field == "campaign") {
      let value = options.value;
      if (value == "") value = undefined;
      await this.findOneAndUpdate(
        { _id: id },
        { campaign: value, dateOfAssignment: new Date(), status: "NEW" }
      );
    } else {
      await this.findOneAndUpdate(
        { _id: id },
        { [options.field]: options.value }
      );
    }
  },
};

export default mongoose.model("Prospect", ProspectSchema);
