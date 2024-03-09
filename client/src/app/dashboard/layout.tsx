import React from 'react'; // Ensure React is imported when using JSX
import Navbar from '../../components/Navbar/Navbar';
import SideBar from '../../components/Sidebar/SideBar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <section className='flex'>
      <SideBar />
      <div className="flex flex-col flex-1">
        <Navbar />
        {children}
      </div>
    </section>
  );
};

export default DashboardLayout;
