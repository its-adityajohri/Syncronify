const nodemailer = require("nodemailer");

const sendMail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        secure: true,
        auth:{
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendMail;


// const sgMail = require("@sendgrid/mail");

// sgMail.setApiKey(process.env.SG_KEY || '');

// const sendSGMail = async ({
//   to,
//   sender,
//   subject,
//   html,
//   attachments,
//   text,
// }) => {
//   try {
//     const from = "adityajohri2015@gmail.com";

//     const msg = {
//       to: to, // Change to your recipient
//       from: from, // Change to your verified sender
//       subject: subject,
//       html: html,
//       // text: text, // Uncomment if text is needed
//       attachments,
//     };

//     return sgMail.send(msg);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const sendEmail = async (args) => {
//   if (!(process.env.NODE_ENV === "development")) {
//     return Promise.resolve();
//   } else {
//     return sendSGMail(args);
//   }
// };

// module.exports = sendEmail;



// // import sgMail from "@sendgrid/mail";

// // sgMail.setApiKey(process.env.SG_KEY || '');

// // const sendSGMail = async ({
// //   to,
// //   sender,
// //   subject,
// //   html,
// //   attachments,
// //   text,
// // }) => {
// //   try {
// //     const from = "adityajohri2015@gmail.com";

// //     const msg = {
// //       to: to, // Change to your recipient
// //       from: from, // Change to your verified sender
// //       subject: subject,
// //       html: html,
// //       // text: text,
// //       attachments,
// //     };

    
// //     return sgMail.send(msg);
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };

// // const sendEmail = async (args) => {
// //   if (!(process.env.NODE_ENV === "development")) {
// //     return Promise.resolve();
// //   } else {
// //     return sendSGMail(args);
// //   }
// // };

// // export default sendEmail;