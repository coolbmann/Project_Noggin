import React, { ReactNode, useState } from "react";
import styles from "./accordion.module.css";
import { FaChevronUp } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";

interface props {
  children: ReactNode;
  headerContent?: string;
}

const Accordion = ({ children, headerContent }: props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.accordion}>
      <button className={styles.accordionHeading} onClick={toggleAccordion}>
        <div>{headerContent}</div>
        <span>
          {isOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </span>
      </button>
      {isOpen && <div className={styles.accordionContent}>{children}</div>}
    </div>
  );
};

export default Accordion;
