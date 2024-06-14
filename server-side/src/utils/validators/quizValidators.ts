import { checkSchema, body, validationResult } from "express-validator";
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

const handleValidationErrors = (
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

const validateCustomQuizSchema = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const questionSchemaKeys = [
    "key",
    "order",
    "answerOptions",
    "correctAnswer",
    "question",
  ]; // List of keys allowed for req.body.question

  const titleSchemaKeys = ["key", "title"]; // List of keys allowed for req.body.quiz

  const reqQuestionArray = request.body.questions;
  const reqTitleArray = request.body.quiz;

  // Iterate for each element in array
  const invalidArrayObjects = () => {
    reqQuestionArray.filter((item: Object) => {
      const keys = Object.keys(item);
      // Filter for keys not parts of defined schema keys
      const invalidKeys = keys.filter(
        (key) => !questionSchemaKeys.includes(key)
      );
      if (invalidKeys.length > 0) {
        console.log(invalidKeys);
        return response
          .status(400)
          .json({ errors: "Array contains objects with invalid keys" });
      }
    });

    const keys = Object.keys(reqTitleArray);
    const invalidKeys = keys.filter((item) => !titleSchemaKeys.includes(item));
    if (invalidKeys.length > 0) {
      console.log(invalidKeys);
      return response
        .status(400)
        .json({ errors: "Object contains objects with invalid keys" });
    }
  };

  invalidArrayObjects();
  next();
};

const validateCustomQuizBody = [
  body("quiz").isObject(),
  body("quiz.key").isString().notEmpty(),
  body("quiz.title").isString().notEmpty(),
  body("questions")
    .isArray({ max: 10 })
    .withMessage("body must be an array with 10 questions or less"),
  body("questions.*.key").isString().notEmpty(),
  body("questions.*.order")
    .isInt({ min: 0, lt: 10 })
    .withMessage("order is more than 10"),
  body("questions.*.question")
    .notEmpty()
    .withMessage("question must not be empty")
    .isString()
    .withMessage("question must be a string"),
  body("questions.*.correctAnswer")
    .notEmpty()
    .withMessage("correctAnswer must not be empty")
    .isString()
    .withMessage("correctAnswer must be a string")
    .custom((value, { req, path }) => {
      // Extract index from the path
      const index = path.split("[")[1].split("]")[0];
      const answerOptions = req.body.questions[index].answerOptions;

      // Validate that answerOptions is an array
      if (!Array.isArray(answerOptions)) {
        throw new Error("answerOptions must be an array");
      }

      // Validate that correctAnswer is one of the options
      if (!answerOptions.includes(value)) {
        throw new Error("correctAnswer must be part of answerOptions");
      }

      return true;
    }),
  body("questions.*.answerOptions")
    .notEmpty()
    .withMessage("answerOptions must not be empty")
    .isArray()
    .withMessage("answerOptions must be an array")
    .custom((value: string[]) => {
      if (value.length > 4) {
        throw new Error("answerOption length must be less than 4");
      }
      return true;
    }),
];

export {
  validateAttemptBody,
  validateQuizResponseBody,
  handleValidationErrors,
  validateCustomQuizSchema,
  validateCustomQuizBody,
};
