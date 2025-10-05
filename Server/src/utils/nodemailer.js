import nodemailer from "nodemailer";

export const sendMail = async (to, subject, text) => {
    try {
        const transpoter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,                
            }
        });

        const mailOption = {
            from: `Personal Project OTP Verification <${process.env.EMAIL}>`,
            to: to,
            subject: subject,
            text: text,
            html: `<h1>${text}</h1>`
        }

        const info = await transpoter.sendMail(mailOption);
        console.log(info.response);
    } catch (error) {
        console.log('error from nodemailer', error);
    }
}