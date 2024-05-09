import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction, request } from "express";

const validateAttemptBody = [
  // AttemptID must be a valid UUID
  body("attemptUuid")
    .isString()
    .withMessage("Attempt UUID is not a string")
    .isLength({ min: 36, max: 36 })
    .withMessage("Attempt UUID is not a valid UUID"),
  body("quizId").isNumeric().withMessage("quizId is not numeric"),
];

const validateQuizResponseBody = [
  body("questionId").isNumeric().withMessage("Question ID is not an integer"),
  body("answerSelected").notEmpty(),
  body("attemptUuid")
    .isString()
    .withMessage("Attempt UUID is not a string")
    .isLength({ min: 36, max: 36 })
    .withMessage("Attempt UUID is not a valid UUID"),
];

const validateRequestErrors = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    response.status(422).json({ errors: errors.array() });
  } else {
    next();
  }
};

export { validateAttemptBody, validateQuizResponseBody, validateRequestErrors };
