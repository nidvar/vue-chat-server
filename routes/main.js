import Post from '../models/Post.js';
import Reply from '../models/Replies.js';

export const routes = function(app){

    app.get('', async (req, res)=>{
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

    app.post('/create', async (req, res)=>{
        console.log(req.body);
        try{
            const payload = {
                title: req.body.title, 
                body: req.body.body,
                email: 'bat@mail.com',
                username: 'bat'
            };
            const response = await Post.create(payload);
            console.log(response);
            res.send('win!');
        }catch(error){
            console.log(error);
        }
    });

    app.post('/comment', async (req, res)=>{
        console.log(req.body);
        try{
            const payload = {
                replyTo: req.body.replyTo, 
                comment: req.body.comment,
                email: 'bat@mail.com',
                username: 'bat'
            };
            const response = await Reply.create(payload);
            console.log(response);
            res.json('win!');
        }catch(error){
            console.log(error);
        }
    });

    app.post('/login', async (req, res)=>{
        console.log(req.body);
        if(req.body.password === '123456'){
            res.send('logged in!', req.body.email)
        }else{
            res.send('failed. wrong password')
        }
    });

    app.post('/register', async (req, res)=>{
        console.log(111, req.body);
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        res.send('working !!!');
        return
        const emailExists = await User.findOne({email:email});
        const usernameExists = await User.findOne({username:username});
        await User.create(
            {
                username: username, 
                password:hashedPassword, 
                admin:false, 
                email:email
            }
        );
    });

    
};