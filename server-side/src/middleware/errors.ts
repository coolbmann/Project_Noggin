import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.status(500).send({ errors: [{ message: error }] });
};

export { errorHandler };
