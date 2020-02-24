import mongoose from "mongoose";
import Prospect from "./prospect";

const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  message: { type: String, default: "" },
  outgoing: { type: Boolean, default: true },
  method: { type: String, default: "text"},
  prospect: { type: Schema.Types.ObjectId, ref: Prospect },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const validatePresenceOf = value => value && value.length;

ConversationSchema.methods = {};

ConversationSchema.statics = {
  load: function(options, cb) {
    options.select = options.selecs;
    return this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  }
};

export default mongoose.model("Conversation", ConversationSchema);
