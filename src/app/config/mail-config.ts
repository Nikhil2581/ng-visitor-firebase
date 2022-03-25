import {nodemailer} from '@types/nodemailer'

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: '********@gmail.com',
        pass: '************'
    }
});