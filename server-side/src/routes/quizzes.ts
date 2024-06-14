import { Router, Request, Response, response, request } from "express";
import { validateUsername } from "../middleware/validateUsername";
import { logSession } from "../middleware/logSession";
import { validateAttempt } from "../middleware/validateAttempt";
import { createUUID } from "../services/createUUID";
import {
  validateAttemptBody,
  validateQuizResponseBody,
  handleValidationErrors,
  validateCustomQuizBody,
  validateCustomQuizSchema,
} from "../utils/validators/quizValidators";
import { validationResult } from "express-validator";
import { insertQuizResponse } from "../controllers/quizResponse";
import {
  getTotalQuizResponses,
  insertQuizQuestionResponse,
} from "../repositories/quizzes";
import imageUrl from "../utils/generateImageUrl";
import { controller } from "../controllers";

const router = Router();

router.post(
  "/api/collections/quiz/attempt",
  validateUsername,
  logSession,
  validateAttemptBody,
  handleValidationErrors,
  validateAttempt,
  (request: Request, response: Response) => {
    response.status(200).send("Success");
  }
);

router.get("/api/collections/quiz/attempt/uuid", (request, response) => {
  const attemptUUID = createUUID();
  response.send(attemptUUID);
});

// POST question responses to DB
router.post(
  "/api/collections/quiz/question-response",
  validateQuizResponseBody,
  handleValidationErrors,
  insertQuizResponse,
  () => {
    response.send("Success");
  }
);

// GET total points earned collectively
router.get("/api/total-points", async (req: Request, res: Response) => {
  try {
    const response = await getTotalQuizResponses();
    res.send(response[0]);
  } catch (error) {
    res.status(500).send("error at total-points API");
  }
});

router.post(
  "/api/collections/create-quiz",
  validateCustomQuizSchema,
  validateCustomQuizBody,
  handleValidationErrors,
  controller.customQuiz
);

export default router;
