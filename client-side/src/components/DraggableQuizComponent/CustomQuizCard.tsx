import React, { useEffect, useState } from "react";
import styles from "./customQuizCard.module.css";
import { RxDragHandleDots2 } from "react-icons/rx";

interface props {
  selected: boolean;
  order: number;
  title: string;
  onClickHandler: () => void;
}

const CustomQuizCard = ({ selected, order, title, onClickHandler }: props) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(selected);
  }, [selected]);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHandle}>
        <RxDragHandleDots2 size={24} color="#CDCDCD" />
      </div>
      <div
        className={
          active ? styles.cardInfoContainerSelected : styles.cardInfoContainer
        }
        onClick={onClickHandler}
      >
        <div className={styles.cardQuestionInfo}>
          <div className={styles.questionNumber}>Q{order + 1}</div>
          <div className={styles.questionTypeTag}>Multiple Choice</div>
        </div>
        <div className={styles.titlePreview}>{title}</div>
      </div>
    </div>
  );
};

export default CustomQuizCard;
