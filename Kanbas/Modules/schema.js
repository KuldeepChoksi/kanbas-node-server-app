import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
  _id: { type: String, default: () => Date.now().toString() },
  name: { type: String, required: true },
  description: String,
  startDate: Date,
  endDate: Date,
  course: { type: String },
}, { collection: "modules" });

export default moduleSchema;
