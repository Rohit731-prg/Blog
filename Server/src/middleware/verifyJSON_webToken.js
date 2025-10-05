import JWT from 'jsonwebtoken';
import User from '../models/user.model.js';

export const verifyJsonToken = async (req, res, next) => {
    const { token } = req.cookies;
    console.log(token);
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    try {
        const decode = JWT.verify(token, process.env.JWT_CODE);
        const user = await User.findOne({ email: decode.email, _id: decode.id });
        if (!user) return res.status(401).json({ message: "Unauthorized" });
        if (user.auth === false) return res.status(403).json({ message: "Please verify your email" });
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}