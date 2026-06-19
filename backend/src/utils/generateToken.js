const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const accessToken= jwt.sign(
    {
      id: user.id,
      role: user.role,
      fullName: user.fullName
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );

  const refreshToken= jwt.sign(
    {
      id: user.id,
      fullName: user.fullName,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d'
    }
  );

  return {accessToken, refreshToken}

};

module.exports = generateToken;