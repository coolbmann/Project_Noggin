import React from "react";
import "../assets/questions";
import { questionArrayList } from "../assets/questions";
import "../pages/trivia-page/trivia-page.css";
import { useParams } from "react-router-dom";

interface props {
  quizQuestion: string;
}

const QuestionTitle = ({ quizQuestion }: props) => {
  return (
    <div className="question-title">
      <h1>{quizQuestion}</h1>
    </div>
  );
};

export default QuestionTitle;
