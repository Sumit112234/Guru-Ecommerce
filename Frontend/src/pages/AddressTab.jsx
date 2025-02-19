import React, { useState } from 'react';
import { MapPin, Save, X, Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

const backendUrl = import.meta.env.VITE_APP_SERVER_URL;

// Add New Address Form Component
const AddressForm = ({ 
  address = { 
    address_line: '', 
    city: '', 
    state: '', 
    pincode: '', 
    country: 'India', 
    mobile: '' 
  }, 
  onSubmit, 
  onCancel, 
  darkTheme, 
  isEdit = false 
}) => {
  const [formData, setFormData] = useState(address);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.address_line) newErrors.address_line = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.pincode) newErrors.pincode = 'Pincode is required';
    if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
    else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Mobile must be 10 digits';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className={`p-4 rounded-lg shadow-lg ${darkTheme ? 'bg-gray-700' : 'bg-white'} mb-4`}>
      <h3 className="text-lg font-medium mb-4">{isEdit ? 'Edit Address' : 'Add New Address'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className={`block text-sm font-medium mb-2 ${darkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              Address Line
            </label>
            <input
              type="text"
              name="address_line"
              value={formData.address_line}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg border ${
                darkTheme 
                  ? 'bg-gray-800 border-gray-600 text-gray-300' 
                  : 'bg-purple-50 border-purple-200 text-gray-900'
              } ${errors.address_line ? 'border-red-500' : ''}`}
              placeholder="Street address, apartment, suite, etc."
            />
            {errors.address_line && <p className="text-red-500 text-xs mt-1">{errors.address_line}</p>}
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg border ${
                darkTheme 
                  ? 'bg-gray-800 border-gray-600 text-gray-300' 
                  : 'bg-purple-50 border-purple-200 text-gray-900'
              } ${errors.city ? 'border-red-500' : ''}`}
              placeholder="City"
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg border ${
                darkTheme 
                  ? 'bg-gray-800 border-gray-600 text-gray-300' 
                  : 'bg-purple-50 border-purple-200 text-gray-900'
              } ${errors.state ? 'border-red-500' : ''}`}
              placeholder="State"
            />
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              Pincode
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg border ${
                darkTheme 
                  ? 'bg-gray-800 border-gray-600 text-gray-300' 
                  : 'bg-purple-50 border-purple-200 text-gray-900'
              } ${errors.pincode ? 'border-red-500' : ''}`}
              placeholder="Pincode"
            />
            {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg border ${
                darkTheme 
                  ? 'bg-gray-800 border-gray-600 text-gray-300' 
                  : 'bg-purple-50 border-purple-200 text-gray-900'
              }`}
              placeholder="Country"
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              Mobile Number
            </label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg border ${
                darkTheme 
                  ? 'bg-gray-800 border-gray-600 text-gray-300' 
                  : 'bg-purple-50 border-purple-200 text-gray-900'
              } ${errors.mobile ? 'border-red-500' : ''}`}
              placeholder="10-digit mobile number"
            />
            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              darkTheme 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            } transition-colors`}
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white transition-colors"
          >
            <Save className="w-4 h-4" />
            {isEdit ? 'Update Address' : 'Save Address'}
          </button>
        </div>
      </form>
    </div>
  );
};

