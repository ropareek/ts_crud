const jwt = require("jsonwebtoken");
import {Request, Response} from 'express';
// const config = process.env;

export interface IGetUserAuthInfoRequest extends Request {
    user: string // or any other type
  }

const verifyToken = (req:IGetUserAuthInfoRequest, res:Response, next: () => any) => {
  const token =
    req.body.token  || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
