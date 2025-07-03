import Post from '../models/Post.js';
import Reply from '../models/Replies.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export const routes = function(app){

    const authMiddleware = async function(req, res, next){
        const token = req.cookies.token;
        console.log(token);
        if(!token){
            return res.sendStatus(401);
        };
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            return res.sendStatus(403);
        }
    };

    app.get('/', async (req, res)=>{
        const posts = await Post.find({});
        res.json(posts);
    });

    app.get('/blog/:id', async (req, res)=>{
        const blogPost = await Post.find({ _id: req.params.id});
        const replies = await Reply.find({replyTo:req.params.id});
        const data = {
            blogPost: blogPost,
            replies: replies
        };
        res.json(data);
    });

    app.post('/create', authMiddleware,  async (req, res)=>{
        try{
            const payload = {
                title: req.body.title, 
                body: req.body.body,
                email: req.cookies.email,
                username: req.cookies.username
            };
            await Post.create(payload);
            res.send('blog created');
        }catch(error){
            console.log(error);
            return res.json(error);
        }
    });

    app.post('/comment', authMiddleware, async (req, res)=>{
        try{
            const payload = {
                replyTo: req.body.replyTo, 
                comment: req.body.comment,
                email: req.cookies.email,
                username: req.cookies.username
            };
            await Reply.create(payload);
            return res.json('comment added');
        }catch(error){
            console.log(error);
            return res.json(error);
        }
    });

    app.post('/login', async (req, res)=>{
        console.log(req.body)
        try{
            const user = await User.findOne({email:req.body.email});
            if(user == null){
                console.log('no user found')
                return res.json('no user found');
            }else{
                const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);

                res.cookie('token', token, {httpOnly: true});
                res.cookie('email', req.body.email, {httpOnly: true});
                res.cookie('username', user.username, {httpOnly: true});

                return res.json({token: token});
            };
        }catch(err){
            console.log(err);
            return res.json(err);
        }
    });

    app.post('/register', async (req, res)=>{
        const emailExists = await User.findOne({email:req.body.email});
        const usernameExists = await User.findOne({username:req.body.username});
        if(emailExists == null || usernameExists == null){
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            await User.create(
                {
                    username: req.body.username, 
                    password: hashedPassword, 
                    admin: false, 
                    email: req.body.email
                }
            );
            res.json('win!');
        }else{
            return res.json('User exists');
        }
    });

    app.get('/logout', (req, res)=>{
        res.clearCookie('token', { httpOnly: true});
        res.clearCookie('email', { httpOnly: true });
        res.clearCookie('username', { httpOnly: true});
        return res.json('logged out');
    })
};