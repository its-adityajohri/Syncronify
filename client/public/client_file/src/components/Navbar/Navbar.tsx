'use client' 

import React, { useState } from "react";

// import "./Navbar.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOption, setUserOption]= useState(false);

  const router=useRouter();

  const {logout}=useAuth();
  const handleUserOption = () => {
    setUserOption(!userOption);
  };

  const handleLogOut = () => {
    // localStorage.removeItem("token");
    // window.location.reload();
    logout();
    router.push("/");
  };


// #0f172a
  return (
    <nav className='px-10 py-2 flex flex-row-reverse items-center gap-5 border-b-2 border-gray-500 bg-[#0f172a] text-white'>
      {/* <div className="flex">
        <Link href='/' className="p-2 rounded-full text-white bg-fuchsia-900">S.F</Link>
      </div> */}
      <button className='p-2 relative border-2 w-10 h-10 flex items-center justify-center border-white rounded-full' onClick={handleUserOption}>
        <img src="/" alt="U" />
        {userOption&&
          <div className="absolute top-12 py-3 px-4 font-semibold rounded-xl bg-gray-800">
            <button onClick={handleLogOut}>Logout</button>
          </div>
        }
      </button>
      <Link href='about'>About Us</Link>
      <Link href='contact'>Contact</Link>
    </nav>
  );
};

export default Navbar
  