'use strict';
const nodemailer = require('nodemailer');

exports.sendMail = async() => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'mail.melanciaonline.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'mailgun@melanciaonline.com', //account.user, // generated ethereal user
            pass: 'RUN}MLjj,ftB' //account.pass // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'mailgun@melanciaonline.com', // sender address
        to: 'sksushil999@gmail.com', // list of receivers
        subject: 'Hello ✔ new', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
    // });
}