"use client"
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'

interface AdminDetailProps {
    id: number;
    admin_detail: {
      name: string;
      age: number;
      description: string;
      profile: string;
      phone: string;
      email: string;
    };
    community_detail: {
      logo: string;
      name: string;
      description: string;
      member_count: number;
    };
}

interface Params{
  adminId:number;
}

const AdminDetailPage: React.FC<{params:Params}> = ({params}) => {

  const adminData: AdminDetailProps[] = [
    {
      id: 0,
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
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
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
      id: 7,
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
      id: 8,
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
      id: 9,
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

  const {adminId}=params;
  const [selectedAdmin, setSelectedAdmin]=useState<AdminDetailProps>(adminData[adminId]);

  const {admin_detail, community_detail}=selectedAdmin;

  const onDelete=()=>{
    // 
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Admin Detail</h1>

      {/* Admin Profile Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-4">
          <img
            src={admin_detail.profile}
            alt={admin_detail.name}
            className="w-16 h-16 mr-4 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{admin_detail.name}</h2>
            <p className="text-gray-600">{admin_detail.email}</p>
          </div>
        </div>
        <div>
          <p className="text-gray-700">{admin_detail.description}</p>
          <p className="text-gray-700">Age: {admin_detail.age}</p>
          <p className="text-gray-700">Phone: {admin_detail.phone}</p>
        </div>
      </div>

      {/* Community Details Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Community Details</h2>
        <div className="flex items-center mb-4">
          <img
            src={community_detail.logo}
            alt={community_detail.name}
            className="w-12 h-12 mr-4 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">{community_detail.name}</h3>
            <p className="text-gray-700">{community_detail.description}</p>
            <p className="text-gray-700">Member Count: {community_detail.member_count}</p>
          </div>
        </div>
      </div>

      {/* Delete Button */}
      <div className="text-center">
        <Button onClick={onDelete} className="bg-red-500 hover:bg-red-600 text-white">
          Delete Admin
        </Button>
      </div>
    </div>
  )
}

export default AdminDetailPage