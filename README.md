# mailSender-App
In this project Node nodemailer and OAuth2 is used for sending email.
# Send mails from Gmail using Nodemailer
This is a sample script for sending e-mails from gmail using Nodemailer. ALl ```process.env.``` parameters are retrive from [google cloud console](https://console.cloud.google.com/), and some important parameters are to run this script.

### Scope Of This Project is: ``https://mail.google.com/``.
1. Gmail Address
1. client ID
1. client Secret
1. Refresh token
1. Access token
1. Google Redirect Url
1. Enable gmail API at API console.
1. Install Nodemailer


~~~javascript
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

## Reference :
- [Nodemailer](https://www.npmjs.com/package/nodemailer)
- [Nodemailer OAuth2](https://nodemailer.com/smtp/oauth2/)
