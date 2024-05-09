import React from 'react'
import { questionArrayList } from '../assets/questions'


interface props {
  submit: () => void;
  answerRequired?: boolean;
  questionNumber?: number;
  resultScreen: boolean;

}

const totalQuestions = questionArrayList.length;

const NextButton = ({ submit, answerRequired, questionNumber, resultScreen }: props) => {

  let buttonText;

  if (resultScreen) {
    buttonText = "Play Again"
    return (
      <div className='button'>
        <button className='button-enabled-result' onClick={submit}>{buttonText}</button>
      </div>
    )
  }

  if (questionNumber === totalQuestions) {
    buttonText = "Final Score"
  }
  else {
    buttonText = "Next Question"
  }

  if (answerRequired) {
    return (
      <div className='button'>
        <button className='button-disabled'>{buttonText}</button>
      </div>
    )
  }
  else {
    return (
      <div className='button'>
        <button className='button-enabled' onClick={submit}>{buttonText}</button>
      </div>
    )
  }

}

export default NextButton