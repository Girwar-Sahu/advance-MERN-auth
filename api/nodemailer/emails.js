import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTamplates.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_KEY,
  },
});

export const sendVarificationEmail = async (email, varificationToken) => {
  try {
    const response = await transporter.sendMail({
      from: `MERN Auth <${process.env.GMAIL_ID}>`,
      to: email,
      subject: "Varify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        varificationToken
      ),
      category: "Email Varification",
    });
    // console.log("email send successfully", response.messageId);
  } catch (error) {
    console.error(`error sending varification`, error);
    throw new Error(`error sending varification email: ${error.message}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const response = await transporter.sendMail({
      from: `MERN Auth <${process.env.GMAIL_ID}>`,
      to: email,
      subject: "Welcome to our MERN Auth App",
      html: WELCOME_EMAIL_TEMPLATE.replace("{clientName}", name),
      category: "Welcome Email",
    });
    // console.log("welcome email send successfully", response.messageId);
  } catch (error) {
    console.error(`error sending welcome`, error);
    throw new Error(`error sending welcome email: ${error.message}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const response = await transporter.sendMail({
      from: `MERN Auth <${process.env.GMAIL_ID}>`,
      to: email,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password reset",
    });
    // console.log("reset url email sent successfully", response.messageId);
  } catch (error) {
    console.error(`error sending reset url link`, error);
    throw new Error(`Error sending password reset email:${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const response = await transporter.sendMail({
      from: `MERN Auth <${process.env.GMAIL_ID}>`,
      to: email,
      subject: "Password reset successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password reset",
    });
    // console.log(`reset password success send successful`, response.messageId);
  } catch (error) {
    console.error(`error sending reset password success`, error);
    throw new Error(`Error sending password reset email:${error}`);
  }
};
