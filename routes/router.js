
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// For Google credentials (googleOAuth keys)
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;



router.get('/', (req, res) => {
    // res.send('Server is up and running');
    res.render('contact.handlebars', { layout: false });
});

router.post('/send', (req, res) => {
    // console.log(req.body);
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Company: ${req.body.company}</li>
    <li>Email: ${req.body.name}</li>
    <li>PhoneNo: ${req.body.phone}</li>
    </ul>
    <h3>Message:</h3><p> ${req.body.message}</p>
    `;


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'mail.traversymedia.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.GMAIL_ADDRESS, // generated ethereal user
            pass: process.env.GMAIL_PASS // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // Setup email data with unicode symbols
    let mailOptions = {
        from: `"Suraj Chand" <${process.env.GMAIL_ADDRESS}>`, // sender address
        to: 'surajchan68@gmail.com', // list of receivers
        subject: "Node Email Sender ✔", // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
    }
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        res.render('contact.handlebars', { msg: 'email has been send' })
    });
});

module.exports = router;