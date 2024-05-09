import React from "react";
import Username from "../Username";
import Avatar from "../../assets/icons/profileAvatar.png";
import styles from "./header.module.css";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.profileTag}>
        <div className={styles.profileAvatar}>
          <img src={Avatar} />
        </div>
        <div className={styles.username}>
          <Username />
        </div>
      </div>
    </div>
  );
};

export default Header;
