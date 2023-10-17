// import jwt from "jsonwebtoken";
// import asyncHandler from "express-async-handler";
// import User from "../models/userModel.js";

// const protect = asyncHandler(async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded.userId).select("-password");
//       next();
//     } catch (error) {
//       res.status(401);
//       throw new Error("Not authorized, invalid token");
//     }
//   }

//   if (!token) {
//     res.status(401);
//     throw new Error("Not authorized, no token");
//   }
// });

// const checkUserRole = (roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       res.status(403);
//       throw new Error("Not authorized to access this resource");
//     }
//     next();
//   };
// };

// export { protect, checkUserRole };

import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized,invalid token");
    }
  } else {
    res.status(401);
    throw new Error("not authorized,no token");
  }
});
const checkUserRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error("Not authorized to access this resource");
    }
    next();
  };
};
export { protect, checkUserRole };
