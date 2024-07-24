import APIError from "@auth/errors/api-error";
import mongoose, { Document, Model } from "mongoose";

export interface IAccountVerificationDocument extends Document {
  userId: mongoose.Types.ObjectId;
  emailVerificationToken: string;
}

export interface IAccountVerificationModel
  extends Model<IAccountVerificationDocument> { }

const accountVerificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  emailVerificationToken: {
    type: String,
    required: true,
    validate: (value: string): boolean => {
      if (!value || value.length !== 64) {
        throw new APIError("Invalid email verfication token");
      }
      return true;
    },
  },
});

const AccountVerificationModel = mongoose.model<
  IAccountVerificationDocument,
  IAccountVerificationModel
>("Account_Verification", accountVerificationSchema);

export default AccountVerificationModel;
