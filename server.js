import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import {routes} from './routes/main.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
routes(app);

app.listen(8080, ()=>{
    console.log('server on port 8080');
})