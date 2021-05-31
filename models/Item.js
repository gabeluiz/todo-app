import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: [true, "Name is required!"],
        trim: true,
    },
    listId: { type: String, required: true },
    status: { type: String, default: 'A' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    createdBy: {
        type: String,
        required: true
    },
    updatedBy: { type: String },
});

export default mongoose.models.Item || mongoose.model("Item", ItemSchema);