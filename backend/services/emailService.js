const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASSWORD
  }
});

function sendEmail(data) {
  const mailOptions = {
    from: {
        name: "SHEENA SEEDS CUSTOMER CARE",
        address:process.env.EMAIL_USER
    },
    to: process.env.EMAIL_USER, 
    subject: data.subject,  
    html : `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7; border: 1px solid #ddd; border-radius: 8px;">
        <h1 style="font-size: 24px; color: #2c3e50; margin-bottom: 20px;">Contact Email: <span style="color: #1abc9c;">${data.email}</span></h1>
        <h2 style="font-size: 20px; color: #34495e; margin-bottom: 10px;">Message:</h2>
        <div style="font-size: 16px; color: #555; line-height: 1.6; padding: 15px; background-color: #ffffff; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
            <p>${data.message}</p>
        </div>
    </div>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

module.exports = {sendEmail};
