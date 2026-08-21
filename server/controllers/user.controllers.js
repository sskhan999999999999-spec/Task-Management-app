import { User } from "../models/user.models.js"

export const createUser = async (req, res)=>{
    
    try {
        const {username,email,password} = req.body
        console.log(req.body);
        
        if(!username || !email || !password){
            console.log("All fileds are required");
            
        }
    
        const user =  await User.create({
            username,
            email,
            password
        })
        console.log(user);
        
    return res
        .status(201)
        .json({
            status: "success",
            user
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const login =  async(req,res)=>{

    try {
         
         const {email,password} = req.body

       const user =  await User.findOne({
          email
        })
        console.log(user);
        if (user.password != password) {
            return res.status(400).json({
                message: "invalid password"
            })
        }
        
        if(!user){
            res.status(400)
            .json({
                message: "invalid credentials "

            })
        }

      return  res.
        status(201)
        .json({
            message: "success",
            user
        })
        
    } catch (error) {
        console.log(error);
        
       return res.
        status(400)
        .json({
            error,
            message: "invalid credentials"
        })
    }
}