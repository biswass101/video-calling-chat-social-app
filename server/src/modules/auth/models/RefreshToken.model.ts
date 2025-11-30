import mongoose, { Schema, model, Types } from "mongoose";

export interface IRefreshToken extends Document {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  tokenHash: string;
  userAgent?: string;
  ipAddress?: string;
  expiresAt: Date;
  revokedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class RefreshTokenModel {
  public model: mongoose.Model<IRefreshToken>;

  constructor() {
    this.model = model<IRefreshToken>(
      "RefreshToken",
      this.getSchema()
    );
  }
  private getSchema(): Schema<IRefreshToken> {
    return new Schema<IRefreshToken>(
      {
        userId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        tokenHash: { type: String, required: true },
        userAgent: String,
        ipAddress: String,
        expiresAt: { type: Date, required: true },
        revokedAt: { type: Date },
      },
      { timestamps: true }
    );

  }
}
