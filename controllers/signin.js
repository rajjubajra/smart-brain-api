

const handleSignin = (req, res, db, bcrypt ) => {

  const { email, password } = req.body;
  if( !email || !password ){
    return res.status(400).json('incorrect submit form');
  }

  db.select('email', 'hash').from('login')
  .where('email', '=' , email )
  .then( data => {
     console.log('posted data : ', data);
  const isValid = bcrypt.compareSync(password, data[0].hash);
  console.log(isValid);
  if(isValid){
    return db.select('*').from('users').where('email', '=', email)
    .then(user => {
      console.log('login credintials: ',user);
      res.json(user[0]);
    })
    .catch(err => res.status(400).json('user not found'))
  }else{
      res.status(400).json('wrong credintials 1');
  }
})
.catch(err => res.status(400).json('wrong credintials 2'))
/*
// if( req.body.email === database.users[0].email
//     && req.body.password === database.users[0].password){
//       //res.json('success');
//       res.json(database.users[0]);
//
//     }else{
//       res.status(400).json('login fail');
//     }
*/
}

module.exports = {
  handleSignin: handleSignin
}
