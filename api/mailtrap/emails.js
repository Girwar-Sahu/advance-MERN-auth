import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTamplates.js";
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

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      template_uuid: process.env.MAILTRAP_TAMPLATE_ID,
      template_variables: {
        name: name,
      },
    });

    console.log("welcome email send successfully", response);
  } catch (error) {
    console.error(`error sending welcome`, error);
    throw new Error(`error sending welcome email: ${error.message}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password reset",
    });
    console.log("reset url email sent successfully", response);
  } catch (error) {
    console.error(`error sending reset url link`, error);
    throw new Error(`Error sending password reset email:${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Password reset successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password reset",
    });
    console.log(`reset password success send successful`, response);
  } catch (error) {
    console.error(`error sending reset password success`, error);
    throw new Error(`Error sending password reset email:${error}`);
  }
};
