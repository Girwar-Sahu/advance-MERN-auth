import User from "../models/user.model";
import bcryptjs from "bcryptjs";

export const signUp = async (req, res) => {
  res.json("signup route");
};

export const signIn = async (req, res) => {
  res.json("signin route");
};

export const signOut = async (req, res) => {
  res.json("signout route");
};
