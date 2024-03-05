import React from 'react'
import { questionImageArray } from '../assets/images'

interface props {
  currentQuestion: number;
}

const QuestionImage = ({ currentQuestion }: props): React.JSX.Element => {

  const currentImage = questionImageArray[currentQuestion];

  return (
    <div className='image-container'>
      <img className='question-image' src={currentImage.imageURL} />
    </div>
  )
}

export default QuestionImage