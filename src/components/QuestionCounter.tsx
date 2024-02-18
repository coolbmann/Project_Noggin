import React from 'react'
import '../App.css'
import { questionArrayList } from '../assets/questions'

interface props {
  currentQuestion: number;
}

const QuestionCounter = ({ currentQuestion }: props): React.JSX.Element => {
  return (
    <div className='question-count'>
      <p>
        <i>
          Question {currentQuestion}/{questionArrayList.length}
        </i>
      </p>
    </div>
  )
}

export default QuestionCounter