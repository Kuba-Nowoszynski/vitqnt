const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // or another email service
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendVerificationEmail = async (user, verifyToken) => {
  // handle email verification
  const verificationLink = `http://localhost:5173/verify-email?token=${verifyToken}`; //change url later

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: user.email,
    subject: "Email Verification",
    html: `<h1>Successfully signed up to VitQnt</h1>
             <h2>Click on <a href="${verificationLink}">this link</a> to verify your email.</h2>
             <h4>If you have not signed up for our website contact support</h4>
            `,
  };

  //send email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

exports.verifyEmailTransporter = () => {
  //verify transporter
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
};
