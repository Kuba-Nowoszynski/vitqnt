const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // or another email service
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendVerificationEmail = (user, verifyToken, language) => {
  // handle email verification
  const verificationLink =
    process.env.NODE_ENV === "production"
      ? `https://vitqnt.netlify.app/verify-email?token=${verifyToken}`
      : `http://localhost:5173/verify-email?token=${verifyToken}`;

  const logoImageUrl =
    "https://drive.google.com/uc?id=1m3xyOyGy1m5Gsn-DrWhQgOjYGh6G0LXo";

  const polishText = `<div style="font-family: Arial, sans-serif; text-align: center;">
    <img src="${logoImageUrl}" alt="Logo VitQnt" style="max-width: 30%;">
    <h1 style="color: #a156f0;">Witaj w VitQnt!</h1>
    <p style="font-size: 16px;">Kliknij <a href="${verificationLink}" style="color: #007bff;">tutaj</a>, aby zweryfikować swój adres e-mail.</p>

    <p style="font-size: 14px; color: #777; width:60%; margin:auto;">Jeśli to nie Ty rejestrowałeś się na naszej stronie, po prostu zignoruj ten e-mail. Ze względów bezpieczeństwa niezweryfikowane konta zostają automatycznie usunięte w ciągu 15 minut.</p>
    <p style="font-size: 12px; color: #aaa; margin-top: 20px;">Masz problemy? <a href="https://vitqnt.netlify.app/contact" style="color: #007bff;">Skontaktuj się z bsługą</a>.</p>
    <p style="font-size: 12px; color: #aaa;">Rejestrując się, akceptujesz naszą <a href="https://vitqnt.netlify.app/privacy-policy" style="color: #007bff;">Politykę Prywatności</a>.</p>
</div>
`;
  const englishText = `<div style="font-family: Arial, sans-serif; text-align: center;">
           <img src="${logoImageUrl}" alt="VitQnt Logo" style="max-width: 30%;">
           <h1 style="color: #a156f0;">Welcome to VitQnt!</h1>
           <p style="font-size: 16px;">Click <a href="${verificationLink}" style="color: #007bff;">here</a> to verify your email address.</p>
           <p style="font-size: 14px; color: #777; width:50%; margin:auto;">If you have not signed up for our website, simply ignore this email. For security reasons, unverified accounts will be automatically removed within 15 minutes.</p>
             <p style="font-size: 12px; color: #aaa; margin-top: 20px;">Having trouble? <a href="https://vitqnt.netlify.app/contact" style="color: #007bff;">Contact Support</a></p>
    <p style="font-size: 12px; color: #aaa;">By signing up, you agree to our <a href="https://vitqnt.netlify.app/privacy-policy" style="color: #007bff;">Privacy Policy</a>.</p>
         </div>
         `;

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: user.email,
    subject: `${
      language === "english" ? "Email Verification" : "Weryfikacja Email"
    } - VitQnt`,
    html: language === "english" ? englishText : polishText,
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
