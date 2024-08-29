import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateJwtToken } from "../utils/generateToken.js";
import { sendVarificationEmail } from "../mailtrap/emails.js";

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
    const token = generateJwtToken(res, user._id); // generate jwt token

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

export const signIn = async (req, res) => {
  res.json("signin route");
};

export const signOut = async (req, res) => {
  res.json("signout route");
};
