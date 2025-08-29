const UserModel = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function adduser(req,res){

    const payload = req.body
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    const Newuser = await UserModel.create({
        ...payload,password:hashPassword
    })

    res.redirect('/login')

    res.json({
        status:201,
        message:"user created successfully",
        data:Newuser
    })

}

async function alluser(req,res){
    const Alluser = await UserModel.find()

    res.json({
        status:200,
        message:"Alluser fetch successfully",
        data:Alluser
    })
}


async function singleuser(req,res){
    const {id} = req.params;

    const Singleuser = await UserModel.findOne({_id:id})

     res.json({
        status:200,
        message:"Fetch Single User successfully",
        data:Singleuser
    })
}

async function updateuser(req,res){
    const {id} = req.params;
    const payload = req.body

    const Updateuser = await UserModel.findByIdAndUpdate(id,payload,{new:true})

    res.json({
        status:200,
        message:"Updated successfully",
        data:Updateuser
    })
}

async function deleteuser(req,res){
    const {id} = req.params;

    const Deleteuser = await UserModel.findByIdAndDelete(id)

    res.json({
        status:200,
        message:"Deleted successfully",
        data:Deleteuser
    })
}

async function login(req,res){
    const {email,password} = req.body

    const user = await UserModel.findOne({email})

    if(!user){
        return res.status(400).send("Email id is not valid !!");
    }

    const hashpassword = await bcrypt.compare(password,user.password)

    if(!hashpassword){
        return res.status(400).send("password is wrong");
    }
    
    const token = jwt.sign({
        id: user._id,
    },process.env.JWT_SECRET)

    res.cookie('auth', token)

    res.json({
        status: 200,
        message:"login successfully !!",
        data:user,
        token
    })
}



module.exports = {adduser,alluser,singleuser,updateuser,deleteuser,login}