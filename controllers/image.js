const Clarifai =  require('clarifai');



const app = new Clarifai.App({
   apiKey: 'd0417d791dfa4452a2948c18ea73075d'
  });


const handleApiCall = (req, res) => {
  app.models.predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then( data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('unable work with API'))

}

const handleImage = (req,res, db) => {
      const {id} = req.body;
      db('users')
        .where('id', '=', id)
        .increment( 'entries', 1)
        .then( entries => {
          res.status(200).json(entries[0])
        })
        .catch(err => res.status(400).json('unable to update count entries '))
      /*
      // let found = false;
      // database.users.forEach( user => {
      //   found = true;
      //   if(user.id === id){
      //     user.entries++;
      //     return res.json(user.entries);
      //   }
      // })
      // if(found){
      //    res.status(404).json('user not found');
      // }
      */
}

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall
}
