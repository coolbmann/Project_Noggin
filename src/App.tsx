import React, { useState } from 'react';
import logo from './logo.svg';
import QuestionImage from './components/QuestionImage';
import { questionImageArray } from './assets/images'
import QuestionCounter from './components/QuestionCounter';
import QuestionTitle from './components/QuestionTitle';
import './App.css';
import NextButton from './components/NextButton';
import AnswerOptions from './components/AnswerOption';
import { questionArrayList } from './assets/questions'
import ScoreCircularBar from './components/ScoreCircularBar';


function App() {

  // Track state of question number
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  // Track state of whether or not answer is selected
  const [answerRequired, setanswerRequired] = useState<boolean>(true);
  // Track currently chosen answer
  const [answerSelected, setanswerSelected] = useState<string | null>();
  // Track correct answers tally
  const [correctAnswerTally, setcorrectAnswerTally] = useState<number>(0);
  // Display quiz result
  const [displayResult, setDisplayResult] = useState<boolean>(false);

  const correctAnswer = questionArrayList[questionNumber].correct_answer;

  const handleNextQuestion = () => {
    // Update counter to set next question number and reset option button states, ATM limited by image array length
    if (questionNumber === questionArrayList.length - 1) {
      setDisplayResult(true);
    }
    else {
      setQuestionNumber(question => (question + 1));
    }
    // % questionImageArray.length

    setanswerSelected(null);
    setanswerRequired(true);
  }

  const restartQuiz = () => {
    setDisplayResult(false);
    setQuestionNumber(0);
    setcorrectAnswerTally(0);
    setanswerSelected(null);
    setanswerRequired(true);
  }

  const submitAnswer = (option: string) => {
    //Update Answer states
    setanswerRequired(false);
    setanswerSelected(option);

    // Check if answer is correct and update tally if true
    if (option === correctAnswer) {
      setcorrectAnswerTally(tally => tally + 1)
      console.log("check");
    }

  }

  // Console Log
  console.log(answerSelected);
  console.log(answerRequired);
  console.log(correctAnswerTally);
  console.log(questionArrayList.length)
  console.log(questionNumber)

  return (
    <div className="App">
      {
        displayResult ? (
          // <div className='trivia-container'>
          //   <QuestionImage currentQuestion={questionNumber} />
          //   <QuestionCounter currentQuestion={questionNumber + 1} />
          //   <QuestionTitle currentQuestion={questionNumber} />
          //   <AnswerOptions currentQuestion={questionNumber} answerRequired={answerRequired} submit={submitAnswer} answerSelected={answerSelected} />
          //   <NextButton submit={handleNextQuestion} answerRequired={answerRequired} questionNumber={questionNumber + 1} />
          // </div>

          <div className='final-result-container'>
            <div className='inner-container'>
              <ScoreCircularBar score={correctAnswerTally} />
              <div className='inner-container-secondary'>
                <p className='final-result-caption'>
                  {
                    correctAnswerTally / questionArrayList.length < 0.5 ?
                      "Not your best day, better luck next time!"
                      :
                      correctAnswerTally / questionArrayList.length < 0.75 ?
                        "Close, but no cupcake"
                        :
                        correctAnswerTally / questionArrayList.length < 1 ?
                          "Almost there, almost a genius!"
                          :
                          "All bow to the trivia master!"
                  }
                </p>
                <NextButton submit={restartQuiz} resultScreen={displayResult} />

              </div>
            </div>
          </div>
        )
          :
          (
            // <div className='final-result-container'>
            //   <div className='inner-container'>
            //     <ScoreCircularBar score={correctAnswerTally / questionArrayList.length * 100} />


            //   </div>
            // </div>

            <div className='trivia-container'>
              <QuestionImage currentQuestion={questionNumber} />
              <QuestionCounter currentQuestion={questionNumber + 1} />
              <QuestionTitle currentQuestion={questionNumber} />
              <AnswerOptions currentQuestion={questionNumber} answerRequired={answerRequired} submit={submitAnswer} answerSelected={answerSelected} />
              <NextButton submit={handleNextQuestion} answerRequired={answerRequired} questionNumber={questionNumber + 1} resultScreen={displayResult} />
            </div>

          )
      }




    </div>
  );
}

export default App;
