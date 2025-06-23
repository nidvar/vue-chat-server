import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    
})


app.listen(8080, ()=>{
    console.log('server on port 8080');
})