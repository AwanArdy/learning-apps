import { Request, Response } from "express";
import pool from "../config/database";

interface Course {
    id: number;
    title: string;
    description: string;
}

// Fungsi mengambil data course
export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM courses');
        const courses: Course[] = rows as Course[];
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};