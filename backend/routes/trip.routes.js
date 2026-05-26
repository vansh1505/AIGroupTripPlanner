import { Router } from 'express';
import mongoose from 'mongoose';
import Trip from '../schema/trip.schema.js';
const router = Router();


// Trip Create
router.post('/', async (req, res) => {
    try {
        const { creatorName, name, destination, purpose, startDate, endDate, totalMembers } = req.body;

        const trip = new Trip({ creatorName, name, destination, purpose, startDate, endDate, totalMembers });
        await trip.save();

        res.json({ id: trip._id });
    } catch (error) {
        console.error('Error creating trip:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: Object.values(error.errors).map(e => e.message).join(', ') });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get Trip Details
router.get('/:id', async (req, res) => {
    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid trip ID' });
        }

        const trip = await Trip.findById(id);

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        res.status(200).json({ trip });
    } catch (error) {
        console.error('Error fetching trip:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete Trip
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid trip ID' });
        }

        const deletedTrip = await Trip.findByIdAndDelete(id);

        if (!deletedTrip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        res.status(200).json({ message: `Trip with id: ${id} deleted` });

    } catch (error) {
        console.error('Error deleting trip:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
export default router;