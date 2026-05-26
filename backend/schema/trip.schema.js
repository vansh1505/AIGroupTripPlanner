import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    budget: {
        type: Number,
        required: true
    },

    destinationType: [{
        type: String,
        enum: ["Beach", "Mountains", "City", "Adventure", "Nature", "Snow"]
    }],

    ageGroup: {
        type: String,
        enum: [
            "18-25",
            "26-35",
            "36-50",
            "50+"
        ]
    },

    budgetFlexibility: {
        type: String,
        enum: [
            "Strict",
            "Moderate",
            "Flexible"
        ]
    },

    foodPreference: {
        type: String,
        enum: ["Veg", "Non-Veg", "Any"]
    },

    travelStyle: {
        type: String,
        enum: ["Luxury", "Budget", "Backpacking"]
    },

    transportPreference: {
        type: String,
        enum: ["Flight", "Train", "Road", "Any"]
    },

    stayPreference: {
        type: String,
        enum: ["Hotel", "Hostel", "Resort", "Any"]
    },

    activities: [{
        type: String,
        enum: [
            "Nightlife",
            "Trekking",
            "Shopping",
            "Camping",
            "Photography",
            "Relaxation",
            "Food Exploration"
        ]
    }],

    tripPace: {
        type: String,
        enum: ["Relaxed", "Balanced", "Fast-Paced"]
    }

}, { _id: false });

const tripSchema = new mongoose.Schema({
    creatorName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    destination: {
        type: String,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },

    totalMembers: {
        type: Number,
        required: true,
        min: 1
    },

    purpose: {
        type: String,
        enum: [
            'Friends Trip',
            'Family Vacation',
            'Destination Wedding',
            'Honeymoon',
            'Business',
            'Solo Travel',
            'Devotional',
            'Other',
        ]
    },

    status: {
        type: String,
        enum: ['collecting', 'completed'],
        default: 'collecting'
    },

    responses: {
        type: [responseSchema],
        default: []
    },

    aiRecommendation: {
        type: Object,
        default: null
    },
    
    votes: {
        type: [{
            voterName: {
                type: String,
                required: true
            },
            votedFor: {
                type: String,
                required: true
            }
        }],
        default: []
    }
}, { timestamps: true });

export default mongoose.model("Trip", tripSchema);