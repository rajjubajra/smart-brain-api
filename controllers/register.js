


const handleRegister = (req, res, db, bcrypt) => {

      const { user, name, email, pass } = req.body;
      if(!name || !email || !pass ){
        console.log(' empty field : ', name, email, pass);
        return res.status(400).json('incorrect submit form');
      }

            console.log('retrive data: ', email, pass);
            const hash = bcrypt.hashSync(pass);
            db.transaction( trx => {
              trx.insert({
                hash: hash,
                email: email
              })
              .into('login')
              .returning('email')
              .then( loginEmail => {
                  return trx('users')
                  .returning('*')
                  .insert({
                        name: name,
                        email: loginEmail[0],
                        joined: new Date()
                  }).then(user => {
                    res.json(user[0]);
                  })
              })
              .then(trx.commit)
              .catch(trx.rollback)
            })
            // .catch(err => res.status(400).json('ERROR: UNABLE TO REGISTER'));
            .catch(err => console.log("register error: ",err));


}

module.exports = {
  handleRegister: handleRegister
}
