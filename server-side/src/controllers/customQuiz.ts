import { Request, Response, NextFunction, response } from "express";
import imageUrl from "../utils/generateImageUrl";
import { postQuestion, postQuiz } from "../repositories/quizzes";
import { questionService } from "../services/customQuiz/question";
import { quizService } from "../services/customQuiz/quiz";

const customQuiz = async (req: Request, res: Response, next: NextFunction) => {
  // Create separation of concerns with DTOs
  const quizDTO = { ...req.body.quiz };
  const questionDTO = [...req.body.questions];

  // Store array of key values in request body to use in GET quizID and questionID
  const customQuizKey = quizDTO.key;
  const customQuestionKeys = questionDTO.map((item) => item.key);

  console.log(customQuestionKeys);

  // Service layer
  try {
    await Promise.all([
      questionService.addQuestion(questionDTO), // Process submitted question objects
      quizService.addQuiz(quizDTO), // Process submitted quiz.title object
    ]);

    // Only call this service once custom quiz and questions are in the database
    await quizService.addQuizQuestions(quizDTO, questionDTO);

    res.status(200).send("Custom quiz successfully added"); // Send API response
  } catch (error) {
    console.error("customQuiz controller failed to execute");
    next(error);
  }
};

export default customQuiz;
