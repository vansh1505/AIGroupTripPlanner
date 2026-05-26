import { Router } from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import Trip from '../schema/trip.schema.js';

const router = Router();

router.post('/:tripId/respond', async (req, res) => {
    try {
        const { tripId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(tripId)) {
            return res.status(400).json({
                message: 'Invalid trip ID'
            });
        }

        const trip = await Trip.findById(tripId);

        if (!trip) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        if (trip.status === 'completed') {
            return res.status(400).json({
                message: 'Trip responses are closed'
            });
        }

        const { name, budget, destinationType, ageGroup, budgetFlexibility, foodPreference, travelStyle, transportPreference, stayPreference, activities, tripPace } = req.body;

        const trimmedName = name.trim().toLowerCase();
        const alreadySubmitted = trip.responses.findIndex(r => r.name.trim().toLowerCase() === trimmedName);

        if (alreadySubmitted !== -1) {
            return res.status(400).json({
                message: 'You have already submitted a response for this trip'
            });
        }

        trip.responses.push({ name, budget, destinationType, ageGroup, budgetFlexibility, foodPreference, travelStyle, transportPreference, stayPreference, activities, tripPace });

        if (trip.responses.length >= trip.totalMembers) {
            trip.status = 'completed';
        }

        await trip.save();

        res.status(200).json({
            message: 'Response submitted successfully'
        });
    } catch (error) {
        console.error('Error submitting response:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: Object.values(error.errors).map(e => e.message).join(', ') });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
})

export default router;