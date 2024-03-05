import React from 'react'
import QuizCard from './QuizCard'
import styles from '../pages/homepage/homepage.module.css'
import { homepageDummyData } from '../assets/homepageDummy';

const renderQuizCards = () => {
  return (
    homepageDummyData.map((element, index) => {
      console.log(index);
      return (
        <QuizCard key={index} id={element.id} imgURL={element.imgURL} title={element.title} q1={element.q1} />
      )
    })
  )

}

const QuizCategorySection = () => {
  return (
    <div className={styles.sectionContainer} >
      <h1>Daily Challenge</h1>
      <div className={styles.sectionCarousel}>
        {renderQuizCards()}
      </div>

    </div >
  )
}

export default QuizCategorySection