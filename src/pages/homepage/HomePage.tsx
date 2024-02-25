import React from 'react'
import { Link } from 'react-router-dom'
import TriviaPage from '../trivia-page/TriviaPage'
import './homepage.css'
import Sidebar from '../../components/Sidebar'
import QuizCategorySection from '../../components/QuizCategorySection'

const HomePage = () => {
  return (
    <div className='homepage'>
      <Sidebar />
      <div className='main-container'>
        <div className='header-section'></div>
        <div className='content-section'>
          <QuizCategorySection />
        </div>

      </div>
    </div >
  )
}

export default HomePage