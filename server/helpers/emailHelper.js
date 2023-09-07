const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // or another email service
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendVerificationEmail = (user, verifyToken) => {
  // handle email verification
  const verificationLink =
    process.env.NODE_ENV === "production"
      ? `https://vitqnt.netlify.app/verify-email?token=${verifyToken}`
      : `http://localhost:5173/verify-email?token=${verifyToken}`;

  const logoImageUrl =
    "https://drive.google.com/uc?id=1caHfQKaCwL56Un_5N8IpV_SjoHQJulGk";

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: user.email,
    subject: "Email Verification",
    html: `<div style="font-family: Arial, sans-serif; text-align: center;">
           <img src="${logoImageUrl}" alt="VitQnt Logo" style="max-width: 100px;">
           <h1 style="color: #007bff;">Successfully signed up to VitQnt</h1>
           <p style="font-size: 16px;">Click on <a href="${verificationLink}" style="color: #007bff;">this link</a> to verify your email.</p>
           <p style="font-size: 14px; color: #777;">If you have not signed up for our website, please contact support.</p>
         </div>`,
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

exports.sendContactFormEmail = (email, subject, message) => {
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_ADDRESS, // Add this to your .env
    subject: subject,
    html: `<div style="font-family: Arial, sans-serif;">
            <h3>Contact Form Message</h3>
            <p><strong>From:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
           </div>`,
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
