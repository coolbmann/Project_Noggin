import React from "react";
import "../assets/questions";
import { questionArrayList } from "../assets/questions";
import "../pages/trivia-page/trivia-page.css";
import axios from "axios";
import { useParams } from "react-router-dom";

interface props {
  quizQuestion: string;
}

const QuestionTitle = ({ quizQuestion }: props) => {
  console.log(quizQuestion);

  // Destructure quizId from URL params
  const { quizId } = useParams();

  return (
    <div className="question-title">
      <h1>{quizQuestion}</h1>
    </div>
  );
};

export default QuestionTitle;
