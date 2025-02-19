import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useUser } from '../context/userContext';
import { Edit2, Save, X, MapPin, ShoppingBag, Clock, Truck, Calendar, CreditCard, PlusCircle } from 'lucide-react';
import { getUser } from '../lib/getUser';
import { addUser } from '../redux/slices/userSlice';
import { updateUser } from '../helper/userFunctionality';
import { toast } from 'react-toastify';
import { AddressesTab } from './AddressTab';

const MyAccount = () => {
  const { darkTheme } = useUser();
  const [user, setUser] = useState(useSelector((state) => state.user.user));
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [activeTab, setActiveTab] = useState('profile');
  const dispatch = useDispatch();

  const [hover, setHover] = useState(false);
  const fileInputRef = useRef(null);

  // Handle Image Upload & Profile Update
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    let data = await updateUser(formData);
    if (data) {
      toast.success(data);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let user = await getUser();
        dispatch(addUser(user?.data?.user));
        setUser(user?.data?.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleEdit = () => {
    setEditedUser(user);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await updateUser(editedUser);
      setUser(editedUser);
      setIsEditing(false);
      toast.success(response);
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error("Unable to update user");
    }
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${darkTheme ? 'bg-gray-900 text-white' : 'bg-purple-50 text-gray-900'}`}>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const OrderCard = ({ order }) => (
    <div className={`mb-4 rounded-lg shadow ${darkTheme ? 'bg-gray-700' : 'bg-white'}`}>
      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold">Order #{order.orderId}</h4>
              <span className={`px-2 py-1 text-xs rounded-full ${
                order.delivery_status === 'Delivered'
                  ? 'bg-green-100 text-green-800'
                  : order.delivery_status === 'Processing'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {order.delivery_status}
              </span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Ordered on {formatDate(order.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                <span>{order.payment_type} - {order.payment_status}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>Quantity: {order.quantity}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 md:text-right">
            <p className="font-semibold">₹{order.totalAmt}</p>
            <Link to={'/myorders'} className={`mt-10 px-4 py-2 text-sm rounded-lg border ${
              darkTheme
                ? 'border-gray-600 hover:bg-gray-600'
                : 'border-gray-300 hover:bg-gray-100'
            } transition-colors`}>
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen py-8 ${darkTheme ? 'bg-gray-900 text-white' : 'bg-purple-50 text-gray-900'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className={`rounded-lg shadow-lg ${darkTheme ? 'bg-gray-800' : 'bg-white'} overflow-hidden`}>
          {/* Header */}
          <div className={`p-6 ${darkTheme ? 'border-b border-gray-700' : 'border-b border-purple-100'}`}>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">My Account</h1>
              {activeTab === 'profile' && !isEditing && (
                <button
                  onClick={handleEdit}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    darkTheme
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'bg-purple-500 hover:bg-purple-600'
                  } text-white transition-colors`}
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className={`flex border-b ${darkTheme ? 'border-gray-700' : 'border-purple-100'}`}>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'profile'
                  ? darkTheme
                    ? 'border-b-2 border-purple-500 text-purple-500'
                    : 'border-b-2 border-purple-500 text-purple-600'
                  : darkTheme
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'orders'
                  ? darkTheme
                    ? 'border-b-2 border-purple-500 text-purple-500'
                    : 'border-b-2 border-purple-500 text-purple-600'
                  : darkTheme
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'addresses'
                  ? darkTheme
                    ? 'border-b-2 border-purple-500 text-purple-500'
                    : 'border-b-2 border-purple-500 text-purple-600'
                  : darkTheme
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Addresses
            </button>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Profile Picture */}
                <div className="relative flex items-center space-x-4">
                  {/* Profile Image Circle */}
                  <div
                    className="relative w-24 h-24 rounded-full border-4 border-purple-200 flex items-center justify-center overflow-hidden cursor-pointer"
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={() => fileInputRef.current.click()}
                  >
                    {user.avatar ? (
                      <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl font-bold text-purple-500">{user.name?.[0] || "U"}</span>
                    )}

                    {/* Plus Icon on Hover */}
                    {hover && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <PlusCircle className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleImageUpload}
                  />

                  {/* User Info */}
                  <div>
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className={`${darkTheme ? "text-gray-400" : "text-gray-600"}`}>{user.role}</p>
                  </div>
                </div>

                {/* Profile Information */}
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${darkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser.name}
                        onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                        className={`w-full p-2 rounded-lg ${
                          darkTheme
                            ? 'bg-gray-700 border-gray-600'
                            : 'bg-purple-50 border-purple-200'
                        } border`}
                      />
                    ) : (
                      <p className="p-2">{user.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <p className="p-2">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Mobile</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editedUser.mobile}
                        onChange={(e) => setEditedUser({ ...editedUser, mobile: e.target.value })}
                        className={`w-full p-2 rounded-lg ${
                          darkTheme
                            ? 'bg-gray-700 border-gray-600'
                            : 'bg-purple-50 border-purple-200'
                        } border`}
                      />
                    ) : (<p className="p-2">{user.mobile || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <p className={`inline-block px-3 py-1 rounded-full text-sm ${
                      user.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : user.status === 'Inactive'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </p>
                  </div>
                </div>

                {/* Account Information */}
                <div className={`mt-6 p-4 rounded-lg ${darkTheme ? 'bg-gray-700' : 'bg-purple-50'}`}>
                  <h3 className="text-lg font-medium mb-4">Account Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className={`text-sm ${darkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Last Login</p>
                      <p>{new Date(user.last_login_date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className={`text-sm ${darkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Member Since</p>
                      <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {/* Edit Mode Buttons */}
                {isEditing && (
                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      onClick={handleCancel}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                        darkTheme
                          ? 'bg-gray-700 hover:bg-gray-600'
                          : 'bg-gray-200 hover:bg-gray-300'
                      } transition-colors`}
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div className={`rounded-lg ${darkTheme ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <ShoppingBag className="w-5 h-5" />
                  <h3 className="text-lg font-medium">Order History</h3>
                </div>
                {user.orderHistory && user.orderHistory.length > 0 ? (
                  <div className="space-y-4">
                    {user.orderHistory.map((order) => (
                      <OrderCard key={order.orderId} order={order} />
                    ))}
                  </div>
                ) : (
                  <p className={`text-center py-8 ${darkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                    No orders found
                  </p>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <AddressesTab 
                user={user} 
                setUser={setUser} 
                darkTheme={darkTheme} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;


// import React, { useState, useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { useUser } from '../context/userContext';
// import { Edit2, Save, X, MapPin, ShoppingBag, Clock, Truck, Calendar, CreditCard  } from 'lucide-react';
// import { getUser } from '../lib/getUser';
// import { addUser } from '../redux/slices/userSlice';
// import { updateUser } from '../helper/userFunctionality';
// import { toast } from 'react-toastify';
// import { PlusCircle } from "lucide-react";
// import { AddressesTab } from './AddressTab';

// const MyAccount = () => {
//   const { darkTheme } = useUser();
//   const [user, setUser] = useState(useSelector((state)=>state.user.user));
//   //console.log(user);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedUser, setEditedUser] = useState({});
//   const [activeTab, setActiveTab] = useState('profile');
//   const dispatch = useDispatch();

//   const [hover, setHover] = useState(false);
//   const fileInputRef = useRef(null);

//   // Handle Image Upload & Profile Update
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("avatar", file);

//     let data = await updateUser(formData);
//     if(data)
//     {
//       toast.success(data);
//     }
//     // try {
//     //   const response = await fetch("http://localhost:8759/api/user/update", {
//     //     method: "PUT",
//     //     credentials: "include",
//     //     body: formData, // Send as FormData
//     //   });

//     //   const data = await response.json();
//     //   if (data.status) {
//     //     setUser((prev) => ({ ...prev, avatar: data.data.avatar })); // Update user state
//     //   }
//     // } catch (error) {
//     //   console.error("Error uploading image:", error);
//     // }
//   };


//   useEffect(() => {

    
//     const fetchUser = async () => {
//       try {
       
//             let user = await getUser();
//             dispatch(addUser(user?.data?.user));
//             setUser(user?.data?.user);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = async () => {
//     try {
      
//       //console.log(editedUser);
//       const response = await updateUser(editedUser);
//       // const data = await response.json();

//         setUser(editedUser);
//         setIsEditing(false);
//         toast.success(response);

      
//     } catch (error) {
//       console.error('Error updating user:', error);
//       toast.error("Unable to update user");
//     }
//   };

//   const handleCancel = () => {
//     setEditedUser(user);
//     setIsEditing(false);
//   };

//   if (loading) {
//     return (
//       <div className={`min-h-screen ${darkTheme ? 'bg-gray-900 text-white' : 'bg-purple-50 text-gray-900'}`}>
//         <div className="flex justify-center items-center h-screen">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
//         </div>
//       </div>
//     );
//   }


//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const OrderCard = ({ order }) => (
//     <div className={`mb-4 rounded-lg shadow ${darkTheme ? 'bg-gray-700' : 'bg-white'}`}>
//       <div className="p-4">
//         <div className="flex flex-col md:flex-row justify-between">
//           <div className="flex-1">
//             <div className="flex items-center gap-2 mb-2">
//               <h4 className="font-semibold">Order #{order.orderId}</h4>
//               <span className={`px-2 py-1 text-xs rounded-full ${
//                 order.delivery_status === 'Delivered' 
//                   ? 'bg-green-100 text-green-800' 
//                   : order.delivery_status === 'Processing'
//                   ? 'bg-yellow-100 text-yellow-800'
//                   : 'bg-gray-100 text-gray-800'
//               }`}>
//                 {order.delivery_status}
//               </span>
//             </div>
//             <div className="space-y-1 text-sm">
//               <div className="flex items-center gap-2">
//                 <Calendar className="w-4 h-4" />
//                 <span>Ordered on {formatDate(order.createdAt)}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <CreditCard className="w-4 h-4" />
//                 <span>{order.payment_type} - {order.payment_status}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Truck className="w-4 h-4" />
//                 <span>Quantity: {order.quantity}</span>
//               </div>
//             </div>
//           </div>
//           <div className="mt-4 md:mt-0 md:text-right">
//             <p className="font-semibold">₹{order.totalAmt}</p>
//             <Link to={'/myorders'} className={`mt-10 px-4 py-2 text-sm rounded-lg border ${
//               darkTheme 
//                 ? 'border-gray-600 hover:bg-gray-600' 
//                 : 'border-gray-300 hover:bg-gray-100'
//             } transition-colors`}>
//               View Details
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   // const AddressCard = ({ address }) => (
//   //   <div className={`mb-4 rounded-lg shadow ${darkTheme ? 'bg-gray-700' : 'bg-white'}`}>
//   //     <div className="p-4">
//   //       <div className="flex justify-between items-start">
//   //         <div className="space-y-2">
//   //           <div className="flex items-start gap-2">
//   //             <MapPin className="w-5 h-5 mt-1" />
//   //             <div>
//   //               <p>{address.address_line}</p>
//   //               <p>{address.city}, {address.state} {address.pincode}</p>
//   //               <p>{address.country}</p>
//   //               <p className="mt-1">Phone: {address.mobile}</p>
//   //             </div>
//   //           </div>
//   //         </div>
//   //         <div className="space-x-2">
//   //           <button className={`px-4 py-2 text-sm rounded-lg border ${
//   //             darkTheme 
//   //               ? 'border-gray-600 hover:bg-gray-600' 
//   //               : 'border-gray-300 hover:bg-gray-100'
//   //           } transition-colors`}>
//   //             Edit
//   //           </button>
//   //           <button className="px-4 py-2 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors">
//   //             Delete
//   //           </button>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   </div>
//   // );


//   return (
//     <div className={`min-h-screen py-8 ${darkTheme ? 'bg-gray-900 text-white' : 'bg-purple-50 text-gray-900'}`}>
//       <div className="max-w-6xl mx-auto px-4">
//         <div className={`rounded-lg shadow-lg ${darkTheme ? 'bg-gray-800' : 'bg-white'} overflow-hidden`}>
//           {/* Header */}
//           <div className={`p-6 ${darkTheme ? 'border-b border-gray-700' : 'border-b border-purple-100'}`}>
//             <div className="flex items-center justify-between">
//               <h1 className="text-2xl font-bold">My Account</h1>
//               {activeTab === 'profile' && !isEditing && (
//                 <button
//                   onClick={handleEdit}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
//                     darkTheme 
//                       ? 'bg-purple-600 hover:bg-purple-700' 
//                       : 'bg-purple-500 hover:bg-purple-600'
//                   } text-white transition-colors`}
//                 >
//                   <Edit2 className="w-4 h-4" />
//                   Edit Profile
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Navigation Tabs */}
//           <div className={`flex border-b ${darkTheme ? 'border-gray-700' : 'border-purple-100'}`}>
//             <button
//               onClick={() => setActiveTab('profile')}
//               className={`px-6 py-3 font-medium transition-colors ${
//                 activeTab === 'profile'
//                   ? darkTheme
//                     ? 'border-b-2 border-purple-500 text-purple-500'
//                     : 'border-b-2 border-purple-500 text-purple-600'
//                   : darkTheme
//                     ? 'text-gray-400 hover:text-gray-200'
//                     : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               Profile
//             </button>
//             <button
//               onClick={() => setActiveTab('orders')}
//               className={`px-6 py-3 font-medium transition-colors ${
//                 activeTab === 'orders'
//                   ? darkTheme
//                     ? 'border-b-2 border-purple-500 text-purple-500'
//                     : 'border-b-2 border-purple-500 text-purple-600'
//                   : darkTheme
//                     ? 'text-gray-400 hover:text-gray-200'
//                     : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               Orders
//             </button>
//             <button
//               onClick={() => setActiveTab('addresses')}
//               className={`px-6 py-3 font-medium transition-colors ${
//                 activeTab === 'addresses'
//                   ? darkTheme
//                     ? 'border-b-2 border-purple-500 text-purple-500'
//                     : 'border-b-2 border-purple-500 text-purple-600'
//                   : darkTheme
//                     ? 'text-gray-400 hover:text-gray-200'
//                     : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               Addresses
//             </button>
//           </div>

//           {/* Content Area */}
//           <div className="p-6">
//             {activeTab === 'profile' && (
//               <div className="space-y-6">
//                 {/* Profile Picture */}
//                 <div className="relative flex items-center space-x-4">
//       {/* Profile Image Circle */}
//       <div
//         className="relative w-24 h-24 rounded-full border-4 border-purple-200 flex items-center justify-center overflow-hidden cursor-pointer"
//         onMouseEnter={() => setHover(true)}
//         onMouseLeave={() => setHover(false)}
//         onClick={() => fileInputRef.current.click()}
//       >
//         {user.avatar ? (
//           <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
//         ) : (
//           <span className="text-4xl font-bold text-purple-500">{user.name?.[0] || "U"}</span>
//         )}

//         {/* Plus Icon on Hover */}
//         {hover && (
//           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <PlusCircle className="w-8 h-8 text-white" />
//           </div>
//         )}
//       </div>

//       {/* Hidden File Input */}
//       <input
//         type="file"
//         accept="image/*"
//         ref={fileInputRef}
//         className="hidden"
//         onChange={handleImageUpload}
//       />

//       {/* User Info */}
//       <div>
//         <h2 className="text-xl font-semibold">{user.name}</h2>
//         <p className={`${darkTheme ? "text-gray-400" : "text-gray-600"}`}>{user.role}</p>
//       </div>
//     </div>

//                 {/* Profile Information */}
//                 <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${darkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Name</label>
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         value={editedUser.name}
//                         onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
//                         className={`w-full p-2 rounded-lg ${
//                           darkTheme 
//                             ? 'bg-gray-700 border-gray-600' 
//                             : 'bg-purple-50 border-purple-200'
//                         } border`}
//                       />
//                     ) : (
//                       <p className="p-2">{user.name}</p>
//                     )}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Email</label>
//                     <p className="p-2">{user.email}</p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Mobile</label>
//                     {isEditing ? (
//                       <input
//                         type="number"
//                         value={editedUser.mobile}
//                         onChange={(e) => setEditedUser({ ...editedUser, mobile: e.target.value })}
//                         className={`w-full p-2 rounded-lg ${
//                           darkTheme 
//                             ? 'bg-gray-700 border-gray-600' 
//                             : 'bg-purple-50 border-purple-200'
//                         } border`}
//                       />
//                     ) : (
//                       <p className="p-2">{user.mobile || 'Not provided'}</p>
//                     )}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Status</label>
//                     <p className={`inline-block px-3 py-1 rounded-full text-sm ${
//                       user.status === 'Active'
//                         ? 'bg-green-100 text-green-800'
//                         : user.status === 'Inactive'
//                         ? 'bg-gray-100 text-gray-800'
//                         : 'bg-red-100 text-red-800'
//                     }`}>
//                       {user.status}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Account Information */}
//                 <div className={`mt-6 p-4 rounded-lg ${darkTheme ? 'bg-gray-700' : 'bg-purple-50'}`}>
//                   <h3 className="text-lg font-medium mb-4">Account Information</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <p className={`text-sm ${darkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Last Login</p>
//                       <p>{new Date(user.last_login_date).toLocaleDateString()}</p>
//                     </div>
//                     <div>
//                       <p className={`text-sm ${darkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Member Since</p>
//                       <p>{new Date(user.createdAt).toLocaleDateString()}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Edit Mode Buttons */}
//                 {isEditing && (
//                   <div className="flex justify-end space-x-4 mt-6">
//                     <button
//                       onClick={handleCancel}
//                       className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
//                         darkTheme 
//                           ? 'bg-gray-700 hover:bg-gray-600' 
//                           : 'bg-gray-200 hover:bg-gray-300'
//                       } transition-colors`}
//                     >
//                       <X className="w-4 h-4" />
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleSave}
//                       className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white transition-colors"
//                     >
//                       <Save className="w-4 h-4" />
//                       Save Changes
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//    <div className="p-6">
//       {activeTab === 'orders' && (
//         <div className={`rounded-lg ${darkTheme ? 'bg-gray-800' : 'bg-white'}`}>
//           <div className="flex items-center gap-2 mb-4">
//             <ShoppingBag className="w-5 h-5" />
//             <h3 className="text-lg font-medium">Order History</h3>
//           </div>
//           {user.orderHistory
//  && user.orderHistory
//  .length > 0 ? (
//             <div className="space-y-4">
//               {user.orderHistory
// .map((order) => (
//                 <OrderCard key={order.orderId} order={order} />
//               ))}
//             </div>
//           ) : (
//             <p className={`text-center py-8 ${darkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
//               No orders found
//             </p>
//           )}
//         </div>
//       )}

//       {activeTab === 'addresses' && (
//         <div className={`rounded-lg ${darkTheme ? 'bg-gray-800' : 'bg-white'}`}>
//           <div className="flex justify-between items-center mb-4">
//             <div className="flex items-center gap-2">
//               <MapPin className="w-5 h-5" />
//               <h3 className="text-lg font-medium">Saved Addresses</h3>
//             </div>
//             <button className={`px-4 py-2 text-sm rounded-lg border ${
//               darkTheme 
//                 ? 'border-gray-600 hover:bg-gray-600' 
//                 : 'border-gray-300 hover:bg-gray-100'
//             } transition-colors`}>
//               Add New Address
//             </button>
//           </div>
//           {user.address_details && user.address_details.length > 0 ? (
//             <div className="space-y-4">
//               {user.address_details.map((address, index) => (
//                 <AddressCard key={index} address={address} />
//               ))}
//             </div>
//           ) : (
//             <p className={`text-center py-8 ${darkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
//               No addresses saved
//             </p>
//           )}
//         </div>
//       )}
//     </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyAccount;