import { Router } from 'express';
import Trip from '../schema/trip.schema.js';
import llm from '../config/llm.js';
const router = Router();

router.post('/:tripId', async (req, res) => {

    try {

        const { tripId } = req.params;

        const trip = await Trip.findById(tripId);

        if (!trip) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        if (trip.aiRecommendation) {
            return res.status(400).json({
                message: 'AI recommendation already generated for this trip'
            });
        }

        const prompt = `
      You are an AI travel planner.

      Analyze the following group trip preferences.

      Suggest:
      1. Top 3 destinations
      2. Why they fit
      3. Budget suitability
      4. Activities

      Group Data:
      ${JSON.stringify(trip.responses)}
      `;

        const result = await llm.invoke(prompt);

        const recommendation = result.content;

        trip.aiRecommendation = recommendation;

        await trip.save();

        res.status(200).json({
            recommendation
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Internal server error'
        });

    }

});

export default router;