import { postQuestion } from "../../repositories/quizzes";
import imageUrl from "../../utils/generateImageUrl";

interface reqQuestionsArray {
  key: string;
  order: number;
  answerOptions: string[];
  correctAnswer: string;
  question: string;
}

interface formattedArray {
  category: string;
  question: string;
  answer_options: string[];
  correct_answer: string;
  imageurl: string;
  added_by_user: string;
  created_at: string;
}

// Configure array into DB schema (questions table)
const addQuestion = async (questionArray: reqQuestionsArray[]) => {
  const formattedArray = [] as formattedArray[];

  const timestamp = new Date();
  const formattedTimestamp = timestamp.toISOString();

  questionArray.map((item) => {
    const questionObject = {
      category: "Community Made",
      question: item.question,
      answer_options: item.answerOptions,
      correct_answer: item.correctAnswer,
      imageurl: imageUrl(),
      added_by_user: item.key,
      created_at: formattedTimestamp,
    };
    formattedArray.push(questionObject);
  });

  console.log(formattedArray);

  // Data Access Layer
  try {
    await postQuestion(formattedArray);
    console.log("Questions added successfully");
  } catch (error) {
    throw new Error("Failed to add questions to the DB");
  }
};

export const questionService = {
  addQuestion,
};
