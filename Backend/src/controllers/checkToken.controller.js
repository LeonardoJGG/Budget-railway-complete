import { User } from "../models/User.js";

export const checkToken = async (req, res, next) => {
    const checkUser = await User.findOne({ where: { id: req.user.id } });
    return res.status(200).json({
        success: true,
        message: "Login Successfull",
        user: { name: checkUser.name , email: checkUser.email }
    })
}