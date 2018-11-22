const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin   = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : '',
    password : '',
    database : 'face-detection-db'
  }
});



console.log(db.select('*').from('users'));

const app = express();

app.use(bodyparser.json());
app.use(cors());

database = {
  users: [
    {
      id: '123',
      name: 'john',
      email: 'john@email.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'sally',
      email: 'sally@email.com',
      password: 'apple',
      entries: 0,
      joined: new Date()
    },
  ]
}


app.get('/',(req, res) => {res.send("it is working")} )

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)} )

app.get('/profile/:id', (req, res ) => {profile.handleProfileGet(req, res, db)} )

app.put('/image', (req, res) => {image.handleImage(req, res, db)} )

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)} )



app.listen( process.env.PORT || 5000, () =>{
  console.log('app is listening at port ${process.env.PORT}');
})
