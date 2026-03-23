import mongoose from "mongoose";

const userDocumentSchema = new mongoose.Schema(
    {
        authId: { type: mongoose.Schema.Types.ObjectId, ref: "Auth", required: true, index: true },
        profilePic: { type: String },
        firstName: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
        lastName: { type: String},
        dob: { type: Date, required: true },
        gender: { type: String, required: true, enum: ["MALE", "FEMALE", "OTHER"] },
        maritalStatus: { type: String, required: true, enum: ["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"] },
        bio: { type: String, trim: true, maxlength: 500, default: "" },
        shortDescription: { type: String, trim: true, default: "" },
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model("User", userDocumentSchema);

export default UserModel;