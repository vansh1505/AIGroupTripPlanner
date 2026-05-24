import express, { json } from 'express';
import dotenv from 'dotenv';
import tripRoutes from './routes/trip.routes.js';
import aiRoutes from './routes/ai.routes.js';
import responseRoutes from './routes/response.routes.js';
import { connectDB } from './config/db.js';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(json());
app.use(cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:5173']
}));
connectDB();

app.use('/api/trips', tripRoutes);
app.use('/api/trips', responseRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
    res.json({ ping: 'pong' }).status(200);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});