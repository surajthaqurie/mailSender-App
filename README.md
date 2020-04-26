### mailSender-App
In this project Node nodemailer and OAuth2 is used for sending email.

### Send mails from Gmail using Nodemailer
This is a sample script for sending e-mails from gmail using Nodemailer. All ```process.env.``` parameters are retrive from [google cloud console](https://console.cloud.google.com/), and some important parameters are to run this script.

##### Scope Of This Project is: ``https://mail.google.com/``.
- Gmail Address
- cient ID
- client Secret
- Refresh token
- Access token
- Google Redirect Url
- Enable gmail API at API console.



~~~javascript
- Install Nodemailer npm install nodemailer.
- Install googleapis npm install googleapis.

const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
    type: 'OAuth2',
    user: '### your gmail address ###',
    clientId: '### client ID ###',
    clientSecret: '### client secret ###',
    refreshToken: '### refresh token ###',
    accessToken:'### accesstoken ###'
    }
});


var mailOptions = {
    from: '#####',
    to: '#####',
    subject: 'sample subject',
    text: 'sample text',
    html: '<b>sample html</b>',
};


transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
        return console.log(err);
    } else {
        console.log(JSON.stringify(res));
    }
});
~~~

### Reference :
- [Nodemailer](https://www.npmjs.com/package/nodemailer)
- [Nodemailer OAuth2](https://nodemailer.com/smtp/oauth2/)
