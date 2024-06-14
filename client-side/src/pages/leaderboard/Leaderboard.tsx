import React, {
  RefObject,
  createRef,
  useEffect,
  useRef,
  useState,
} from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./leaderboard.module.css";
import { Link, redirectDocument } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import LeaderboardRow from "../../components/LeaderboardRow";
import LeaderboardSpacerRow from "../../components/LeaderboardSpacerRow";
import UserDetailsPanel from "../../components/UserDetails/UserDetailsPanel";
import axios from "axios";
import Toast from "../../components/Toast/Toast";
import Header from "../../components/Header/Header";
import config from "../../config/config";

interface userOverview {
  id: string;
  username: string;
  quizAttempts: number;
  scorePercentage: number;
  totalPoints: number;
}

interface userAttemptDetails {
  userId: string;
  username: string;
  attemptId: string;
  title: string;
  score: number;
  createdAt: string;
  attemptPoints: number;
  question: string;
  answer_selected: string;
  correct_answer: string;
  totalPoints: number;
  order: number;
}

const Leaderboard = () => {
  const [sidepanelVisible, setSidepanelVisible] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<userOverview[]>([]);
  const [userAttemptDetails, setUserAttemptDetails] = useState<
    userAttemptDetails[]
  >([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const getLeaderboardData = async () => {
      try {
        const response = await axios.get(
          `${config.api.baseURL}/user/overview`,
          {
            withCredentials: true,
          }
        );
        const sortedData = userRankings(await response.data);
        setLeaderboardData(sortedData);
      } catch (error) {
        return console.log("getLeaderboardData", error);
      }
    };
    getLeaderboardData();

    const getUserAttemptDetails = async () => {
      try {
        const response = await axios.get(
          `${config.api.baseURL}/user/overview/attempts`,
          {
            withCredentials: true,
          }
        );
        setUserAttemptDetails(await response.data);
      } catch (error) {
        return console.log("getUserAttemptDetails", error);
      }
    };

    getUserAttemptDetails();

    const getUserId = async () => {
      try {
        const response = await axios.get(`${config.api.baseURL}/user/userid`, {
          withCredentials: true,
        });
        const responseData = await response.data;
        setCurrentUserId(await responseData);
      } catch (error) {}
    };

    getUserId();
  }, []);

  // Temporary useEffect to print fresh state data
  useEffect(() => {
    console.log(leaderboardData);
    // console.log(userAttemptDetails);
  }, [selectedUser, userAttemptDetails]);

  const rowRefs = leaderboardData.reduce((acc, value) => {
    acc[value.id] = React.createRef();
    return acc;
  }, {} as { [key: string]: RefObject<HTMLTableRowElement> });

  const jumpToProfileClick = () => {
    // Function to scroll to row based on current user key
    const scrollToRow = (id: string) => {
      rowRefs[id].current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    };

    if (
      leaderboardData.some((data) => {
        return data.id === currentUserId;
      })
    ) {
      setSelectedUser(currentUserId);
      setSidepanelVisible(true);
      scrollToRow(currentUserId);
    } else {
      setToastVisible(true);
    }
  };

  // Sort getLeaderboardData based on total points
  const userRankings = (userOverviewData: userOverview[]): userOverview[] => {
    return userOverviewData.sort((a, b) => {
      return b.totalPoints - a.totalPoints;
    });
  };

  return (
    <div className={styles.homepage}>
      <Sidebar />
      <div className={styles.mainContainer}>
        <Header />
        <div
          className={styles.mainContainerBody}
          style={
            sidepanelVisible
              ? { gridTemplateColumns: "auto 48rem" }
              : { gridTemplateColumns: "auto 0rem" }
          }
        >
          <div>
            <div className={styles.headerSection}>
              <div>
                <button className={styles.homeButton}>
                  <Link to="/homepage" className={styles.homeButton}>
                    <FaChevronLeft size={10} />
                    Home
                  </Link>
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <h1>Leaderboard</h1>
                <div>
                  <button
                    className={styles.jumpButton}
                    onClick={jumpToProfileClick}
                  >
                    Jump to my profile 💪
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.leaderboardContainer}>
              {/* Table Grid Row */}
              <div
                className={styles.tableContainer}
                style={{
                  display: "block",
                  height: "calc(100vh - 201px)",
                  width: "100%",
                  overflow: "auto",
                }}
              >
                <table className={styles.leaderboardTable}>
                  <thead
                    style={{
                      position: "sticky",
                      top: "0",
                      backgroundColor: "#fefeff",
                    }}
                  >
                    <tr>
                      <td className={styles.numberColumn}></td>
                      <td className={styles.challengerColumn}>Challenger</td>
                      <td className={styles.quizCompletedColumn}>
                        Quizzes Attempted
                      </td>
                      <td className={styles.scoreColumn}>Average Score</td>
                      <td className={styles.pointsColumn}>Total Points</td>
                    </tr>
                    <tr className={styles.rowSpacer}></tr>
                  </thead>
                  <tbody>
                    {leaderboardData.map((user, index) => {
                      return (
                        <LeaderboardRow
                          rowRef={rowRefs[user.id]}
                          key={user.id}
                          userId={user.id}
                          rank={index + 1}
                          username={user.username}
                          quizAttempts={user.quizAttempts}
                          averageScore={user.scorePercentage}
                          totalPoints={user.totalPoints}
                          showDetails={() => {
                            setSelectedUser(user.id);
                            setSidepanelVisible(true);
                          }}
                          selectedUser={selectedUser}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <UserDetailsPanel
            visible={sidepanelVisible}
            closePanel={() => setSidepanelVisible(false)}
            userAttemptDetailsData={userAttemptDetails}
            selectedUser={selectedUser}
          />
        </div>
      </div>

      {toastVisible ? (
        <Toast
          heading="Just a heads up..."
          caption="You haven't done any quizzes!"
          animationEnd={() => setToastVisible(false)}
          type="orange"
        />
      ) : null}
    </div>
  );
};

export default Leaderboard;
