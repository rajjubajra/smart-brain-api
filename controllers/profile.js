

const handleProfileGet = (req, res) => {
  const {id} = req.params;
  // let found = false;
      db('users').where({
      id: id
    })
    .then(user => {
      if(user.length){
        res.json(user[0]);
      }else {
        res.status(404).json('not found');
      }
    })
    .catch(err => res.status(404).json('Err: Getting user'))
  /*
  // database.users.forEach( user => {
  //   found = true;
  //   if(user.id === id){
  //     return res.json(user);
  //   }else{
  //     return res.status(404).json('user not found');
  //   }
  // })
  // if(!found){
  //    res.status(404).json('user not found');
  // }
  */
}

module.exports = {
  handleProfileGet: handleProfileGet
}
