import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SG_KEY || '');

const sendSGMail = async ({
  to,
  sender,
  subject,
  html,
  attachments,
  text,
}) => {
  try {
    const from = "adityajohri2015@gmail.com";

    const msg = {
      to: to, // Change to your recipient
      from: from, // Change to your verified sender
      subject: subject,
      html: html,
      // text: text,
      attachments,
    };

    
    return sgMail.send(msg);
  } catch (error) {
    console.log(error);
  }
};

const sendEmail = async (args) => {
  if (!(process.env.NODE_ENV === "development")) {
    return Promise.resolve();
  } else {
    return sendSGMail(args);
  }
};

export default sendEmail;