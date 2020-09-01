
const handleRegister = (req, res, db, bcrypt) => {
    // using destructuring we store whatever we get from req.body or the front-end and store it in variables
    const { email, password, name, id } = req.body;

    //Validation

    if(!email || !name || !password){
        return res.status(400).json("incorrect form submission")
    }
    
    // using bcrypt to hash the password of our users
    const hash = bcrypt.hashSync(password); // we now have an encrypted password now we need to update both the users
    // and the login tables.

        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                // using knex to insert user info into users table in our database
                return trx('users')
                    .returning('*')//returning all columns form users
                    .insert({ //inserts the new user into the table.
                        name: name,
                        email: loginEmail[0],
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(err => res.status(400).json("unable to join"))
        
}

module.exports = {
    handleRegister: handleRegister
}