import { Request, Response } from "express";
import pool from "../config/database";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RowDataPacket } from "mysql2";

interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    phone_number: string;
}

// Fungsi register dengan enkripsi
export const register = async (req: Request, res: Response) => {
    const { username, password, email, phoneNumber } = req.body;

    try {
        // Hash password, email dan nomor telepon
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const hashedEmail = await bcrypt.hash(email, saltRounds);
        const hashedPhoneNumber = await bcrypt.hash(phoneNumber, saltRounds);

        // Simpan data pengguna ke database
        await pool.execute(
            'INSERT INTO users (username, email, password, phone_number) VALUES (?, ?, ?, ?)',
            [username, hashedEmail, hashedPassword, hashedPhoneNumber]
        );

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Fungsi login dengan verifikasi password
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const [rows, fields] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]) as [RowDataPacket[], any];
        const user = rows[0] as User | undefined;
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};