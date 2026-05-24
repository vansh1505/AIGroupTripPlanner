import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({

   tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true
   },

   name: {
      type: String,
      required: true
   },

   budget: {
      type: Number,
      required: true
   },

   destinationType: {
      type: String,
      enum: ["Beach", "Mountains", "City", "Adventure"]
   },

   foodPreference: {
      type: String,
      enum: ["Veg", "Non-Veg", "Any"]
   },

   travelStyle: {
      type: String,
      enum: ["Luxury", "Budget", "Backpacking"]
   }

}, { timestamps: true });

export default mongoose.model("Response", responseSchema);