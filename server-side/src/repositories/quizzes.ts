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
    const { error } = await supabase
      .from("attempts")
      .upsert(
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

export {
  postAttempt,
  getCorrectAnswer,
  insertQuizQuestionResponse,
  getAttemptDetails,
};
