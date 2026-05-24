import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    destination: String,

    startDate: Date,

    endDate: Date,

    totalMembers: {
        type: Number,
        required: true
    },

    responsesReceived: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: ["collecting", "completed"],
        default: "collecting"
    }

}, { timestamps: true });

export default mongoose.model("Trip", tripSchema);