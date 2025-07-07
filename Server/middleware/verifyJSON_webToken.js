import JWT from 'jsonwebtoken';

export const verifyJsonToken = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    try {
        const decode = JWT.verify(token, process.env.JWT_CODE);
        if (!decode || !decode.email) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.email = decode.email;
        next();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}