import React from 'react'; // Ensure React is imported when using JSX
import Navbar from '../../components/Navbar/Navbar';
import SideBar from '../../components/Sidebar/SideBar';
import { FaCalendar, FaHome, FaLock, FaMoneyBill, FaUser } from 'react-icons/fa';
import { MdMessage } from 'react-icons/md';
import { BiAnalyse, BiCog, BiGroup, BiMap, BiNote } from 'react-icons/bi';
import { AiFillHeart, AiTwotoneFileExclamation } from 'react-icons/ai';
import { BsCartCheck } from 'react-icons/bs';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/dashboard/event-page",
    name: "Events",
    icon: <FaCalendar />,
  },
  {
    path: "/dashboard/contact-page",
    name: "Messages",
    icon: <MdMessage />,
  },
  {
    path: "/dashboard/navigation",
    name: "Navigation",
    icon: <BiMap />,
  },
  {
    path: "/dashboard/your-groups",
    name: "Groups",
    icon: <BiGroup />,
  },
  {
    path: "/dashboard/your-notes",
    name: "Notes",
    icon: <BiNote />,
  },
  {
    path: "/dashboard/user-profile",
    name: "Edit Profile",
    icon: <FaUser />,
  }
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <section className='flex h-screen'>
      <SideBar routes = {routes} />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="overflow-auto flex-1">
          {children}
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
