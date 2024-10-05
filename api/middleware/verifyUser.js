import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "unautorized - no token provided" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res
        .status(401)
        .json({ success: false, message: "unauthorized - invalid token" });
    }
    // console.log("decode", decode);
    req.user = decode.userId;
    next();
  } catch (error) {
    // console.log("error on verify user", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
