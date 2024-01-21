'use client' 

import Link from 'next/link'
// import React, { useState } from "react";

// import "./Navbar.css";
// import { Link, NavLink } from "react-router-dom";

// export default Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav>
//       <ul>
//         <li>
//           <NavLink to="/about">About</NavLink>
//         </li>
//         <li>
//           <NavLink to="/services">Services</NavLink>
//         </li>
//         <li>
//           <NavLink to="/contact">Contact</NavLink>
//         </li>
//       </ul>
//     </nav>
//   );
// };

import React from 'react'
import Button from '../Button/Button'

const Navbar = () => {
  return (
    <nav className='px-10 py-2 flex flex-row-reverse items-center gap-5 border-b-2 border-gray-500 bg-gray-700 text-white'>
      {/* <div className="flex">
        <Link href='/' className="p-2 rounded-full text-white bg-fuchsia-900">S.F</Link>
      </div> */}
      <button className='p-2 border-2 w-10 h-10 flex items-center justify-center border-white rounded-full'>
        <img src="/" alt="U" />
      </button>
      <Link href='about'>About Us</Link>
      <Link href='contact'>Contact</Link>
    </nav>
  )
}

export default Navbar