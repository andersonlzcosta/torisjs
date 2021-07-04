import Nodemailer from 'nodemailer';

const host : string = process.env.MAIL_HOST || ''
const port : number = Number.parseInt(process.env.MAIL_PORT || '')
const user : string = process.env.MAIL_USER || ''
const pass : string = process.env.MAIL_PASSWORD || ''

const transporter = Nodemailer.createTransport({
  host,
  port,
  secure: false,
  auth: {
    user,
    pass,
  }
})

export default transporter
