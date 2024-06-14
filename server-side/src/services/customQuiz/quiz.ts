import {
  getDefaultQuestion,
  getUserMadeQuestion,
  getUserMadeQuizID,
  postQuiz,
  postQuizQuestion,
} from "../../repositories/quizzes";

interface reqQuiz {
  key: string;
  title: string;
}

interface reqQuestionsArray {
  key: string;
  order: number;
  answerOptions: string[];
  correctAnswer: string;
  question: string;
}

interface questionObject {
  quizId: number | null;
  questionId: number | null;
  order: number | null;
}

// Configure object into DB schema (quiz table)
const addQuiz = async (quizObject: reqQuiz) => {
  const timestamp = new Date();
  const formattedTimestamp = timestamp.toISOString();

  const newQuizObject = {
    collection: "Community Made",
    title: quizObject.title,
    createdAt: formattedTimestamp,
    added_by_user: quizObject.key,
  };

  // Data Access Layer
  try {
    await postQuiz(newQuizObject);
    console.log("Successfully added quiz to DB");
  } catch (error) {
    console.error("Failed to add quiz to DB");
    throw new Error("Failed to add quiz to DB");
  }
};

// Populate array with quizId & questionId data (quizQuestionLink table)
const addQuizQuestions = async (
  quizObject: reqQuiz,
  questionArray: reqQuestionsArray[]
) => {
  // Quiz parameters
  const quizLength = 10;
  const questionsToFill = quizLength - questionArray.length; // Check length of req.questions array

  // Utility Functions
  const generateRandomIndexes = (max: number) => {
    let randomIntegers = [];
    for (let i = 0; i < questionsToFill; i++) {
      let randomInt = Math.floor(Math.random() * max);
      randomIntegers.push(randomInt);
    }
    return randomIntegers;
  };

  // Domain Logic
  const generateAdditionalQuestionIds = async () => {
    const response = await getDefaultQuestion(questionsToFill);
    const responseArray = response.map((item) => item.id);
    const responseLength = responseArray.length;
    console.log(responseLength);

    const randomRecordIndexes = generateRandomIndexes(responseLength);

    const fillerQuestionIds = responseArray.filter((item, index) => {
      if (randomRecordIndexes.includes(index)) {
        return item;
      }
    });

    const randomQuestionObjectArray = [] as questionObject[];
    fillerQuestionIds.forEach((item, index) =>
      randomQuestionObjectArray.push({
        quizId: null,
        questionId: item,
        order: index + quizLength - questionsToFill,
      })
    );

    return randomQuestionObjectArray;
  };

  const getCustomQuestionIds = async () => {
    const keys = questionArray.map((item) => item.key);

    const originalObjectArray = [] as { key: string; order: number }[];
    questionArray.map((item) => {
      originalObjectArray.push({ key: item.key, order: item.order });
    }); // Extract 'Key' and 'Order' into object array

    const response = await getUserMadeQuestion(keys); // Call db to get list of question.id where added_by_user IN (list of keys)

    const customQuestionObjectArray = [] as questionObject[];

    response.forEach((record) => {
      originalObjectArray.forEach((item) => {
        if (record.added_by_user === item.key) {
          customQuestionObjectArray.push({
            quizId: null,
            questionId: record.id,
            order: item.order,
          });
        }
      });
    });

    return customQuestionObjectArray;
  };

  const getQuizId = async () => {
    const keyArray = [quizObject.key];
    const response = await getUserMadeQuizID(keyArray);
    const quizId = response[0].id;
    return quizId;
  };

  try {
    const [additionalQuestions, customQuestions, quizId] = await Promise.all([
      generateAdditionalQuestionIds(),
      getCustomQuestionIds(),
      getQuizId(),
    ]);

    const completedQuestionArray = [
      ...additionalQuestions,
      ...customQuestions,
    ] as questionObject[];

    completedQuestionArray.forEach((item) => (item.quizId = quizId));

    // POST formatted payload to quizQuestionLink table
    await postQuizQuestion(completedQuestionArray);
    console.log("successfully added records to quizQuestionLink table");
  } catch (error) {
    throw error;
  }
};

export const quizService = {
  addQuiz,
  addQuizQuestions,
};
