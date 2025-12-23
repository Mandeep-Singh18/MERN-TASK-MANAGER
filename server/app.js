import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({origin: 'http://localhost:5173', credentials: true}));
app.use(express.json());
app.use(cookieParser());


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, // limit each IP to 100 requests per window,
  message: 'Too many requests from this IP, Please try again after 15 minutes.',
});
app.use('/api/', limiter);

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.error('Database Connection Error:', err));


app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running: ${PORT}`));