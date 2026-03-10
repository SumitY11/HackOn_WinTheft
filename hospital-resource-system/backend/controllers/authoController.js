const jwt = require("jsonwebtoken")

exports.login = async (req,res)=>{

 const {email,password} = req.body

 // Demo users (for hackathon)
 const users=[
  {email:"admin@healthtrack.gov",password:"admin123",role:"admin"},
  {email:"doctor@healthtrack.gov",password:"doctor123",role:"doctor"},
  {email:"patient@example.com",password:"patient123",role:"patient"}
 ]

 const user = users.find(
  u => u.email===email && u.password===password
 )

 if(!user){
  return res.status(401).json({message:"Invalid credentials"})
 }

 const token = jwt.sign(
  {email:user.email,role:user.role},
  "secret123",
  {expiresIn:"1d"}
 )

 res.json({
  token,
  role:user.role
 })

}