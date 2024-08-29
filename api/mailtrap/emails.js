import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTamplates.js";
import { client, sender } from "./mailtrap.config.js";

export const sendVarificationEmail = async (email, varificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Varify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        varificationToken
      ),
      category: "Email Varification",
    });
    console.log("email send successfully", response);
  } catch (error) {
    console.error(`error sending varification`, error);
    throw new Error(`error sending varification email: ${error.message}`);
  }
};
