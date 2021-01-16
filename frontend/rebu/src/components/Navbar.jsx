import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import SidebarData from "./SidebarData";

import "./Navbar.scss";

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);

  const SidebarList = SidebarData.map((item, index)=> {
    return (
      <li key={index} className="nav-text">
        <Link to={item.path}>
          {item.icon}
          <span>{item.title}</span>
        </Link>
      </li>
    )
  })

  function showSidebar () {
    setSidebar(!sidebar);
  }

  return (
    <div className="nav">
      <div className="navbar">
        <span className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar}/>
        </span>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <span className="menu-bars">
              <AiIcons.AiOutlineClose onClick={showSidebar}/>
            </span>
          </li>
          {SidebarList}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar;