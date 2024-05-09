import React from "react";
import { Link, useLocation } from "react-router-dom";
import TriviaPage from "../trivia-page/TriviaPage";
import styles from "./homepage.module.css";
import "../../index.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import QuizCategorySection from "../../components/QuizCategorySection";
import Username from "../../components/Username";
import Toast from "../../components/Toast/Toast";
import Header from "../../components/Header/Header";

const HomePage = () => {
  return (
    <div className={styles.homepage}>
      <Sidebar />
      <div className={styles.mainContainer}>
        <Header />
        <div className={styles.contentSection}>
          <QuizCategorySection category="Daily Challenge" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
