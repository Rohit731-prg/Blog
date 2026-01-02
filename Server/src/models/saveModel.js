import mongoose, { Schema } from "mongoose";

const SaveSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", require: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", require: true }
}, {
    timestamps: true
});

const SaveModel = mongoose.model("Save", SaveSchema);
export default SaveModel;