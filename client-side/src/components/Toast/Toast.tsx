import React from "react";
import styles from "./toast.module.css";
import { PiWarningCircleFill } from "react-icons/pi";

interface props {
  heading: string;
  caption: string;
  animationEnd?: () => void;
}

const Toast = ({ heading, caption, animationEnd }: props) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        right: "0",
      }}
      onAnimationEnd={animationEnd}
    >
      <div className={styles.mainContainer}>
        <div className={styles.toastContainer}>
          <div className={styles.innerToastContainer}>
            <div className={styles.iconContainer}>
              <PiWarningCircleFill color="#F7AD1E" size={22} />
            </div>
            <div className={styles.textContainer}>
              <div>
                <h3>{heading}</h3>
              </div>
              <div>
                <p>{caption}</p>
              </div>
            </div>
          </div>
          <div className={styles.colourAccent}></div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Toast;
