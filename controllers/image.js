
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
    imageHandler
}