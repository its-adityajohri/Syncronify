import React from 'react'; // Ensure React is imported when using JSX
import Navbar from '../../components/Navbar/Navbar';
import SideBar from '../../components/Sidebar/SideBar';
import { FaCalendar, FaHome, FaLock, FaMoneyBill, FaUser } from 'react-icons/fa';
import { MdMessage } from 'react-icons/md';
import { BiAnalyse, BiCog } from 'react-icons/bi';
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
    path: "/analytics",
    name: "Analytics",
    icon: <BiAnalyse />,
  },
  {
    path: "/file-manager",
    name: "File Manager",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/order",
    name: "Order",
    icon: <BsCartCheck />,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/saved",
    name: "Saved",
    icon: <AiFillHeart />,
  },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <section className='flex'>
      <SideBar routes = {routes} />
      <div className="flex flex-col flex-1">
        <Navbar />
        {children}
      </div>
    </section>
  );
};

export default DashboardLayout;
