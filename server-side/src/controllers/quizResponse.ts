import {
  getCorrectAnswer,
  insertQuizQuestionResponse,
} from "../repositories/quizzes";
import { createUUID } from "../services/createUUID";
import { Request, Response, NextFunction } from "express";

const insertQuizResponse = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // Function to generate UUID
  const id = createUUID();
  const userId = request.session.id;
  let answerIsCorrect = 0;

  // Callback to validate correct answer
  try {
    const responseArray = await getCorrectAnswer(request.body.questionId);

    if (responseArray !== null) {
      const correctAnswer = responseArray[0].correct_answer;
      if (correctAnswer === request.body.answerSelected) {
        answerIsCorrect = 1;
      }
    } else {
      throw new Error();
    }

    // Then callback to POST body to DB
    await insertQuizQuestionResponse(
      id,
      userId,
      request.body.questionId,
      request.body.answerSelected,
      answerIsCorrect,
      request.body.attemptUuid
    );

    response.send("success");
  } catch (error) {
    return response.status(400).send("Error at: insertQuizResponse");
  }
};

export { insertQuizResponse };
