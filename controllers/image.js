const Clarifai = require('clarifai');
const { response } = require('express');

// Clrifai API

const app = new Clarifai.App({
    apiKey: 'df98d06bc0b44c84a04886b9fcfee9e9'
  });


const apiHandler = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data =>{
            res.json(data);
        })
        .catch(err => res.status(400).json("unable to work with API"))
}


const imageHandler = (req, res, db) => {
    //first get the user 
    const {id} = req.body;
    // increment function from knex to update the entries in our database
    db('users')
        .where({id})
        .increment('entries', 1)//increments entries by one
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => res.status(400).json("unable to get entries"));
}

module.exports = {
    imageHandler,
    apiHandler
}