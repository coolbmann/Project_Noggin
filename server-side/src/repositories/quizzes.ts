import { NextFunction, response } from "express";
import supabase from "../config/supabaseClient";

const postAttempt = async (
  attemptId: string,
  userId: string,
  quizId: number
) => {
  const timestamp = new Date();
  const formattedTimestamp = timestamp.toISOString();

  try {
    const { error } = await supabase.from("attempts").upsert(
      {
        id: attemptId,
        userId: userId,
        quizId: quizId,
        createdAt: formattedTimestamp,
      },
      { ignoreDuplicates: true }
    );

    if (error) {
      throw new Error(error.message);
    }
  } catch (error: any) {
    throw new Error("error happens at postAttempt: " + error);
  }
};

const getCorrectAnswer = async (questionId: number) => {
  try {
    const { data, error } = await supabase
      .from("questions")
      .select("correct_answer")
      .eq("id", questionId);
    console.log(data);
    return data;

    if (error) {
      throw new Error(error?.message);
    }
  } catch (error) {
    throw new Error("getCorrectAnswer error");
  }
};

const insertQuizQuestionResponse = async (
  id: string,
  userId: string,
  questionId: number,
  answerSelected: string,
  correct: number,
  attemptId: string
) => {
  try {
    const { error } = await supabase.from("quizResponses").insert({
      id: id,
      userId: userId,
      questionId: questionId,
      answer_selected: answerSelected,
      correct: correct,
      attemptId: attemptId,
    });

    if (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  } catch (error) {
    console.log("error at: insertQuizQuestionResponse");
    throw new Error();
  }
};

const getAttemptDetails = async () => {
  try {
    const { data, error } = await supabase.from("attemptDetails").select();
    if (error) {
      console.log(error);
      throw new Error("getAttemptDetailsError");
    }
    return data;
  } catch (error) {}
};

const postQuestion = async (questionArray: Object[]) => {
  try {
    const { error } = await supabase.from("questions").insert(questionArray);
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.log(error);
    throw new Error("error happens at postQuestion: " + error);
  }
};

// POST a single quiz record
const postQuiz = async (quizObject: Object) => {
  try {
    const { error } = await supabase.from("quizzes").insert(quizObject);

    if (error) {
      console.error(error);
      throw new Error("Error at postQuiz");
    }
  } catch (error) {
    throw new Error("Error at postQuiz");
  }
};

// GET all default questions
const getDefaultQuestion = async (returnLimit: number) => {
  try {
    const { data, error } = await supabase
      .from("questions")
      .select("id")
      .is("added_by_user", null);

    if (error) {
      console.error(error);
      throw new Error("Error at getQuestion");
    }

    return data;
  } catch (error) {
    throw new Error("Error at getQuestion");
  }
};

// GET question by :added_by_user
const getUserMadeQuestion = async (keyArray: String[]) => {
  try {
    const { data, error } = await supabase
      .from("questions")
      .select("added_by_user, id")
      .in("added_by_user", keyArray);

    if (error) {
      console.error(error);
      throw new Error("Error at getUserMadeQuestion");
    }

    return data;
  } catch (error) {
    throw new Error("Error at getUserMadeQuestion");
  }
};

// GET quiz ID by :added_by_user
const getUserMadeQuizID = async (keyArray: String[]) => {
  try {
    const { data, error } = await supabase
      .from("quizzes")
      .select("added_by_user, id")
      .in("added_by_user", keyArray);

    if (error) {
      console.error(error);
      throw new Error("Error at getUserMadeQuizID");
    }

    return data;
  } catch (error) {
    throw new Error("Error at getUserMadeQuizID");
  }
};

// POST to quizQuestionLink table
const postQuizQuestion = async (quizQuestionArray: Object[]) => {
  try {
    const { data, error } = await supabase
      .from("quizQuestionLink")
      .insert(quizQuestionArray);

    if (error) {
      console.error(error);
      throw new Error("Error at postQuizQuestion");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// GET total quiz points earned
const getTotalQuizResponses = async () => {
  const rpcExpression = `SELECT SUM("quizResponses".correct) FROM "quizResponses"`;

  try {
    const { data, error } = await supabase.from("totalPoints").select();
    if (error) {
      console.error(error);
      throw new Error("Error at postQuizQuestion");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export {
  postAttempt,
  getCorrectAnswer,
  insertQuizQuestionResponse,
  getAttemptDetails,
  postQuestion,
  postQuiz,
  getDefaultQuestion,
  getUserMadeQuestion,
  getUserMadeQuizID,
  postQuizQuestion,
  getTotalQuizResponses,
};
