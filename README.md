# mailSender-App
In this project Node nodemailer and OAuth2 is used for sending email.
# Send mails from Gmail using Nodemailer
This is a sample script for sending e-mails from gmail using Nodemailer. In order to use this, please retrieve the folloing parameters before run this script.

1. gmail address
1. client ID
1. client Secret
1. Refresh token
    - Please include ``https://mail.google.com/`` in the scope.
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
