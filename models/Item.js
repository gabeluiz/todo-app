import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: [true, "Name is required!"],
        trim: true,
    },
    listId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    complete: { type: Boolean, default: 0},
    createdBy: { type: String },
    updatedBy: { type: String },
});

export default mongoose.models.Item || mongoose.model("Item", ItemSchema);