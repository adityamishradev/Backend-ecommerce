const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel=require('../models/userModel');


// registerController

async function register (req, res)  {
  const { name, email, password } = req.body;
 try {
  const existingUser = await userModel.findOne({email});
  if(existingUser){
    return res.status(400).json({message:"User already exists"})
  }
  const hashedPassword = await bcrypt.hash(password,10);
  const newUser =  await userModel.create({
    name,
    email,
  password:hashedPassword,
  });
  res.status(201).json({message:"User registered successfully",user:newUser});

 } catch (error) {
  res.status(500).json({message:"Something went wrong",error:error.message})
 }
};

// logincontroller

async function login (req, res) {
  const { email, password } = req.body;
 const user = await userModel .findOne({email});
  if(!user){
    return res.status(400).json({message:"User does not exist"})
  }
  const isPasswordValid = await bcrypt.compare(password,user.password);
  if(!isPasswordValid){
    return res.status(400).json({message:"Invalid credentials"})
  }
  const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
  res.status(200).json({message:"Login successful",user,token});


};
// get user profile
async function getprofile(req,res){
  const userId = req.user.id;
  const user = await userModel.findById(userId).select('-password');
  res.status(200).json({user});
}
// get all users
async function getAllUsers(req,res){
  const users = await userModel.find().select('-password');
  res.status(200).json({users});
}
module.exports={register,login,getprofile,getAllUsers}