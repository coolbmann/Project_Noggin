import React, { useState, useEffect } from 'react'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { questionArrayList } from '../assets/questions';

interface props {
  score: number;
}

const ScoreCircularBar = ({ score }: props) => {

  const [finalScore, setFinalScore] = useState<number>(0)

  const quizLength = questionArrayList.length;
  const finalScorePercentage = finalScore / quizLength;

  useEffect(() => {
    const timerID = setTimeout(() => {
      setFinalScore(score);
    }, 150)

    return (
      () => {
        clearTimeout(timerID);
      }
    )
  }, [])


  return (
    <div className='circle-score-bar'>
      <CircularProgressbarWithChildren value={finalScorePercentage * 100} styles={buildStyles({
        pathColor: '#7e75e6',
        trailColor: '#eff0ff',
        pathTransitionDuration: 1
      })} >
        <p className='final-score'><span>{score}</span>/{quizLength}</p>
        <p className='final-score-subtitle'>quiz score</p>

      </CircularProgressbarWithChildren>

    </div>
  )

}

export default ScoreCircularBar