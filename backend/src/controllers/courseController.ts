import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import connectDB from "../config/database";

interface Course {
    id: number;
    title: string;
    description: string;
}

// Fungsi mengambil data course
export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const connection = await connectDB(); 
        const [rows, fields] = await connection.execute('SELECT * FROM courses') as [RowDataPacket[], any];
        const courses: Course[] = rows as Course[];
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};