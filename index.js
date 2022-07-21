const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
require("colors");

const PORT = process.env.PORT;
const dbConnection = require("./config/database.config");
const { sendEmail } = require("./utils/mailer");
const { httpStatus } = require("./constants/http.constants");
dbConnection();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/send-email", async (req, res) => {
  try {
    const mail = await sendEmail({
      to: ["alchemist6174@protonmail.com", "pal.amittras@gmail.com"],
      subject: "Sending a mail, testing if it is still working.",
      template: "verifyRegistration",
      context: {
        name: "Amittras Pal",
        code: "123456",
      },
    });
    return res.json({
      message: "Email sent successfully.",
      response: mail,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong",
      error,
    });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server Started on PORT: ${PORT}`.black.bgCyan);
});
