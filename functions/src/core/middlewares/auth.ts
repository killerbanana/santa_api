import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");
class Auth {
  static async handle(req: Request, res: Response, next: NextFunction) {
    const token = req.header("authToken");
    if (!token)
      return res.status(403).send({
        message: "403 Forbidden",
        status: 403,
      });

    try {
      await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      next();
    } catch (err) {
      res.status(403).send({
        message: "403 Forbidden",
        status: 403,
      });
    }

    return;
  }
}

export default Auth;
