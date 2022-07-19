require("dotenv").config();
const mailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const { httpStatus } = require("../constants/http.constants");

const authClient = new OAuth2(
  process.env.MAIL_CLIENT_ID,
  process.env.MAIL_CLIENT_SECRET,
  process.env.MAIL_REDIRECT_URI
);
authClient.setCredentials({ refresh_token: process.env.MAIL_REFRESH_TOKEN });

async function createTransporter() {
  try {
    const accessToken = await authClient.getAccessToken();
    const transport = mailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USER,
        clientId: process.env.MAIL_CLIENT_ID,
        clientSecret: process.env.MAIL_CLIENT_SECRET,
        refreshToken: process.env.MAIL_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    return { ok: true, transport };
  } catch (error) {
    throw { ok: false, error };
  }
}

async function sendEmail(
  emailOptions = {
    to: "",
    subject: "",
    text: "",
  }
) {
  const result = await createTransporter();
  try {
    const mailResult = result.transport.sendMail({
      from: `Work Scape <${process.env.MAIL_USER}>`,
      ...emailOptions,
    });
    return mailResult;
  } catch (error) {
    throw {
      error,
      message: "Failed to send email",
      code: httpStatus.INTERNAL_SERVER_ERROR,
    };
  }
}

module.exports = { sendEmail };
