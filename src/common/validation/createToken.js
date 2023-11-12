const jwt = require("jsonwebtoken");

const createToken = async (user) => {
  try {
    const secret =
      process.env.JWT_SECRET || "jwtsecretforstoringalltheuserinfo";

    const payload = {
      user_id: user?._id,
      email: user?.email,
      first_name: user?.first_name,
      last_name: user?.last_name,
    };

    const token = jwt.sign(payload, secret);
    return token;
  } catch (err) {}
};

const verifyToken = (token) => {
  try {
    const secret =
      process.env.JWT_SECRET || "jwtsecretforstoringalltheuserinfo";

    const payload = jwt.verify(token, secret);

    return payload;
  } catch (err) {}
};

module.exports = { createToken, verifyToken };
