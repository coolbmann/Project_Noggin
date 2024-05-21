import React, { ReactNode, useEffect, useState } from "react";
import styles from "./inputDropDown.module.css";
import { FaChevronUp } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import DropdownItem from "./DropdownItem";

interface props {
  options: string[];
  handleSelection: (selection: string) => void;
  value: string;
}

const InputDropDown = ({ options, handleSelection, value }: props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    setSelectedOption("");
  }, [options]);

  const toggleinputDropDown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.inputDropDown}>
      <button
        className={styles.inputDropDownHeading}
        style={
          isOpen && options.length > 0
            ? {
                borderBottomColor: "transparent",
                borderBottomLeftRadius: "0",
                borderBottomRightRadius: "0",
              }
            : {}
        }
        onClick={toggleinputDropDown}
      >
        <input
          type="text"
          placeholder="Select the correct answer from the dropdown"
          value={value}
          onClick={() => setIsOpen(!isOpen)}
          onFocus={(e) => e.currentTarget.blur()}
          style={{ cursor: "pointer" }}
        />
        <span>
          {isOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </span>
      </button>
      {isOpen && options.length > 0 ? (
        <div className={styles.inputDropDownContent}>
          {options.map((item, index) => {
            return (
              <DropdownItem
                key={index}
                value={item}
                updateSelection={(value: string) => {
                  setIsOpen(!isOpen);
                  setSelectedOption(value);
                  handleSelection(value);
                }}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default InputDropDown;
