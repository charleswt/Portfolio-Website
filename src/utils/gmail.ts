import nodemailer from 'nodemailer';
import 'dotenv/config'

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN

async function sendGmail(){
    try{
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "charleswtiffany@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                accessToken: ACCESS_TOKEN
            }
        })

        const mailOptions = {
            from: '',
            to: 'charleswtiffany@gmail.com',
            subject: '',
            text: ''
        }

        const result = await transport.sendMail(mailOptions)

        return result;
    } catch(error){
        console.log(error)
    }
}