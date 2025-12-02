import mongoose, { Schema, model, Types } from "mongoose";

export interface IFriendRequest extends Document {
  _id?: Types.ObjectId | string;
  sender_id: Types.ObjectId | string;
  recipient_id: Types.ObjectId | string;
  status: "pending" | "accepted";
  createdAt?: Date;
  updatedAt?: Date;
}

export class FriendRequestModel {
  public model: mongoose.Model<IFriendRequest>;

  constructor() {
    this.model = model<IFriendRequest>("FriendRequest", this.getSchema());
  }
  private getSchema(): Schema<IFriendRequest> {
    return new Schema<IFriendRequest>(
      {
        sender_id: { 
            type: Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
        recipient_id: {
            type: Schema.Types.ObjectId, 
            ref: "User", 
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "accepted"],
            default: "pending"
        }
      },
      { timestamps: true }
    );
  }
}
