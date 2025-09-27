import nodemailer from 'nodemailer'
import "dotenv/config"
const gmailUser = process.env.GMAIL_USER
const appPassword = process.env.GMAIL_APP_PASSWORD

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailUser,
        pass: appPassword
    }
})

export const sendEmail = async (from, to, subject, html, text, attachments = []) => { //attachment is an array of object. each object has a href and filename property
    try {
        await transporter.sendMail({
            from: `${from} <${gmailUser}>`,
            to, subject, text, html,
            attachments
        })
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

// sendEmail('Hallo Chat', 'muhammedabdulshakur@gmail.com', 'Test Email', '<h1>Test Email</h1>', 'Test Email Text', attachments=[{href: 'https://site.com/logo.png', filename: 'logo.png'}])