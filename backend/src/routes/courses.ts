import express from 'express';
import { getAllCourses } from '../controllers/courseController';
import authMiddleware from '../middleware/auth';

const courseRouter = express.Router();

courseRouter.get('/', authMiddleware, getAllCourses);

export default courseRouter;