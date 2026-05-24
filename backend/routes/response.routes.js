import { Router } from 'express';
import mongoose from 'mongoose';
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

        const responseData = req.body;
        const alreadySubmitted = trip.responses.findIndex(r => r.name === responseData.name);

        if (alreadySubmitted !== -1) {
            return res.status(400).json({
                message: 'You have already submitted a response for this trip'
            });
        }

        trip.responses.push(responseData);

        if (trip.responses.length >= trip.totalMembers) {
            await axios.post(`${process.env.BACKEND_URL}/api/ai/${trip._id}`);
            trip.status = 'completed';
        }

        await trip.save();

        res.status(200).json({
            message: 'Response submitted successfully'
        });
    } catch (error) {
        console.error('Error submitting response:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

export default router;