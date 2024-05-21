import React from "react";
import userDetailsStyles from "./userDetails.module.css";
import Accordion from "./Accordion";
import ResponseTableRow from "./ResponseTableRow";
import { format, parseISO } from "date-fns";

interface props {
  title: string;
  score: number;
  attemptPoints: number;
  createdAt: string;
  attemptResponseData: attemptResponseData[];
}

interface attemptResponseData {
  question: string;
  answer_selected: string;
  correct_answer: string;
}

const AttemptTile = ({
  title,
  score,
  attemptPoints,
  createdAt,
  attemptResponseData,
}: props) => {
  const formattedDateTime = format(parseISO(createdAt), "d MMM yyyy, K:mmb");

  return (
    <div className={userDetailsStyles.tileContainer}>
      <div className={userDetailsStyles.tileInfoContainer}>
        <div className={userDetailsStyles.titlesLayout}>
          <div style={{ textAlign: "left", paddingLeft: "1.5rem" }}>
            <strong>{title}</strong>
          </div>
          <div>{formattedDateTime}</div>
          <div>{score}%</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              paddingRight: "1.5rem",
              verticalAlign: "center",
            }}
          >
            {attemptPoints}
            <span
              style={{
                fontSize: "0.75rem",
                lineHeight: "1",
              }}
            >
              ⭐
            </span>
          </div>
        </div>
      </div>
      <Accordion headerContent="See attempt details">
        <div style={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
          <table className={userDetailsStyles.responseTable}>
            <thead>
              <tr>
                <td></td>
                <td>Question</td>
                <td>Response</td>
                <td>Correct Answer</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan={4}
                  style={{ backgroundColor: "#6C668533", height: "1px" }}
                ></td>
              </tr>
              {attemptResponseData.map((question, index) => {
                return (
                  <ResponseTableRow
                    key={index}
                    rank={index + 1}
                    question={question.question}
                    response={question.answer_selected}
                    correctAnswer={question.correct_answer}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </Accordion>
    </div>
  );
};

export default AttemptTile;
