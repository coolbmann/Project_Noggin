import React, { useEffect, useState } from "react";
import styles from "./customQuizCard.module.css";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaRegTrashCan } from "react-icons/fa6";

interface props {
  itemKey: string;
  selected: boolean;
  order: number;
  title: string;
  onClickHandler: () => void;
}

const CustomQuizCard = ({
  itemKey,
  selected,
  order,
  title,
  onClickHandler,
}: props) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(selected);
  }, [selected]);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: itemKey });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={styles.cardContainer}
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <div className={styles.cardHandle} {...listeners}>
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
