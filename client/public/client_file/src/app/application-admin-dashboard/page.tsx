// pages/AdminDashboard.tsx
"use client"
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
// import axios from 'axios';

interface adminData {
  id: number;
  admin_detail: any;
  community_detail:any;
}

const AppAdminDashboard: React.FC = () => {

  const adminData = [
    {
      id: 1,
      admin_detail: {
        name: "John Doe",
        age: 35,
        description: "Lorem ipsum dolor sit amet consectet",
        profile: '/card1.svg',
        phone: "+91-8764209876",
        email: "john@gmail.com",
      },
      community_detail: {
        logo: '/card1.svg',
        name: "Community Leader",
        description: "This is a leader of the community.",
        member_count: 1000,
      }
    },
    {
      id: 2,
      admin_detail: {
        name: "Alice Smith",
        age: 28,
        description: "Lorem ipsum dolor sit amet consectet",
        profile: '/card1.svg',
        phone: "+91-9876543210",
        email: "alice@gmail.com",
      },
      community_detail: {
        logo: '/card1.svg',
        name: "Community Manager",
        description: "This is a manager of the community.",
        member_count: 1500,
      }
    },
    {
      id: 3,
      admin_detail: {
        name: "Robert Johnson",
        age: 40,
        description: "Lorem ipsum dolor sit amet consectet",
        profile: '/card1.svg',
        phone: "+91-7654321098",
        email: "robert@gmail.com",
      },
      community_detail: {
        logo: '/card1.svg',
        name: "Community Coordinator",
        description: "This is a coordinator of the community.",
        member_count: 800,
      }
    },
    {
      id: 4,
      admin_detail: {
        name: "Emily Wilson",
        age: 32,
        description: "Lorem ipsum dolor sit amet consectet",
        profile: '/card1.svg',
        phone: "+91-9876543210",
        email: "emily@gmail.com",
      },
      community_detail: {
        logo: '/card1.svg',
        name: "Community Moderator",
        description: "This is a moderator of the community.",
        member_count: 1200,
      }
    },
    {
      id: 5,
      admin_detail: {
        name: "Michael Brown",
        age: 45,
        description: "Lorem ipsum dolor sit amet consectet",
        profile: '/card1.svg',
        phone: "+91-8765432109",
        email: "michael@gmail.com",
      },
      community_detail: {
        logo: '/card1.svg',
        name: "Community Advocate",
        description: "This is an advocate of the community.",
        member_count: 2000,
      }
    },
    {
      id: 6,
      admin_detail: {
        name: "Jessica Taylor",
        age: 33,
        description: "Lorem ipsum dolor sit amet consectet",
        profile: '/card1.svg',
        phone: "+91-7654321098",
        email: "jessica@gmail.com",
      },
      community_detail: {
        logo: '/card1.svg',
        name: "Community Ambassador",
        description: "This is an ambassador of the community.",
        member_count: 900,
      }
    },
    {
      id: 7,
      admin_detail: {
        name: "David Martinez",
        age: 38,
        description: "Lorem ipsum dolor sit amet consectet",
        profile: '/card1.svg',
        phone: "+91-9876543210",
        email: "david@gmail.com",
      },
      community_detail: {
        logo: '/card1.svg',
        name: "Community Organizer",
        description: "This is an organizer of the community.",
        member_count: 1800,
      }
    },
    {
      id: 8,
      admin_detail: {
        name: "Sophia Lee",
        age: 29,
        description: "Lorem ipsum dolor sit amet consectet",
        profile: '/card1.svg',
        phone: "+91-8765432109",
        email: "sophia@gmail.com",
      },
      community_detail: {
        logo: '/card1.svg',
        name: "Community Developer",
        description: "This is a developer of the community.",
        member_count: 1100,
      }
    },
    {
      id: 9,
      admin_detail: {
        name: "Daniel Clark",
        age: 42,
        description: "Lorem ipsum dolor sit amet consectet",
        profile: '/card1.svg',
        phone: "+91-7654321098",
        email: "daniel@gmail.com",
      },
      community_detail: {
        logo: '/card1.svg',
        name: "Community Leader",
        description: "This is a leader of the community.",
        member_count: 1700,
      }
    },
    {
      id: 10,
      admin_detail: {
        name: "Olivia Rodriguez",
        age: 31,
        description: "Lorem ipsum dolor sit amet consectet",
        profile: '/card1.svg',
        phone: "+91-9876543210",
        email: "olivia@gmail.com",
      },
      community_detail: {
        logo: '/card1.svg',
        name: "Community Moderator",
        description: "This is a moderator of the community.",
        member_count: 1300,
      }
    },
  ];  

  const [admins, setAdmins] = useState<adminData[]>(adminData);

  // const fetchAdmins = async () => {
  //   try {
  //     // const response = await axios.get<{ admins: Admin[] }>('/api/admins');
  //     // setAdmins(response.data.admins);
  //   } catch (error) {
  //     console.error('Error fetching admins:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchAdmins();
  // }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All admins</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {admins.map((admin) => (
          <div
            key={admin.id}
            className="bg-white border-x-2 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <img
                  src={admin.admin_detail.profile}
                  alt={admin.admin_detail.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className="text-gray-600 font-semibold">{admin.admin_detail.name}</span>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                Age: {admin.admin_detail.age}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Description: {admin.admin_detail.description}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Phone: {admin.admin_detail.phone}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Email: {admin.admin_detail.email}
              </p>

              <div className="mt-4 border-t border-gray-200 pt-4">
                <div className="flex items-center mb-2">
                  <img
                    src={admin.community_detail.logo}
                    alt={admin.community_detail.name}
                    className="w-8 h-8 mr-2 object-cover rounded-full"
                  />
                  <span className="text-gray-600">
                    {admin.community_detail.name}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  Description: {admin.community_detail.description}
                </p>
                <p className="text-sm text-gray-500">
                  Member Count: {admin.community_detail.member_count}
                </p>
                <Button className='float-right mb-5 font-semibold text-md'>Manage</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppAdminDashboard;
