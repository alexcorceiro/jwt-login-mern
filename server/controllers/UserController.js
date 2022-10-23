const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = async(req, res, next) =>{
    const {name, email, password} = req.body
    let existingUser;
    try{
        existingUser = await User.findOne({email: email})
    }catch(err){
        console.error(err.message)
    }
    if(existingUser){
        return res.status(400).json({message: "user exists"})
    }
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const user = new User({
        name,
        email,
        password: hashedPassword,
    })

    try{
        await user.save()
    }catch(err){
        console.error(err.message)
    }
    return res.status(201).json({message: user})
}

exports.login = async(req, res, next ) => {
    const {email, password} = req.body;

    let existingUser;
    try{

        existingUser = await User.findOne({email})
    }catch(err){
        return new Error(err);
    }
    if(!existingUser){
        return res.status(400).json({message: "user not found"})
    }
    const isPasswordValid = await bcrypt.compareSync(password, existingUser.password)
    if(!isPasswordValid) {
        return res.status(400).json({message: 'invalid password'})
    }
    const token = jwt.sign({ id: existingUser._id}, process.env.SECRET_KEY, {
        expiresIn: "30s"
    });

    if(req.cookies[`${existingUser._id}`]) {
        req.cookies[`${existingUser._id}`] = ""
    }

    res.cookie(String(existingUser._id), token, {
        path: '/',
        expires: new Date(Date.now()+ 1000 * 30),
        httpOnly: true,
        sameSite: "lax"
    })

    return res.status(200).json({message: 'login success', user:existingUser, token})
}

exports.verifyToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1]
    console.log(token)
   
    jwt.verify(String(token), process.env.SECRET_KEY, (err,user) => {
        if(err){
            return res.status(400).json({message: "invalid token"})
        }
       console.log(user.id)
        req.id = user.id
    })
    next()
}

exports.getUser = async(req, res, next) => {
    const userId = req.id;
    let user;
    try{
      user = await User.findById(userId,"-password")
        
    }catch(err){
        return new Error(err)
    }
    if(!user){
        return res.status(404).json({message: "user not found"})
    }
    return res.status(200).json({user})
}


exports.refresh = async(req, res, next) => {
    const cookies= res.headers.cookie;
    const prevtoken = cookies.split("=")[1]

    if(!prevtoken){
        return res.status(400).json({message: "couldnt fin token"})
    }
    jwt.verify(String(prevtoken), process.env.SECRET_KEY, (err,user) => {
        if(err){
            console.log(err)
            return res.status(403).json({message: "authentificatio failed"})
        }
        res.clearCookie(`${user.id}`)
        req.cookies[`${user.id}`] = "";

        const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {
            expiresIn: '30s'
        })
        res.cookie(String(user.id ), token, {
            path: '/',
            expires: new Date(Date.now()+ 1000 * 30),
            httpOnly: true,
            sameSite: "lax"
        })
        req.id = user.id;
        next()
    })
}