const signinHandler = (req,res,bcrypt,db)=>{
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json('Error submitting your details')
    }
    db.select('email','hash').from('login')
    .where('email', '=',email)
    .then(data =>{
        const isexist = bcrypt.compareSync(password, data[0].hash);
        if(isexist){
            return db.select('*'). from('users')
            .where('email', '=', email)
            .then(output =>{
                res.json(output[0])
            })
            .catch(err =>{
                res.status(400).json('Invalid Credentials')
            })
        }else{
            res.status(400).json('Wrong Credentials')
        }
    }).catch(err =>{
        res.status(400).json('Invalid Credentials')
    })
};

module.exports = {
    signinHandler
}