import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import {routes} from './routes/main.js';
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = ['https://mevn-blog.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // if you're using cookies/auth headers
}));

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

routes(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
  console.log('server on port ' + PORT);
})
