import React from 'react'; // Ensure React is imported when using JSX
import Navbar from '../../components/Navbar/Navbar';
import SideBar from '../../components/Sidebar/SideBar';
import { FaCalendar, FaHome, FaLock, FaMoneyBill, FaUser } from 'react-icons/fa';
import { MdMessage } from 'react-icons/md';
import { BiAnalyse } from 'react-icons/bi';
import { AiTwotoneFileExclamation } from 'react-icons/ai';

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

const routes = [
  {
    path: "/admin-dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/admin-dashboard/events-controls",
    name: "Events Controls",
    icon: <FaCalendar />,
  },
  {
    path: "/admin-dashboard/community-controls",
    name: "Community Controls",
    icon: <BiAnalyse />,
  },
  {
    path: "/admin-dashboard/contact-page",
    name: "Messages",
    icon: <MdMessage />,
  }
];

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ children }) => {
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

export default AdminDashboardLayout;
