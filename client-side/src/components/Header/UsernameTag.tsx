import React from "react";
import Username from "../Username";
import Avatar from "../../assets/icons/profileAvatar.png";
import styles from "./header.module.css";

interface props {
  username: string;
}

const UsernameTag = ({ username }: props) => {
  return (
    <div className={styles.profileTag}>
      <div className={styles.profileAvatar}>
        <img src={Avatar} />
      </div>
      <div className={styles.username}>{username}</div>
    </div>
  );
};

export default UsernameTag;
