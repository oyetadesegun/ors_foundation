import mongoose, { Schema, Document, models } from "mongoose";

export interface ICause extends Document {
  title: string;
  description: string;
  image?: string;
  tag?: string;
  goal: number;
  raise?: number;
  createdAt: Date;
}

const CauseSchema = new Schema<ICause>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    tag: { type: String },
    goal: { type: Number },
    raise: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Cause || mongoose.model<ICause>("Cause", CauseSchema);
