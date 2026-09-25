import { User } from "../models/user.models.js"


const  generateAccessTokenandRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
        
    } catch (error) {
        console.log(error, "something went wrong while generating access token and refresh token");
        
    }
}

export const createUser = async (req, res)=>{
    
    try {
        const {username,email,password,role} = req.body
        console.log(req.body);

       
        
        if(!username || !email || !password || !role){
            console.log("All fileds are required");
            
        }
    
        const user =  await User.create({
            username,
            email,
            password,
            role
        })
        // console.log(user);
         const {accessToken,refreshToken} = await generateAccessTokenandRefreshToken(user._id)
        
    return res
        .status(201)
        .json({
            status: "success",
            user,
            accessToken,
            refreshToken,
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const isPasswordValid = await user.isPasswordCorrect(password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const { accessToken, refreshToken } =
            await generateAccessTokenandRefreshToken(user._id);

        // res.cookie("accessToken", accessToken, {
        //     httpOnly: true,
        //     secure: false,
        //     sameSite: "lax"
        // });

        // res.cookie("refreshToken", refreshToken, {
        //     httpOnly: true,
        //     secure: false,
        //     sameSite: "lax"
        // });

        return res.status(200).json({
            message: "Login successful",
            user,
            accessToken,
            refreshToken
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};
export const logout = async(res,req)=>{
    await User.findByIdAndUpdate(
        req.body._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
            new: true
        }
    )
    const option = {
        httpOnly: true,
        secure: true
    }
    res
    .status(200)
    .clearcookie("accessToken",option)
    .clearcookie("refreshToken",option)
    .json({
        message: "logout successfully"
    })
}

export const currentUser = async(req,res)=>{
    const user = req.user
    return res
    .status(200)
    .json({
        message: "user fetched successfully",
        user

    })
    

}

export const getAllUsers = async(req,res)=>{
    try {
        
        const users = await User.find({})

        return res
        .status(200)
        .json({
            message:"all users fetched successfully",
            users
        })

    } catch (error) {
        console.log(error);
        
        return res
        .status(500)
        .json({
            message:"somthing went wrong while fetching all users",
            error: error.message
        })
    }
}