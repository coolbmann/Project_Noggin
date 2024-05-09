import { Router, Request, Response, response } from "express";
import { validateUsername } from "../middleware/validateUsername";
import { logSession } from "../middleware/logSession";
import { validateAttempt } from "../middleware/validateAttempt";
import { createUUID } from "../services/createUUID";
import {
  validateAttemptBody,
  validateQuizResponseBody,
  validateRequestErrors,
} from "../utils/validators/quizValidators";
import { validationResult } from "express-validator";
import { insertQuizResponse } from "../controllers/quizResponse";
import { insertQuizQuestionResponse } from "../repositories/quizzes";

const router = Router();

router.post(
  "/api/collections/quiz/attempt",
  validateUsername,
  logSession,
  validateAttemptBody,
  validateRequestErrors,
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
  validateRequestErrors,
  insertQuizResponse,
  () => {
    response.send("Success");
  }
);

export default router;
