const express = require('express');//Get access to the express package
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');


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

 const database = {
     users: [
         {
             id: '123',
             name: 'John',
             email: 'john@gmail.com',
             password: 'cookies',
             entries: 0,
             joined: new Date()
         },
         {
            id: '124',
            name: 'Anna',
            email: 'anna@gmail.com',
            password: 'cake',
            entries: 0,
            joined: new Date()
        }
        ] ,
        login: [
            {
                id: '987',
                hash: '',
                email: 'john@gmail.com'
            }
        ]
 }

 // root route

app.get('/', (req, res) => {
    res.json(database.users);
})


// Sign in route

app.post('/signin', (req, res) => {
    //bcrypt returns a hashed string( a string that has been transformed into very randome code for security)
    bcrypt.compare("snow", "$2a$10$UJxFnxHzif9AVNK7bBtDyejwhwyh1fG70G19VFjWm4GC5c3jEzm0W", function(err, res) {
        console.log('first guess', res)
    });
    //bcrypt allows us to comapre hashes
    bcrypt.compare("veggies", "$2a$10$UJxFnxHzif9AVNK7bBtDyejwhwyh1fG70G19VFjWm4GC5c3jEzm0W", function(err, res) {
        console.log('second guess', res);
    });
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json(database.users[0]);
    }else {
        res.status(400).json('error loging in')
    }
})

// Register route

app.post('/register', (req, res) => {
    // using destructuring we store whatever we get from req.body or the front-end and store it in variables
    const { email, password, name, id } = req.body;
    // using knex to insert user info into users table in our database
    db('users').insert({
        name: name,
        email: email,
        joined: new Date()
    }).then(console.log)
    res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res ) => {
    const {id} = req.params;
    //We want to loop through our database to grab every id and comapre it to the one entered in the parameters.
    //if the ids match then we want to return the user with that specific id
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            res.json(user);
        }
    })
    if(!found) {
        res.status(404).json("no such user")
    }
})

app.put('/image', (req, res) => {
    //first get the user 
    const {id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries ++;
            res.json(user.entries);
        }
    })
    if(!found) {
        res.status(404).json("no such user")
    }
    // then adjust the entries of that particular user



})

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });


app.listen(3000, () => {
    console.log('app is running on port 3000')
})//liten to lacalhost 3000

