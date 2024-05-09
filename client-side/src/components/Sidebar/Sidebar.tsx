import React from "react";
import { PiSquaresFourBold } from "react-icons/pi";
import { TbMedal } from "react-icons/tb";
import { LuPlusCircle } from "react-icons/lu";
import styles from "./sidebar.module.css";
import { Link, useLocation } from "react-router-dom";
import { PiFramerLogoFill } from "react-icons/pi";
import logo from "../../assets/icons/Group 37.png";

const Sidebar = () => {
  const pathname = useLocation().pathname;

  const activeNavItem = (path: string[]) => {
    if (path.includes(pathname)) {
      return styles.navItemBoxActive;
    } else {
      return styles.navItemBox;
    }
  };

  return (
    <div className={styles.sidebarContainer}>
      <nav className={styles.sidebar}>
        <ul className={styles.sidebarList}>
          <li>
            <div className={styles.logo}>
              <Link to="/homepage">
                <img src={logo} />
              </Link>
            </div>
          </li>
          <li>
            <Link to="/homepage" className={activeNavItem(["/homepage", "/"])}>
              <div className={styles.menu}>
                <PiSquaresFourBold size={16} />
                <p>Home</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/leaderboard" className={activeNavItem(["/leaderboard"])}>
              <div className={styles.menu}>
                <TbMedal size={16} />
                <p>Leaderboard</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/trivia" className={activeNavItem(["/trivia"])}>
              <div className={styles.menu}>
                <LuPlusCircle size={16} />
                <p>Create</p>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
