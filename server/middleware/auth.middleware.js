import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const verifyJWT = async (req, res, next) => {
    try {
       console.log("COOKIES:", req.cookies);
        console.log("AUTH:", req.header("Authorization"));
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        console.log("Authorization:", req.header("Authorization"));
        console.log("Token:", token);

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized request"
            });
        }

        const decodedToken = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        console.log("Decoded token:", decodedToken);

        const user = await User.findById(decodedToken._id)
            .select("-password -refreshToken");

        console.log("User:", user);

        if (!user) {
            return res.status(401).json({
                message: "Invalid access token"
            });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("JWT Error:", error);

        return res.status(401).json({
            message: "Invalid or expired access token"
        });
    }
};