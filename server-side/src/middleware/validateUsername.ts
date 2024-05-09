import { Request, Response, NextFunction } from "express";
import createUsername from "../services/createUsername";
import session, { Session } from "express-session";
import { createUser, getUser } from "../repositories/users";

interface mySessionData extends Session {
  username: string;
}

const validateUsername = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const sessionId = request.session.id;
  const sessionData = request.session as mySessionData;

  console.log("session id is: " + sessionId);

  if (sessionId) {
    if (!sessionData.username) {
      await createUsername(request);
      console.log("we create a username");
      next();
    } else {
      next();
    }
  } else {
    return response.status(500).send("No Session");
  }
};

export { validateUsername };
