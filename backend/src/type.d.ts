import { DecodedToken } from '../middleware/auth'; // Import interface DecodedToken dari auth.ts

declare global {
    namespace Express {
        interface Request {
            user?: DecodedToken; // Tambahkan properti user dengan tipe DecodedToken (opsional)
        }
    }
}