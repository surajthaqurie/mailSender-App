const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// For Google credentials (googleOAuth keys)
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

function getOAuthClient() {
    return new OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_Redirect_URL
    );
}

const oauth2Client = getOAuthClient();

function getAuthUrl() {
    // generate a url that asks permissions for Gmail
    const scopes = process.env.GOOGLE_SCOPE;

    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        //use this below to force approval (will generate refresh_token)
        // approval_prompt: 'force'
        code_verifier: 'plain'
    });

    return url;
}

// console.log( getAuthUrl());

code = process.env.AUTHORIZATION_CODE;

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});


const TokenAccess = async () => {
    return new Promise(async (resolve, reject) => {
        const { token } = await oauth2Client.getAccessToken();

        // console.log('Token Here', token)
        return resolve(token);
    });
}

const accessToken = async () => {

    const accessTokenValue = await TokenAccess();
    // console.log('TOken Received ', accessTokenValue)
    return accessTokenValue;
}

// accessToken();

router.get('/', (req, res) => {
    // res.send('Server is up and running');
    res.render('contact.handlebars', { layout: false });
});

router.post('/send', (req, res) => {
    // console.log(req.body);
    const output = `
    <p><h3>You have a new contact request</h3></p>
    <h4>Contact Details</h4>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Company: ${req.body.company}</li>
    <li>Email: ${req.body.email}</li>
    <li>PhoneNo: ${req.body.phone}</li>
    </ul>
    <h4>Message:</h4><p> ${req.body.message}</p>
    `;


    // Create Reusable Transporter Object Using The Default SMTP(Gmail) Transport
    const smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        // host: "smtp.gmail.com",
        // port: 587,
        // secure: false,
        auth: {
            type: 'OAuth2',
            user: process.env.YOUR_GMAIL_ADDRESS,
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken()
        }
    });

    // Setup email data with unicode symbols
    let mailOptions = {
        from: process.env.YOUR_GMAIL_ADDRESS, // sender address
        to: req.body.email,   // list of receivers
        subject: "Important  Notice", // Subject line
        // text: "Hello world?", // plain text body
        html: output, // html body
        generateTextFromHTML: true,
    }
    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
            smtpTransport.close();
            return console.log(error);
        }
        smtpTransport.close();
        
        // console.log("Message sent: %s", info.messageId);
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        res.render('contact.handlebars', {
            msg: 'Email Has Been Send',
            layout: false
        });
    });
});

module.exports = router;