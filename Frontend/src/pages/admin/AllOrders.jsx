import React, { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import { getOrders } from "../../lib/getOrders";
import { updateStatus } from "../../helper/orderFunctionality";
import {toast} from 'react-toastify';
import { Link } from "react-router-dom";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { format } from "date-fns";

const AllOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Last 30 days");
  const [statusFilter, setStatusFilter] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { darkTheme, user } = useUser();

  useEffect(() => {
    getOrders()
      .then((data) => {
        //console.log(data.data.data)
        setOrders(data.data.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);


  
  const format = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleStatusChange = async(orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId ? { ...order, delivery_status: newStatus } : order
      )
    );

    updateStatus(orderId,newStatus)
    .then(()=>{
      toast.success('Status Updated!');
    })
    .catch((e)=>{
      //console.log(e)
      toast.error('Unable to update status.');
    })

  };

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product_details.some(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesStatus = statusFilter
      ? order.delivery_status === statusFilter
      : true;

    return matchesSearch && matchesStatus;
  });

  const OrderDetailsModal = ({ order, isOpen, onClose }) => {
    if (!order) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className={`relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-lg shadow-xl ${
          darkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Modal content */}
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">
              Order Details - {order.orderId}
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Order Information</h3>
                  <p>Date: {format(order.createdAt)}</p>
                  <p>Status: {order.delivery_status}</p>
                  <p>Payment Status: {order.payment_status}</p>
                  <p>Payment ID: {order.payment_id}</p>
                  <Link to={`/A-userDetails/${order.userId}`}><p>User ID: {order.userId}</p></Link>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Amount Details</h3>
                  <p>Subtotal: ₹{order.subTotalAmt}</p>
                  <p>Total Amount: ₹{order.totalAmt}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Products</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className={`${darkTheme ? "bg-gray-700" : "bg-gray-50"}`}>
                      <tr>
                        <th className="px-4 py-2 text-left">Product</th>
                        <th className="px-4 py-2 text-right">Price</th>
                        <th className="px-4 py-2 text-right">Quantity</th>
                        <th className="px-4 py-2 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {order.product_details.map((product, index) => (
                        <tr key={index} className={`${
                          darkTheme ? "hover:bg-gray-700" : "hover:bg-gray-50"
                        }`}>
                          {/* {//console.log(product)} */}
                         <Link to={`/product-detail/${product.productId}`}> <td className="px-4 py-2">{product.name}</td></Link>
                          <td className="px-4 py-2 text-right">₹{product.price}</td>
                          <td className="px-4 py-2 text-right">{product.quantity}</td>
                          <td className="px-4 py-2 text-right">
                            ₹{product.price * product.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`main min-h-screen w-full px-6 py-10 transition-colors duration-300 ease-in-out ${
        darkTheme ? "bg-gradient-to-b from-[#110820] to-[#1a1033]" : "bg-gradient-to-b from-white to-gray-50"
      }`}
    >
      <div className="text-center mb-12">
        <h1
          className={`font-bold text-5xl mb-4 tracking-tight ${
            darkTheme ? "text-white" : "text-gray-900"
          } transition-all duration-300 hover:scale-105 transform`}
        >
          All Orders
        </h1>
        <p className={`text-lg ${darkTheme ? "text-gray-300" : "text-gray-600"}`}>
          Manage and track orders efficiently
        </p>
      </div>

      <div className="max-w-7xl mx-auto bg-opacity-80 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4">
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`inline-flex items-center transition-all duration-200 ${
                    darkTheme
                      ? "text-white bg-gray-800 hover:bg-gray-700 focus:ring-gray-600"
                      : "text-gray-900 bg-white hover:bg-gray-50 focus:ring-gray-200"
                  } focus:outline-none focus:ring-2 font-medium rounded-lg text-sm px-4 py-2.5 shadow-sm`}
                >
                  {selectedFilter}
                  <svg
                    className={`w-2.5 h-2.5 ms-2.5 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div
                    className={`absolute z-10 w-48 mt-2 rounded-lg shadow-lg transition-all duration-200 transform ${
                      darkTheme ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <ul className="py-2">
                      {["Last day", "Last 7 days", "Last 30 days", "Last month", "Last year"].map(
                        (filter) => (
                          <li key={filter}>
                            <button
                              onClick={() => {
                                setSelectedFilter(filter);
                                setDropdownOpen(false);
                              }}
                              className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${
                                darkTheme
                                  ? "text-gray-300 hover:bg-gray-700"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {filter}
                            </button>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`transition-all duration-200 rounded-lg px-4 py-2.5 shadow-sm ${
                  darkTheme
                    ? "bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-600"
                    : "bg-white text-gray-900 hover:bg-gray-50 focus:ring-gray-200"
                } focus:outline-none focus:ring-2`}
              >
                <option value="">All Status</option>
                {["pending", "delivered", "cancelled", "in-transit"].map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2.5 rounded-lg transition-all duration-200 w-80 shadow-sm ${
                  darkTheme
                    ? "bg-gray-800 text-white placeholder-gray-400 focus:ring-gray-600"
                    : "bg-white text-gray-900 placeholder-gray-500 focus:ring-gray-200"
                } focus:outline-none focus:ring-2`}
              />
              <svg
                className={`absolute left-3 top-3 w-4 h-4 ${
                  darkTheme ? "text-gray-400" : "text-gray-500"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className={`text-xs uppercase tracking-wider ${
                    darkTheme ? "bg-gray-800 text-gray-200" : "bg-gray-50 text-gray-700"
                  }`}
                >
                  <th className="px-6 py-4 font-semibold">Order ID</th>
                  <th className="px-6 py-4 font-semibold">Products</th>
                  <th className="px-6 py-4 font-semibold">Total Amount</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order, index) => (
                  <tr
                    key={order.orderId}
                    onClick={() => handleRowClick(order)}
                    className={`transition-all duration-200 transform hover:scale-[1.01] cursor-pointer ${
                      darkTheme
                        ? "bg-gray-800/50 hover:bg-gray-700/50 text-white"
                        : "bg-white hover:bg-gray-50 text-gray-900"
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <td className="px-6 py-4 font-mono">{order.orderId}</td>
                    <td className="px-6 py-4">
                      {order.product_details.map(p => p.name).join(", ")}
                    </td>
                    <td className="px-6 py-4 font-semibold">₹{order.totalAmt}</td>
                    <td className="px-6 py-4">
                      {format(new Date(order.createdAt), 'PP')}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.delivery_status}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleStatusChange(order.orderId, e.target.value);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                          order.delivery_status === "cancelled"
                            ? "bg-red-100 text-red-800 hover:bg-red-200"
                            : order.delivery_status === "delivered"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : order.delivery_status === "in-transit"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                        }`}
                      >
                        {["pending", "delivered", "cancelled", "in-transit"].map((status) => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrder(null);
        }}
      />
    </div>
  );
};

export default AllOrders;