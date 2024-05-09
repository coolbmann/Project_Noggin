import { Request, Response, NextFunction } from "express";
import { Session } from "express-session";
import { createUser } from "../repositories/users";

interface mySessionData extends Session {
  username: string;
}

const logSession = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const sessionId = request.session.id;
  const sessionData = request.session as mySessionData;

  console.log(sessionId);

  // We throw an error here that we can ignore if user already exists
  createUser(sessionId, sessionData.username);

  next();
};

export { logSession };
