import mongoose from 'mongoose';

export const connectDB = async ()=>{
    try{
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('we are in! database name: ', mongoose.connection.name);
    }catch(error){
        console.log(error);
    }
};