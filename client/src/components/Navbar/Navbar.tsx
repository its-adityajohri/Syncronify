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

const Navbar = () => {
  return (
    <nav className='p-2 flex'>
      <div className="flex">
        <Link href='/' className="p-2 rounded-full text-white bg-fuchsia-900">S.F</Link>
      </div>
    </nav>
  )
}

export default Navbar