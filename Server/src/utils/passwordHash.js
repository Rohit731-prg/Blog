import bcript from "bcryptjs";

export const ganarateHashPassword = async (password) => {
    return await bcript.hash(password, 10);
};

export const compairPassword = async (password, hashPassword) => {
    return await bcript.compare(password, hashPassword);
}