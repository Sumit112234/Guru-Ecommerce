import React, { useEffect, useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Clock, User, ShoppingBag, Shield } from 'lucide-react';
import { useUser } from '../../context/userContext';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../lib/getUserDetail';


const UserDetails = () => {
//   const [darkTheme, setDarkTheme] = useState(false);
const { darkTheme } = useUser();

const {_id} = useParams();
useEffect(()=>{
    getUserDetails(_id)
    .then((data)=>{
        //console.log(data.data.user[0],data.data.user.name)
        setUser(data.data.user[0]);
    })
    
},[])
  // Sample user dataf
  const [user,setUser]=useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/api/placeholder/150/150",
    mobile: "1234567890",
    status: "Active",
    verify_email: true,
    last_login_date: new Date().toISOString(),
    role: "User",
    address_details: [{ _id: "1" }],
    orderHistory: [{ _id: "1" }, { _id: "2" }],
    createdAt: new Date().toISOString()
  });

  const getStatusColor = (status) => {
    const colors = {
      Active: 'bg-green-500',
      Inactive: 'bg-gray-500',
      Suspended: 'bg-red-500'
    };
    return colors[status] || colors.Inactive;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkTheme ? 'bg-gray-900 text-white' : 'bg-purple-50 text-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-8">
        {/* <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkTheme(!darkTheme)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
              darkTheme ? 'bg-purple-600 text-white' : 'bg-purple-200 text-purple-900'
            }`}
          >
            Toggle Theme
          </button>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className={`col-span-1 transition-all duration-300 ${
            darkTheme ? 'bg-gray-800 text-white' : 'bg-white'
          }`}>
            <div className="p-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-purple-500 transition-transform duration-300 hover:scale-105"
                  />
                  <div className={`absolute -top-2 rounded-md -right-2 ${getStatusColor(user.status)}`}>
                    {user.status}
                  </div>
                </div>
                <h2 className="mt-4 text-2xl font-bold">{user.name}</h2>
                <div className="mt-2" variant="outline">{user.role}</div>
              </div>
            </div>
          </div>

          {/* Details Card */}
          <div className={`col-span-1 lg:col-span-2 transition-all duration-300 ${
            darkTheme ? 'bg-gray-800 text-white' : 'bg-white'
          }`}>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="text-purple-500" />
                    <div>
                      <p className="text-sm opacity-70">Email</p>
                      <p className="font-medium">{user.email}</p>
                      {user.verify_email && (
                        <div className="mt-1 text-green-500">Verified</div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="text-purple-500" />
                    <div>
                      <p className="text-sm opacity-70">Mobile</p>
                      <p className="font-medium">{user.mobile}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="text-purple-500" />
                    <div>
                      <p className="text-sm opacity-70">Addresses</p>
                      <p className="font-medium">{user.address_details.length} saved</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <ShoppingBag className="text-purple-500" />
                    <div>
                      <p className="text-sm opacity-70">Orders</p>
                      <p className="font-medium">{user.orderHistory.length} orders</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="text-purple-500" />
                    <div>
                      <p className="text-sm opacity-70">Last Login</p>
                      <p className="font-medium">
                        {new Date(user.last_login_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <User className="text-purple-500" />
                    <div>
                      <p className="text-sm opacity-70">Member Since</p>
                      <p className="font-medium">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;