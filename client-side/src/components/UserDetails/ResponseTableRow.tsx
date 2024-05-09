import React from "react";
import styles from "./userDetails.module.css";

interface props {
  rank: number;
  question: string;
  response: string;
  correctAnswer: string;
}

const ResponseTableRow = ({
  rank,
  question,
  response,
  correctAnswer,
}: props) => {
  return (
    <tr>
      <td>{rank}</td>
      <td>{question}</td>
      <td>{response}</td>
      <td>
        <div
          className={
            response === correctAnswer
              ? styles.correctAnswerTrue
              : styles.correctAnswerFalse
          }
        >
          {correctAnswer}
        </div>
      </td>
    </tr>
  );
};

export default ResponseTableRow;
