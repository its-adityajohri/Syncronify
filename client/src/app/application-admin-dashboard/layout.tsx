import React from 'react'; // Ensure React is imported when using JSX
import Navbar from '../../components/Navbar/Navbar';
import SideBar from '../../components/Sidebar/SideBar';
import { FaCalendar, FaHome, FaLock, FaMoneyBill, FaUser, FaUserFriends } from 'react-icons/fa';
import { MdMessage } from 'react-icons/md';
import { BiAnalyse } from 'react-icons/bi';
// import { AiTwotoneFileExclamation } from 'react-icons/ai';

interface AppAdminDashboardLayoutProps {
  children: React.ReactNode;
}

const routes = [
  {
    path: "/application-admin-dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/application-admin-dashboard/admin-requests",
    name: "Manage Requests",
    icon: <FaUserFriends />,
  },
  {
    path: "/application-admin-dashboard/all-admins",
    name: "All Admins",
    icon: <FaUser />,
  },
  // {
  //   path: "/application-admin-dashboard/contact-page",
  //   name: "Messages",
  //   icon: <MdMessage />,
  // }
];

const AppAdminDashboardLayout: React.FC<AppAdminDashboardLayoutProps> = ({ children }) => {
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

export default AppAdminDashboardLayout;
