import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
  name: { type: String, default: "" },
  sequence: { type: Schema.Types.ObjectId, ref: 'Sequence' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const Campaign = mongoose.model("Campaign", CampaignSchema);

export default Campaign;
