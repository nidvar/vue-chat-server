import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
});

const Post = mongoose.model('Post', PostSchema);

export default Post;