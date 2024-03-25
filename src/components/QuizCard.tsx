import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../pages/homepage/homepage.module.css'

interface props {
  id: number;
  imgURL: string;
  title: string;
  q1: string;
}


const QuizCard = ({ id, imgURL, title, q1 }: props) => {
  return (
    <Link className={styles.quizCardContainer} to={`/trivia/${id}`}>
      <div className={styles.quizCard}>
        <div className={styles.imageContainer}>
          <img src={imgURL} />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.quizCardTitle}>{title}</div>
          <div className={styles.quizCardCaption}>{q1}</div>
        </div>

      </div>

    </Link>
  )
}

export default QuizCard