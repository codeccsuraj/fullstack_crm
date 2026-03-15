import mongoose from "mongoose";

const authDocumentSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true, lowercase: true, trim: true, minlength: 3, maxlength: 30 },
        mobile: { type: String, required: true, unique: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true, minlength: 4 },
        role: { type: String, enum: ["ADMIN", "USER", "STUDENT"], default: "USER" },
        status: { type: String, enum: ["ACTIVE", "INACTIVE", "BLOCKED"], default: "ACTIVE" },
        otp: { type: String },
        otpExpiry: { type: Date, default: null },
        deviceInfo: {
            deviceType: { type: String, enum: ["MOBILE", "DESKTOP", "TABLET", "UNKNOWN"], default: "UNKNOWN" },
            browserType: { type: String, default: null },
            ipAddress: { type: String }
        },
        lastLogin: { type: Date }
    },
    { timestamps: true, versionKey: false }
);

export const AuthModel = mongoose.model("Auth", authDocumentSchema);