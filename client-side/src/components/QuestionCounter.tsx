import React from "react";
import "../pages/trivia-page/trivia-page.css";
import { questionArrayList } from "../assets/questions";

interface props {
  currentQuestion: number;
  quizLength: number;
}

const QuestionCounter = ({
  currentQuestion,
  quizLength,
}: props): React.JSX.Element => {
  return (
    <div className="question-count">
      <p>
        <i>
          Question {currentQuestion}/{quizLength}
        </i>
      </p>
    </div>
  );
};

export default QuestionCounter;
