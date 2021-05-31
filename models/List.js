import mongoose from "mongoose";

const ListSchema = new mongoose.Schema({
    listName: {
        type: String,
        required: [true, "Name is required!"],
        trim: true,
    },
    mainList: { type: Boolean },
    status: { type: String, default: 'A' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    createdBy: {
        type: String
    },
    updatedBy: { type: String },
});

export default mongoose.models.List || mongoose.model("List", ListSchema);