import jwt from "jsonwebtoken";

export const generateToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_CODE, { expiresIn: "7d" });
}