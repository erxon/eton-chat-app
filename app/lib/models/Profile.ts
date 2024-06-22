import mongoose from "mongoose";

export interface Profiles extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  address: mongoose.Types.ObjectId;
  about: String;
  birthday: Date;
  age: Number;
  gender: String;
  contacts: [mongoose.Types.ObjectId];
}

const profileSchema = new mongoose.Schema<Profiles>({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  address: {type: mongoose.Schema.Types.ObjectId, ref:'Address'},
  about: String,
  birthday: Date,
  age: Number,
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
  },
  contacts: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
});

export default mongoose.models.Profile ||
  mongoose.model<Profiles>("Profile", profileSchema);
