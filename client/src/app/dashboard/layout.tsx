import Navbar from '../../components/Navbar/Navbar';
import SideBar from '../../components/Sidebar/SideBar';

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <SideBar/>
        <Navbar/>    
        {children}
      </section>
    )
  }