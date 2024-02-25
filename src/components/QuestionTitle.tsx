import React from 'react'
import '../assets/questions'
import { questionArrayList } from '../assets/questions';
import '../pages/trivia-page/trivia-page.css'

interface props {
  currentQuestion: number;
}

const QuestionTitle = ({ currentQuestion }: props) => {

  const question = questionArrayList[currentQuestion];

  return (
    <div className='question-title'>
      <h1>
        {question.question}
      </h1>
    </div>
  )
}

export default QuestionTitle