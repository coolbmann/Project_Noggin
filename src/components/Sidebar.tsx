import React from 'react'
import { PiSquaresFourBold } from "react-icons/pi";
import { TbMedal } from "react-icons/tb";
import { LuPlusCircle } from "react-icons/lu";
import '../pages/homepage/homepage.css'
import { Link } from 'react-router-dom'
import { PiFramerLogoFill } from "react-icons/pi";

const Sidebar = () => {
  return (
    <nav className='sidebar'>
      <ul className='sidebar-list'>
        <li>
          <div className='logo'>
            <PiFramerLogoFill className='PiFramerLogoFill' color='#4b42ad' size={20} />
          </div>
        </li>
        <li>
          <Link to='/homepage' className='nav-item-box'>
            <PiSquaresFourBold color='white' size={16} />
          </Link>
        </li>
        <li>
          <Link to='/404' className='nav-item-box'>
            <TbMedal color='white' size={16} />
          </Link>
        </li>
        <li>
          <Link to='/trivia' className='nav-item-box'>
            <LuPlusCircle color='white' size={16} />
          </Link>
        </li>


      </ul>



    </nav >
  )
}

export default Sidebar;