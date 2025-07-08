import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import {routes} from './routes/main.js';
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

routes(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
  console.log('server on port ' + PORT);
})