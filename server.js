const express = require('express');//Get access to the express package


const app = express();// create app by calling express
//remember to always use this middleware to parse the information sent from the front-end to the back-end
app.use(express.json());
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
        ] 
 }

 // root route

app.get('/', (req, res) => {
    res.send('this is working');
})


// Sign in route

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json('success');
    }else {
        res.status(400).json('error loging in')
    }
})


app.listen(3000, () => {
    console.log('app is running on port 3000')
})//liten to lacalhost 3000