// Delete Confirmation Modal
const DeleteConfirmationModal = ({ address, onConfirm, onCancel, darkTheme }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className={`w-full max-w-md p-6 rounded-lg shadow-lg ${darkTheme ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className="text-lg font-semibold mb-4">Delete Address</h3>
        <p className={`mb-6 ${darkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
          Are you sure you want to delete this address?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className={`px-4 py-2 rounded-lg ${
              darkTheme
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            } transition-colors`}
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(address._id)}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced AddressCard Component
const AddressCard = ({ address, onEdit, onDelete, darkTheme }) => (
  <div className={`mb-4 rounded-lg shadow ${darkTheme ? 'bg-gray-700' : 'bg-white'}`}>
    <div className="p-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 mt-1" />
            <div>
              <p>{address.address_line}</p>
              <p>{address.city}, {address.state} {address.pincode}</p>
              <p>{address.country}</p>
              <p className="mt-1">Phone: {address.mobile}</p>
            </div>
          </div>
        </div>
        <div className="space-x-2">
          <button 
            onClick={() => onEdit(address)}
            className={`px-4 py-2 text-sm rounded-lg border ${
              darkTheme 
                ? 'border-gray-600 hover:bg-gray-600' 
                : 'border-gray-300 hover:bg-gray-100'
            } transition-colors`}
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(address)}
            className="px-4 py-2 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
);

// API functions for address management
const addressAPI = {
  addAddress: async (addressData) => {
    try {
      const response = await fetch(`${backendUrl}user/addAddress`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(addressData),
      });
      return await response.json();
    } catch (error) {
      console.error("Error adding address:", error);
      throw error;
    }
  },
  
  updateAddress: async (addressId, addressData) => {
    try {
      const response = await fetch(`${backendUrl}user/update-address/${addressId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(addressData),
      });
      return await response.json();
    } catch (error) {
      console.error("Error updating address:", error);
      throw error;
    }
  },
  
  deleteAddress: async (addressId) => {
    try {
      const response = await fetch(`${backendUrl}user/delete-address/${addressId}`, {
        method: "DELETE",
        credentials: "include",
      });
      return await response.json();
    } catch (error) {
      console.error("Error deleting address:", error);
      throw error;
    }
  },
};

// Updated Addresses Tab Component
const AddressesTab = ({ user, setUser, darkTheme }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [deletingAddress, setDeletingAddress] = useState(null);

  const handleAddAddress = async (addressData) => {
    try {
      const response = await addressAPI.addAddress(addressData);
      if (response.status) {
        toast.success('Address added successfully');
        // Update the user state to include the new address
        setUser({
          ...user,
          address_details: [...(user.address_details || []), response.data]
        });
        setShowAddForm(false);
      } else {
        toast.error(response.message || 'Failed to add address');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
  };

  const handleUpdateAddress = async (addressData) => {
    try {
      const response = await addressAPI.updateAddress(editingAddress._id, addressData);
      if (response.status) {
        toast.success('Address updated successfully');
        // Update the user's addresses list
        setUser({
          ...user,
          address_details: user.address_details.map(addr => 
            addr._id === editingAddress._id ? response.data : addr
          )
        });
        setEditingAddress(null);
      } else {
        toast.error(response.message || 'Failed to update address');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleDeleteAddress = (address) => {
    setDeletingAddress(address);
  };

  const confirmDeleteAddress = async (addressId) => {
    try {
      const response = await addressAPI.deleteAddress(addressId);
      if (response.status) {
        toast.success('Address deleted successfully');
        // Remove the deleted address from the user's addresses list
        setUser({
          ...user,
          address_details: user.address_details.filter(addr => addr._id !== addressId)
        });
        setDeletingAddress(null);
      } else {
        toast.error(response.message || 'Failed to delete address');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className={`rounded-lg ${darkTheme ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          <h3 className="text-lg font-medium">Saved Addresses</h3>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg ${
            darkTheme 
              ? 'bg-purple-600 hover:bg-purple-700 text-white' 
              : 'bg-purple-500 hover:bg-purple-600 text-white'
          } transition-colors`}
        >
          <Plus className="w-4 h-4" /> Add New Address
        </button>
      </div>

      {/* Add Address Form */}
      {showAddForm && (
        <AddressForm 
          onSubmit={handleAddAddress} 
          onCancel={() => setShowAddForm(false)} 
          darkTheme={darkTheme}
        />
      )}

      {/* Edit Address Form */}
      {editingAddress && (
        <AddressForm 
          address={editingAddress} 
          onSubmit={handleUpdateAddress} 
          onCancel={() => setEditingAddress(null)} 
          darkTheme={darkTheme}
          isEdit={true}
        />
      )}

      {/* Address List */}
      {user.address_details && user.address_details.length > 0 ? (
        <div className="space-y-4">
          {user.address_details.map((address) => (
            <AddressCard 
              key={address._id} 
              address={address} 
              onEdit={handleEditAddress}
              onDelete={handleDeleteAddress}
              darkTheme={darkTheme}
            />
          ))}
        </div>
      ) : (
        <p className={`text-center py-8 ${darkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
          No addresses saved. Add your first address!
        </p>
      )}

      {/* Delete Confirmation Modal */}
      {deletingAddress && (
        <DeleteConfirmationModal 
          address={deletingAddress} 
          onConfirm={confirmDeleteAddress} 
          onCancel={() => setDeletingAddress(null)} 
          darkTheme={darkTheme}
        />
      )}
    </div>
  );
};

export { AddressesTab };