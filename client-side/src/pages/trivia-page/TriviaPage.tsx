import React, { useEffect, useState, useRef } from "react";
import QuestionImage from "../../components/QuestionImage";
import QuestionCounter from "../../components/QuestionCounter";
import QuestionTitle from "../../components/QuestionTitle";
import "./trivia-page.css";
import NextButton from "../../components/NextButton";
import AnswerOptions from "../../components/AnswerOption";
import ScoreCircularBar from "../../components/ScoreCircularBar";
import { IoArrowBackOutline } from "react-icons/io5";
import axios from "axios";
import {
  Navigate,
  redirect,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Link } from "react-router-dom";
import config from "../../config/config";

interface quizQuestionData {
  id: number;
  question: string;
  answer_options: string[];
  correct_answer: string;
  imageurl: string;
}

interface quizArrayData {
  quizId: number;
  questionId: number;
  order: number;
  questions: quizQuestionData;
}

const TriviaPage = () => {
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [answerRequired, setanswerRequired] = useState<boolean>(true);
  const [answerSelected, setanswerSelected] = useState<string | null>();
  const [correctAnswerTally, setcorrectAnswerTally] = useState<number>(0);
  const [displayResult, setDisplayResult] = useState<boolean>(false);
  const [quizDataArray, setQuizDataArray] = useState<quizArrayData[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const attemptUuidRef = useRef<string>("");

  const navigate = useNavigate();

  const quizid = searchParams.get("quizid");
  console.log("quizid: ", quizid);

  // Load QuizData and set Attempt ID on page load
  useEffect(() => {
    const getQuizData = async () => {
      if (quizid) {
        try {
          const response = await axios.get(
            `${config.api.baseURL}/collections/quiz/${quizid}`,
            { withCredentials: true }
          );
          const responseData = (await response.data) as quizArrayData[];
          const sortedResponseData = responseData.sort((a, b) => {
            return a.order - b.order;
          });
          setQuizDataArray(sortedResponseData);
          console.log(responseData);
        } catch (error) {
          return console.log("No Data 500", error);
        }
      } else {
        console.log("No Data 500");
        return navigate("/homepage");
      }
    };

    const getAttemptUUID = async () => {
      if (!attemptUuidRef.current) {
        try {
          // Generate Attempt UUID from Backend
          const response = await axios.get(
            `${config.api.baseURL}/collections/quiz/attempt/uuid`
          );
          const responseData = await response.data;
          attemptUuidRef.current = responseData;
          console.log("attemptUUID: " + attemptUuidRef.current);
        } catch (error) {
          console.error(error);
        }
      }
    };

    getQuizData();
    getAttemptUUID();

    return () => {
      setQuizDataArray([]);
      attemptUuidRef.current = "";
    };
  }, []);

  const handleNextQuestion = () => {
    if (questionNumber === quizDataArray.length - 1) {
      setDisplayResult(true);
    } else {
      setQuestionNumber((question) => question + 1);
    }
    setanswerSelected(null);
    setanswerRequired(true);
  };

  const restartQuiz = () => {
    setDisplayResult(false);
    setQuestionNumber(0);
    setcorrectAnswerTally(0);
    setanswerSelected(null);
    setanswerRequired(true);
  };

  const submitAnswer = (option: string) => {
    //Update Answer states
    setanswerRequired(false);
    setanswerSelected(option);

    if (quizDataArray.length > 0) {
      const correctAnswer =
        quizDataArray[questionNumber].questions.correct_answer;

      // Check if answer is correct and update tally if true
      if (option === correctAnswer) {
        setcorrectAnswerTally((tally) => tally + 1);
        console.log("check");
      }
    }

    // POST attempt and quiz-question answer
    const handleClick = async () => {
      try {
        await axios.post(
          `${config.api.baseURL}/collections/quiz/attempt`,
          {
            attemptUuid: attemptUuidRef.current,
            quizId: quizid,
          },
          {
            withCredentials: true,
          }
        );

        await axios.post(
          `${config.api.baseURL}/collections/quiz/question-response`,
          {
            questionId: quizDataArray[questionNumber].questionId,
            answerSelected: option,
            attemptUuid: attemptUuidRef.current,
          },
          { withCredentials: true }
        );
      } catch (error) {
        console.error(error);
        throw Error;
      }
    };

    handleClick();
  };

  // Console Log
  console.log(answerSelected);
  console.log(answerRequired);
  console.log(correctAnswerTally);
  // console.log(`quiz array length: `, quizDataArray.length);
  console.log(questionNumber);

  if (quizDataArray.length > 0) {
    return (
      <div className="trivia-page">
        <Link to="/homepage">
          <button className="backButton">
            <IoArrowBackOutline />
          </button>
        </Link>
        {displayResult ? (
          <div className="final-result-container">
            <div className="inner-container">
              <ScoreCircularBar
                score={correctAnswerTally}
                quizLength={quizDataArray.length}
              />
              <div className="inner-container-secondary">
                <p className="final-result-caption">
                  {correctAnswerTally / quizDataArray.length < 0.5
                    ? "Not your best day, better luck next time!"
                    : correctAnswerTally / quizDataArray.length < 0.75
                    ? "Close, but no cupcake!"
                    : correctAnswerTally / quizDataArray.length < 1
                    ? "Almost there, almost a genius!"
                    : "All bow to the trivia master!"}
                </p>
                <NextButton submit={restartQuiz} resultScreen={displayResult} />
              </div>
            </div>
          </div>
        ) : (
          <div className="trivia-container">
            <QuestionImage
              imageURL={quizDataArray[questionNumber].questions.imageurl}
            />
            <QuestionCounter
              currentQuestion={questionNumber + 1}
              quizLength={quizDataArray.length}
            />
            <QuestionTitle
              quizQuestion={quizDataArray[questionNumber].questions.question}
            />
            '
            <AnswerOptions
              answerOptions={
                quizDataArray[questionNumber].questions.answer_options
              }
              correctAnswer={
                quizDataArray[questionNumber].questions.correct_answer
              }
              answerRequired={answerRequired}
              submit={submitAnswer}
              answerSelected={answerSelected}
            />
            <NextButton
              submit={handleNextQuestion}
              answerRequired={answerRequired}
              questionNumber={questionNumber + 1}
              resultScreen={displayResult}
            />
          </div>
        )}
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
};
//asdf
export default TriviaPage;
