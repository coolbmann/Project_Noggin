import React from 'react'
import { PiSquaresFourBold } from "react-icons/pi";
import { TbMedal } from "react-icons/tb";
import { LuPlusCircle } from "react-icons/lu";
import styles from '../pages/homepage/homepage.module.css'
import { Link } from 'react-router-dom'
import { PiFramerLogoFill } from "react-icons/pi";

const Sidebar = () => {
  return (
    <nav className={styles.sidebar}>
      <ul className={styles.sidebarList}>
        <li>
          <div className={styles.logo}>
            <PiFramerLogoFill className={styles.PiFramerLogoFill} color='#4b42ad' size={20} />
          </div>
        </li>
        <li>
          <Link to='/homepage' className={styles.navItemBox}>
            <PiSquaresFourBold color='white' size={16} />
          </Link>
        </li>
        <li>
          <Link to='/404' className={styles.navItemBox}>
            <TbMedal color='white' size={16} />
          </Link>
        </li>
        <li>
          <Link to='/trivia' className={styles.navItemBox}>
            <LuPlusCircle color='white' size={16} />
          </Link>
        </li>


      </ul>



    </nav >
  )
}

export default Sidebar;