import React from 'react'
import { Link } from 'react-router-dom'
import TriviaPage from '../trivia-page/TriviaPage'
import styles from './homepage.module.css'
import '../../index.css'
import Sidebar from '../../components/Sidebar'
import QuizCategorySection from '../../components/QuizCategorySection'

const HomePage = () => {
  return (
    <div className={styles.homepage}>
      <Sidebar />
      <div className={styles.mainContainer}>
        <div className={styles.headerSection}></div>
        <div className={styles.contentSection}>
          <QuizCategorySection />
        </div>

      </div>
    </div >
  )
}

export default HomePage