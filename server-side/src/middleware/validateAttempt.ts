import { NextFunction, Request, Response } from "express";
import { Session } from "express-session";
import { postAttempt } from "../repositories/quizzes";
import { validationResult } from "express-validator";

interface mySessionData extends Session {
  attemptId: string;
}

const validateAttempt = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const sessionData = request.session as mySessionData;
  const attemptUUID = request.body.attemptUuid;
  const quizId = request.body.quizId;

  const formattedQuizId = parseInt(quizId);

  console.log("reaches validate attempt");

  // Store the attempt in the database
  try {
    await postAttempt(attemptUUID, sessionData.id, formattedQuizId);
    next();
  } catch (error) {
    console.error(error);
    return response.send("error");
  }

  // Need better way to handle errors instead of always calling next
};

export { validateAttempt };
