const express = require('express');//Get access to the express package
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
// controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '1234',
      database : 'face_recogn_db'
    }
}); // connecting to database face_recogn_db


const app = express();// create app by calling express
//remember to always use this middleware to parse the information sent from the front-end to the back-end
app.use(express.json());
app.use(cors());

/*

    PLAN YOUR API BEFORE YOU START CODING

We want to have a:

    - root route('/') 
    - signin route -- POST request
    - register route -- POST request -- return new user object
    - /profile/:id to access the user's profile by id -- GET request -- return the user
    - /image route -- PUT -- return updated user object

 */

 // root route

app.get('/', (req, res) => {
    res.json(database.users);
})


// Sign in route

app.post('/signin', (req, res) => {signin.signinHandler(req, res, db, bcrypt)})

// Register route
// This syntax is called dependency injection. We are passing into handle register everything it will need, intead of
// importing everything to it's file location.
app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.profileHandler(req, res, db )})

app.put('/image', (req, res) => {image.imageHandler(req, res, db)})

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });


app.listen(3000, () => {
    console.log('app is running on port 3000')
})//liten to lacalhost 3000

