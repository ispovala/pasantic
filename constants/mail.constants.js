const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "pasantic2022@gmail.com",
      pass: "Pasantic2022@"
    }
});

module.exports = transporter