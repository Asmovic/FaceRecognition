const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '014a6b425c07433d85cf44993a9ee887'
   });

const ApiHandler = (req,res)=>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data => {
        res.json(data)
    }).catch(err =>{
        res.status(400).json('Unable to fetch API')
    })
   }

const imageHandler = (req,res,db)=>{
    const { id } = req.body;
db('users').where('id', '=', id)
.increment('entries', 1)
.returning('entries')
.then(ent =>{
    res.json(ent[0]);
}).catch(err=>{
    res.status(400).json('Error getting entries');

        /* let found = false;
    database.users.map(user =>{
        if(user.id == id){
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if(!found){
        return res.status(400).json('invalid user');
    } */
})};

module.exports = {
    imageHandler,
    ApiHandler
}