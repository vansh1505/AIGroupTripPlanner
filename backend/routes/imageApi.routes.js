import {Router} from 'express';

const router = Router();
router.get('/city-image', async (req, res) => {

    const { city } = req.query;

    const response = await fetch(
  `https://api.unsplash.com/search/photos?query=${city} &orientation=landscape&per_page=1&order_by=relevant&client_id=${process.env.UNSPLASH_KEY}`
);

    const data = await response.json();

    res.json({
        image: data.results[0]?.urls?.regular
    });
});

export default router;