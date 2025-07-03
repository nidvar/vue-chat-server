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
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.listen(8080, ()=>{
    console.log('server on port 8080');
})