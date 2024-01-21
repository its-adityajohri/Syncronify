import Navbar from '../../components/Navbar/Navbar';
import SideBar from '../../components/Sidebar/SideBar';

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className='flex'>
        <SideBar/>
        <div className="flex flex-col flex-1">
          <Navbar/>    
          {children}
        </div>
      </section>
    )
  }