import React from "react";
import avatar from "../../assets/icons/profileAvatar.png";
import styles from "./userDetails.module.css";

interface props {
  username: string;
  totalPoints: number;
}

const ProfileHeader = ({ username, totalPoints }: props) => {
  return (
    <div className={styles.profileDetailsContainer}>
      <div>
        <img src={avatar} />
      </div>
      <div>
        <div className={styles.username}>{username}</div>
        <div className={styles.userLevel}>Knowledge Guru</div>
      </div>
      <div className={styles.userPoints}>{totalPoints}⭐</div>
    </div>
  );
};

export default ProfileHeader;
