import mongoose from "mongoose";

export interface Profiles extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  address: String;
  about: String;
  birthday: Date;
  age: Number;
  gender: String;
  contactNumber: String;
  contacts: [mongoose.Types.ObjectId];
}

const profileSchema = new mongoose.Schema<Profiles>({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  address: String,
  about: String,
  birthday: Date,
  age: Number,
  contactNumber: String,
  gender: {
    type: String,
    enum: ["Male", "Female", "none"],
  },
  contacts: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
});

export default mongoose.models.Profile ||
  mongoose.model<Profiles>("Profile", profileSchema);
