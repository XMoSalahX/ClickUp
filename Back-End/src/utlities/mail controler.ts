import nodemailer from "nodemailer";
import setMsg from "../template/verify email";
import { config } from "../config";

// Email verification
const mailHaneler = async (
  subject: string,
  email: string,
  id: number | string,
  href?: string,
  contnet?: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.mailer.email,
        pass: config.mailer.password,
      },
    });

    // send mail with defined transport object
    await transporter.sendMail({
      from: config.mailer.email, // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      html: setMsg(id, href, contnet), // html body
    });

    return true;
  } catch {
    console.log("Mailer bad object.");
    return false;
  }
};

export default mailHaneler;
