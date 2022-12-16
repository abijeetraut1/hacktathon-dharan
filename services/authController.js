const { promisify } = require("util");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

exports.protectMiddleware = async (req, res, next) => {
  //if there is token in req
  const authorizationHeader = req.headers.authorization;
  let token;
  if (authorizationHeader && authorizationHeader.startsWith("Bearer")) {
    // console.log(authorizationHeader);
    token = authorizationHeader.split(" ")[1];
    // console.log(token);
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.send("You must be logged in!");
  }
  //verify token

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(decoded._id);

  const currentUser = await User.findById(decoded.id);
  // console.log(currentUser);
  if (!currentUser) {
    return res.json({
      status: 400,
      messsage: "THe user belonging to this token doesnt exist",
    });
  }
  //check if the used changed the password after the token was issued

  //grant acces to protected route
  req.user = currentUser;
  next();
};
