import React from "react";
import styles from "./inputDropDown.module.css";

interface props {
  value: string;
  updateSelection: (value: string) => void;
}

const DropdownItem = ({ value, updateSelection }: props) => {
  return (
    <button className={styles.item} onClick={() => updateSelection(value)}>
      {value}
    </button>
  );
};

export default DropdownItem;
