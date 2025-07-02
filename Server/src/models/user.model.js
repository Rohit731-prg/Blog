import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    image_ID: { type: String, default: "" },
    otp: { type: String },
    auth : { type: Boolean, default: false },

}, {
    timestamps: true
});

const User = mongoose.model("User", UserSchema);
export default User;