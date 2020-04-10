import mongoose, { Schema } from "mongoose";

const EventSchema = new Schema({
  delay: Number,
  notes: String,
  name: String,
  subject: String,
  content: String,
  type: String,
  attaches: [String],
});

const DaySchema = new Schema({
  runDay: Number,
  runTime: Number,
  events: [EventSchema],
});

const SequenceSchema = new Schema({
  title: { type: String, default: "" },
  email: { type: String, default: "" },
  phone: { type: String, default: "" },
  name: { type: String, default: "" },
  isForwardText: { type: Boolean, default: false },
  start: { type: Schema.Types.String },
  end: { type: Schema.Types.String },
  stopAfterRespond: { type: Boolean },
  weekendMessage: { type: Boolean, default: false },
  days: [DaySchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const Sequence = mongoose.model("Sequence", SequenceSchema);

export default Sequence;
