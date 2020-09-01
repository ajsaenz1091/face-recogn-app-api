
const profileHandler = (req, res, db ) => {
    const {id} = req.params;
    db.select('*').from('users')
        .where({id})//we can do id like this because both the proprty and the value are the same
        .then(user => {
            if(user.length){
                res.json(user[0])
            } else {
                res.satatus(400).json("not such user")
            }
        })
        .catch(err => res.status(400).json("error getting user"))
}


module.exports = {
    profileHandler: profileHandler
}