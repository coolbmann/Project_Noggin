import React, { useEffect, useState } from "react";
import QuizCard from "./QuizCard";
import styles from "../pages/homepage/homepage.module.css";
import { homepageDummyData } from "../assets/homepageDummy";
import axios from "axios";
import config from "../config/config";

interface props {
  category: string;
}

interface cardData {
  collection: string;
  title: string;
  quizId: number;
  question: string;
  question_id: number;
  imageurl: string;
  row_num: number;
}

const QuizCategorySection = ({ category }: props) => {
  const [cardData, setCardData] = useState<cardData[]>([]);

  useEffect(() => {
    const getQuizCardData = async () => {
      try {
        const response = await axios.get(
          `${config.api.baseURL}/collections/${category}`
        );
        console.log(response.data);
        setCardData(response.data);
      } catch (error) {
        return console.log(500);
      }
    };

    getQuizCardData();
  }, []);

  const renderQuizCards = () => {
    return cardData.map((element, index) => {
      console.log(index);
      return (
        <QuizCard
          key={index}
          id={element.quizId}
          imgURL={element.imageurl}
          title={element.title}
          q1={element.question}
        />
      );
    });
  };

  return (
    <div className={styles.sectionContainer}>
      <h1>{category}</h1>
      <div className={styles.sectionCarousel}>{renderQuizCards()}</div>
    </div>
  );
};

export default QuizCategorySection;
