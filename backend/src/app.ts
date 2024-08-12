import express from 'express';
import cors from 'cors';
import connectDB from './config/database';
import router from './routes/auth';
import courseRouter from './routes/auth';

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', router);
app.use('/api/courses', courseRouter);

export default app;