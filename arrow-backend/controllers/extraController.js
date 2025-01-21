import path from "path";
import { sendEmail } from "../helpers/sendMail.js";
import ejs from "ejs";

const __dirname = path.resolve();

export const sendContactEmail = async (req, res) => {
  try {
    const formData = req.body;

    const html = await ejs.renderFile(
      path.join(__dirname, "/emails/contact-form.ejs"),
      { formData }
    );
    const data = {
      to: process.env.SMTP_MAIL,
      html,
      subject: "New Enquiry Received",
    };
    await sendEmail(data);
    res
      .status(200)
      .json({ success: true, message: "Contact form submitted successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, message: "Failed To Submit Form" });
  }
};
