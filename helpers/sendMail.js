const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

module.exports.sendMail = (email, subject, html) => {
    const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      }));
      
      const mailOptions = {
        from: 'fmlbabyboy@gmail.com',
        to: email,
        subject: subject,
        html: html
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });  
}