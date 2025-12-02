import mongoose, { Schema, model, Types } from "mongoose";

export interface IUser extends Document {
  _id?: Types.ObjectId | string;
  fullName: string;
  email: string;
  password: string;
  profilePic: string;
  bio: string;
  nativeLanguage: string;
  learningLanguage: string;
  region: string;
  isOnboarded: boolean;
  friends: string[];
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserModel {
  public model: mongoose.Model<IUser>;

  constructor() {
    this.model = mongoose.models.User || model<IUser>("User", this.getSchema());
  }
  private getSchema(): Schema<IUser> {
    return new Schema<IUser>(
      {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, minLength: 6},
        bio: { type: String, default: "" },
        profilePic: { type: String, default: "" },
        nativeLanguage: { type: String, default: "" },
        learningLanguage: { type: String, default: "" },
        region: { type: String, default: "" },
        isOnboarded: { type: Boolean, default: false },
        friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
      },
      { timestamps: true }
    );
  }
}
