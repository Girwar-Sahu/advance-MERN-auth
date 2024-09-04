import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateJwtToken } from "../utils/generateToken.js";
import { sendVarificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";

export const signUp = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error("all fields are required");
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ success: false, message: "user already exist" });
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    const varificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      email,
      password: hashPassword,
      name,
      varificationToken,
      varificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24 hours
    });

    await user.save();
    const token = generateJwtToken(user._id); // generate jwt token

    await sendVarificationEmail(user.email, varificationToken);

    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "user is created",
        use: {
          ...user._doc,
          password: undefined,
        },
      });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const varifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      varificationToken: code,
      varificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "invalid or Expired varification code",
      });
    }
    user.isVarified = true;
    user.varificationToken = undefined;
    user.varificationTokenExpiresAt = undefined;
    await user.save();
    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "user varified successfull",
      use: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("varify email error", error);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "invalid credentials" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "invalid credentials" });
    }

    const token = generateJwtToken(user._id);

    user.lastLogin = new Date();
    await user.save();

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "Signed in successfully",
        use: {
          ...user._doc,
          password: undefined,
        },
      });
  } catch (error) {
    console.log("error in login", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const signOut = async (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ success: true, message: "signedout successfully" });
};
