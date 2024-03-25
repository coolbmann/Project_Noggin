import React, { useState } from "react";
import "../pages/trivia-page/trivia-page.css";
import { questionArrayList } from "../assets/questions";
import { BsCheck2Circle } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { count } from "console";

interface props {
  answerOptions: string[];
  correctAnswer: string;
  answerRequired: boolean;
  submit: (option: string) => void;
  answerSelected?: string | null;
  // tallyCount: (tally: number) => void;
}

const AnswerOptions = ({
  answerOptions,
  correctAnswer,
  answerRequired,
  submit,
  answerSelected,
}: props) => {
  if (answerOptions.length > 0) {
    return (
      <div className="answer-option-container">
        {answerOptions.map((option, index) => {
          if (!answerRequired) {
            if (option === correctAnswer) {
              return (
                <button
                  className="answer-option-green"
                  key={index}
                  disabled={!answerRequired}
                >
                  <div>{option}</div>
                  <BsCheck2Circle size={20} />
                </button>
              );
            } else if (
              option === answerSelected &&
              answerSelected !== correctAnswer
            ) {
              return (
                <button
                  className="answer-option-red"
                  key={index}
                  disabled={!answerRequired}
                >
                  <div>{option}</div>
                  <RxCross2 size={20} />
                </button>
              );
            } else {
              return (
                <button
                  className="answer-option"
                  key={index}
                  disabled={!answerRequired}
                >
                  {option}
                </button>
              );
            }
          } else {
            return (
              <button
                className="answer-option"
                key={index}
                disabled={!answerRequired}
                onClick={() => submit(option)}
              >
                {option}
              </button>
            );
          }
        })}
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default AnswerOptions;
