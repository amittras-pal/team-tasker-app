require("dotenv").config();
const mailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const { StatusCodes } = require("http-status-codes");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

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
    transport.use(
      "compile",
      hbs({
        viewEngine: {
          extname: ".handlebars",
          partialsDir: path.resolve(__dirname, "../", "mailTemplates"),
          defaultLayout: false,
        },
        extName: ".handlebars",
        viewPath: path.resolve(__dirname, "../", "mailTemplates"),
      })
    );

    return { ok: true, transport };
  } catch (error) {
    throw { ok: false, error };
  }
}

/**
 *
 * @param {Object} emailOptions The configuration of the email to be sent,
 * @param {(string|string[])} emailOptions.to The recipient(s) of the email,
 * @param {string} emailOptions.subject The subject Line of the message.
 * @param {'verifyRegistration' | 'verifyPasswordReset'} emailOptions.template The email template to use for the email body.
 * @param {Object} emailOptions.context The object for populating the email body. Key names must match variable names.
 * @param {string} [emailOptions.text] The string to use as the text format of the email body
 */
async function sendEmail(emailOptions) {
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
      code: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
}

module.exports = { sendEmail };
