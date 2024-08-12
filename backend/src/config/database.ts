import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST || 'localhost',
            user: process.env.MYSQL_USER || 'root',
            password: process.env.MYSQL_PASSWORD || '',
            database: process.env.MYSQL_DATABASE || 'your_database_name'
        });
        console.log('Connected to MySQL');
        return connection;
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
        process.exit(1); 
    }
};

export default connectDB;