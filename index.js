const express = require('express');
const empRoutes = require('./routes/emplRoutes');
const bodyParser=require('body-parser');
const errorHandler=require('./errorHandler');
const app = new express();
const port = 3000;

app.listen(port, () => {
    console.log(`first app listening on port ${port}`)
})
app.use(logger);
app.get('/',(req, res) => {
    console.log('hello')
    res.send('Hello World!')
});

app.get('/user',(req, res) => {
    // console.log("is user an admin?" ,req.admin)
    console.log('users Page')
    res.send('User Page')
});

app.get('/static', (req, res) => {
    res.sendFile('./welcome.html',{root:__dirname})
});

app.get('/json',(req,res)=>{
    var jsondata=[{"name": 'vp',"email":"vp@gmail.com"},
                   {"name": 'kp',"email":"kp@gmail.com"}];
    res.json(jsondata);
})

function logger(req,res,next){
    next();
 }

 function auth(req,res,next){
    if(req.query.admin === 'true'){
        req.admin = true;
        next();
        return;
    }
    res.send('No Auth');
 }
 
app.use(bodyParser.json())

app.use('/employee',empRoutes);
app.use(errorHandler)

