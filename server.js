const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db =knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'BALIKIS007',
      database : 'facerecognitiondb'
    }
  });

const api = express();
api.use(bodyParser.json());
api.use(cors())



api.get('/', (req,res)=>{
    res.send(database.users);
})

api.get('/profile/:id', (req,res)=>{ profile.profileHandler(req,res,db) });

api.post('/signin', (req,res) => {signin.signinHandler(req,res,bcrypt,db)}); 

api.post('/register', (req,res)=> { register. registerHandler(req,res,bcrypt,db)});

api.put('/image', (req,res)=>{image.imageHandler(req,res,db)});
api.post('/imageUrl', (req,res)=>{image.ApiHandler(req,res)});


api.listen(3000, ()=>{
    console.log('app is running on port 3000')
});