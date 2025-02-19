import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useUser } from '../context/userContext';
import { getUserOrders } from '../lib/getUserOrders';
import { Package, Clock, XCircle, CheckCircle, TruckIcon, RefreshCcw } from 'lucide-react';
import { updateStatus } from '../helper/orderFunctionality';
import { toast } from 'react-toastify';

const MyOrders = () => {
  const { darkTheme } = useUser();
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);
  const [orderFilter, setOrderFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('this week');
  const [OrderedProducts, setOrderedProducts] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Process order data
  useEffect(() => {

    // //console.log("orderedData coming : ", OrderedProducts)
    const processedOrders = OrderedProducts.flatMap((order) =>
      order.product_details.map((product) => ({
        orderId: order.orderId,
        date: new Date(order.createdAt).toLocaleDateString('de-DE', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }),
        price: product.price * product.quantity,
        status: order.delivery_status || "confirmed",
        productName: product.name,
        productId: product.productId[0]?._id,
        image: product.productId[0]?.images[0] || '/api/placeholder/200/200',
        quantity: product.quantity,
        estimatedDelivery: new Date(order.createdAt).setDate(new Date(order.createdAt).getDate() + 5)
      }))
    );

    let filteredOrders = processedOrders;
    // //console.log("processed data : ", processedOrders)
    
    if (orderFilter !== 'all') {
      filteredOrders = filteredOrders.filter(order => order.status === orderFilter);
    }
    // //console.log('filtered Orders : ', filteredOrders)
    const now = new Date();

    // switch (timeFilter) {
    //   case 'this week':
    //     const weekAgo = new Date(now.setDate(now.getDate() - 7));
    //     filteredOrders = filteredOrders.filter(order => new Date(order.date) >= weekAgo);
    //     break;
    //   case 'this month':
    //     const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
    //     filteredOrders = filteredOrders.filter(order => new Date(order.date) >= monthAgo);
    //     break;
    // }
  
    setOrderData(filteredOrders);
  }, [OrderedProducts, orderFilter, timeFilter]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?._id) {
        try {
          setLoading(true);
          const response = await getUserOrders(user._id);
          setOrderedProducts(response.data.orders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOrders();
  }, [user]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pre-order':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'in-transit':
        return <TruckIcon className="h-5 w-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'in-transit':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleConfirmOrder = async (order) => {
    //console.log('Confirming order:', order);
  };

  const handleCancelOrder = async (order) => {
    //console.log('Cancelling order:', order);
    updateStatus( order.orderId,'cancelled')
    .then((res)=>{
      toast.success('Your order has been Cancelled!')
      // //console.log(res);
      // setOrderedProducts(res.data);
    })
    .catch(()=>{
      toast.info('Order can not be Cancelled!')
    })
    setShowCancelDialog(false);
    setSelectedOrder(null);
  };

  const CancelDialog = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
        <div className={`relative z-50 w-full max-w-md p-6 rounded-lg shadow-xl ${darkTheme ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-medium mb-2">Cancel Order</h3>
          <p className="text-gray-500 mb-4">Are you sure you want to cancel this order? This action cannot be undone.</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              No, keep it
            </button>
            <button
              onClick={() => handleCancelOrder(selectedOrder)}
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
            >
              Yes, cancel order
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className={`${darkTheme ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">My Orders</h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={orderFilter}
              onChange={(e) => setOrderFilter(e.target.value)}
              className={`rounded-lg px-4 py-2 ${
                darkTheme 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-white border-gray-300'
              } border`}
            >
              <option value="all">All Orders</option>
              <option value="pre-order">Pre-order</option>
              <option value="in-transit">In Transit</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className={`rounded-lg px-4 py-2 ${
                darkTheme 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-white border-gray-300'
              } border`}
            >
              <option value="this week">This Week</option>
              <option value="this month">This Month</option>
              <option value="last 3 months">Last 3 Months</option>
              <option value="last 6 months">Last 6 Months</option>
              <option value="this year">This Year</option>
            </select>
          </div>
        </div>
              
             
        {orderData.length > 0 ? (
          <div className="grid gap-6">
            {orderData.map((order) => (
              <div 
                key={order.productId
                } 
                className={`p-6 rounded-lg shadow-sm ${darkTheme ? 'bg-gray-700' : 'bg-white'}`}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-32">
                    <img
                      src={order.image}
                      alt={order.productName}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{order.productName}</h3>
                        <p className="text-sm text-gray-500">Order ID: {order.orderId}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-2 md:mt-0">
                        {getStatusIcon(order.status)}
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Order Date</p>
                        <p className="font-semibold">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Quantity</p>
                        <p className="font-semibold">{order.quantity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="font-semibold">₹{order.price.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Estimated Delivery</p>
                        <p className="font-semibold">{new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to={`/product-detail/${order.productId}`}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        View Details
                      </Link>

                      {order.status !== "confirmed" && order.status !== "cancelled" && (
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowCancelDialog(true);
                          }}
                          className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                        >
                          Cancel Order
                        </button>
                      )}

                      {order.status === "confirmed" && (
                        <button
                          onClick={() => handleConfirmOrder(order)}
                          className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                        >
                          <RefreshCcw className="w-4 h-4 mr-2" />
                          Order Again
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Package className="mx-auto h-16 w-16 text-gray-400" />
            <h3 className="mt-4 text-2xl font-semibold">No Orders Found</h3>
            <p className="mt-2 text-gray-500">Looks like you haven't placed any orders yet.</p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
      <CancelDialog 
        isOpen={showCancelDialog} 
        onClose={() => {
          setShowCancelDialog(false);
          setSelectedOrder(null);
        }} 
      />
    </div>
  );
};

export default MyOrders;