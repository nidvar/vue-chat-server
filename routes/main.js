import Post from '../models/Post.js';
export const routes = function(app){

    app.get('', async (req, res)=>{
        console.log('getting!!!');
        const posts = await Post.find({});
        console.log(posts);
        res.send(posts);
    });

    app.post('/register', (req, res)=>{
        console.log(req.body);
        res.send('working !!!');
    });

    app.post('/login', (req, res)=>{
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
    })
};