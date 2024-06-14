import React, { useEffect } from "react";
import styles from "../../pages/leaderboard/leaderboard.module.css";
import userDetailsStyles from "./userDetails.module.css";
import AttemptTile from "./AttemptTile";
import ProfileHeader from "./ProfileHeader";
import { LuArrowRightToLine } from "react-icons/lu";

interface props {
  visible: boolean;
  closePanel: () => void;
  userAttemptDetailsData: userAttemptDetails[];
  selectedUser: string;
}

interface userAttemptDetails {
  userId: string;
  username: string;
  attemptId: string;
  title: string;
  score: number;
  attemptPoints: number;
  createdAt: string;
  question: string;
  answer_selected: string;
  correct_answer: string;
  totalPoints: number;
  order: number;
}

const UserDetailsPanel = ({
  visible,
  closePanel,
  userAttemptDetailsData,
  selectedUser,
}: props) => {
  const selectedUserData = userAttemptDetailsData.filter((attempt) => {
    return attempt.userId === selectedUser;
  });

  const attemptIds: string[] = [];

  selectedUserData.forEach((data) => {
    attemptIds.push(data.attemptId);
  });

  const uniqueAttemptIds = Array.from(new Set(attemptIds));

  const attemptDataArray = [];

  const selectedUserUniqueAttemptArray = () => {
    return uniqueAttemptIds.map((attempt, index) => {
      const attemptResponseData = selectedUserData.filter((item) => {
        return item.attemptId === uniqueAttemptIds[index];
      });

      const sortedAttemptResponseData = attemptResponseData.sort((a, b) => {
        if (a.order === null) return 1;
        if (b.order === null) return 1;
        return a.order - b.order;
      });

      return (
        <AttemptTile
          key={index}
          title={attemptResponseData[0].title}
          score={attemptResponseData[0].score}
          attemptPoints={attemptResponseData[0].attemptPoints}
          createdAt={attemptResponseData[0].createdAt}
          attemptResponseData={attemptResponseData}
        />
      );
    });
  };

  useEffect(() => {
    console.log(selectedUserData);
    console.log(uniqueAttemptIds);
    console.log(selectedUserUniqueAttemptArray());
  }, [selectedUserData]);

  return (
    <div
      className={styles.sidePanel}
      style={
        visible
          ? { transform: "translateX(0rem)" }
          : { transform: "translateX(45rem)" }
      }
    >
      {selectedUserData.length < 1 ? (
        <div>is loading...</div>
      ) : (
        <>
          <div className={styles.navHeader}>
            <button onClick={closePanel}>
              <LuArrowRightToLine color="#6c6685" size={"1.125rem"} />
            </button>
          </div>
          <div className={styles.profileHeader}>
            <ProfileHeader
              username={selectedUserData[0].username}
              totalPoints={selectedUserData[0].totalPoints}
            />
          </div>
          <div className={styles.profileBody}>
            <div className={userDetailsStyles.heading}>Scorecard</div>
            <div className={userDetailsStyles.titlesLayoutContainer}>
              <div
                className={userDetailsStyles.titlesLayout}
                style={{
                  paddingBottom: "1rem",
                  backgroundColor: "#ffffff",
                  position: "sticky",
                  top: "0",
                }}
              >
                <div
                  style={{
                    textAlign: "left",
                    paddingLeft: "1.5rem",
                    fontWeight: "700",
                    fontSize: "0.875rem",
                  }}
                >
                  Quiz
                </div>
                <div style={{ fontWeight: "700", fontSize: "0.875rem" }}>
                  Attempted At
                </div>
                <div style={{ fontWeight: "700", fontSize: "0.875rem" }}>
                  Score
                </div>
                <div
                  style={{
                    paddingRight: "1.5rem",
                    fontWeight: "700",
                    fontSize: "0.875rem",
                  }}
                >
                  Total Points
                </div>
              </div>
              <div>{selectedUserUniqueAttemptArray()}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetailsPanel;
