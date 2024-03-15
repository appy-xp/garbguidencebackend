import nodemailer from "nodemailer";
let sender = nodemailer.createTransport({
  host: "",
  port: 465,
  secure: true,
  auth: {
    user: "",
    pass: "",
  },
});
export default sender;
