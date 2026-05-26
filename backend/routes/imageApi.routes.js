import { Router } from 'express';

const router = Router();
router.get('/city-image', async (req, res) => {
    try {
        const { city } = req.query;
        if (!city) {
            return res.json({
                image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=1000'
            });
        }

        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(city)}&orientation=landscape&per_page=1&order_by=relevant&client_id=${process.env.UNSPLASH_KEY}`
        );

        if (!response.ok) {
            throw new Error(`Unsplash API responded with status ${response.status}`);
        }

        const data = await response.json();

        const image = data?.results?.[0]?.urls?.regular || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=1000';

        res.json({ image });
    } catch (error) {
        console.error('Error fetching city image:', error);
        res.json({
            image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=1000'
        });
    }
});

export default router;