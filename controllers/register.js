const registerHandler = (req,res,bcrypt,db)=>{
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        return res.status(400).json('Error submitting your details')
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx =>{
        trx.insert({
            hash : hash,
            email : email
        })
        .into('login')
        .returning('email')
        .then(loginEmail =>{
        return trx('users')
        .returning('*')
        .insert({
            name : name,
            email : loginEmail[0],
            joined : new Date()
        }).then(user =>{
            res.json(user[0]);
        })
        })
        .then(trx.commit)
        .catch(trx.rollback)

    })
    .catch(err =>{
        res.status(400).json('Unable to register')
    });
/* 
    database.users.push({
        id : "4",
        name : name,
        email : email,
        entries : 0,
        joined : new Date()

    }); */
    
}

module.exports = {
    registerHandler
}