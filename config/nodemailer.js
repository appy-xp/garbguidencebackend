var nodemailer = require("nodemailer");
var sender = nodemailer.createTransport({
  host: "",
  port: 465,
  secure: true,
  auth: {
    user: "",
    pass: "",
  },
});
module.exports = sender;
