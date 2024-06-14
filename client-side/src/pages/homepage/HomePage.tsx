import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import TriviaPage from "../trivia-page/TriviaPage";
import styles from "./homepage.module.css";
import "../../index.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import QuizCategorySection from "../../components/QuizCategorySection";
import Username from "../../components/Username";
import Toast from "../../components/Toast/Toast";
import Header from "../../components/Header/Header";
import UsernameTag from "../../components/Header/UsernameTag";
import Tooltip from "../../components/Tooltip/Tooltip";
import axios from "axios";
import config from "../../config/config";

const HomePage = () => {
  const [topUser, setTopUser] = useState("");
  const [totalPoints, setTotalPoints] = useState<number>();

  useEffect(() => {
    const topUserData = async () => {
      try {
        const response = await axios.get(`${config.api.baseURL}/user/topuser`, {
          withCredentials: true,
        });
        setTopUser(response.data);
      } catch (error) {
        return console.log("error with top data");
      }
    };

    const totalPoints = async () => {
      try {
        const response = await axios.get(`${config.api.baseURL}/total-points`, {
          withCredentials: true,
        });
        setTotalPoints(response.data.sum);
      } catch (error) {
        return console.log("error with totalPoints");
      }
    };
    topUserData();
    totalPoints();
  }, []);

  return (
    <div className={styles.homepage}>
      <Sidebar />
      <div className={styles.mainContainer}>
        <Header />
        <div className={styles.contentSection}>
          <div className={styles.statSection}>
            <div className={styles.statContainer}>
              <div>
                <h2>Top Challenger</h2>
              </div>
              <div>
                <UsernameTag username={topUser} />
              </div>
            </div>
            <div className={styles.statContainer}>
              <div>
                <h2>Most Popular Quiz</h2>
              </div>
              <div>
                <div className={styles.linkContainer}>
                  <Link
                    style={{ textDecoration: "none", color: "#2b1c50" }}
                    to="/trivia?quizid=10"
                  >
                    General Knowledge #3
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.statContainer}>
              <div>
                <h2>Collective Points Earned</h2>
              </div>
              <div
                style={{
                  fontSize: "1.25rem",
                  color: "#2b1c50",
                  fontWeight: "600",
                }}
              >
                {totalPoints} ⭐
              </div>
            </div>
          </div>
          <Tooltip
            bgcolor="#FFF3E1E3"
            text={`New to the app? Do a quiz, check out your ranking, and then create your own questions to add to the community!`}
          />
          <QuizCategorySection category="Community Made" />
          <QuizCategorySection category="Weekly Challenge" />
          <QuizCategorySection category="General Knowledge" />
          <QuizCategorySection category="Science & Sports" />
          <QuizCategorySection category="History & Pop Culture" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
