import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress ,getAddress } from "../lib/Address";
import { toast } from "react-toastify";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";
import { createOrders } from "../helper/productFuntionality";
const CheakOutPage = () => {

  const items = useSelector((state) => state.cart.items);

  const { darkTheme } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    address_line: "",
    city: "",
    state: "",
    pincode: "",
  });

  
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1);
  const [finalItems, setFinalItems] = useState(items);
  const [financeData,setFinanceData] = useState({
    tax : 0,
    total : 0,
    sub_total : 0,
    discount : 0
  });

  const fetchAddress = async ()=>{
    try {
       let addData = await getAddress();
       //console.log(addData)

       if(addData && addData.length !== 0)
       {
          setAddresses(addData);
          setSelectedAddressIndex(addData[0]);
       }
      else{
        //console.log('no address found!')
      }

       return addData;
    } catch (e) {
      //console.log("unable to fetch addresses.")
      return [];
    }
  }
  const [selectedPayment, setSelectedPayment] = useState("card");

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.id);
  };

  const handelPayment = async () => {
    if (addresses.length === 0) {
      toast.info("Please add an address before proceeding!");
      return;
    }
  
    if (selectedAddressIndex === -1) {
      toast.info("No address selected!");
      return;
    }
  
    if (selectedPayment === "cod") {
      try {
        let data = {
          Uid: user._id,
          Pid: "1234",
          PType: "COD",
          status: "Pending",
          addressId: addresses[selectedAddressIndex]._id,
        };
        await createOrders(data);
        dispatch(clearCart());
        navigate("/thank-you");
        setTimeout(() => {
          navigate("/myorders");
        }, 4000);
      } catch (e) {
        console.log("Error:", e);
      }
    } else {
      toast.info("We are not receiving online payments now!");
    }
  };
  
  useEffect(() => {

   fetchAddress();
    setFinalItems(items);
    const taxRate = 4; 
    const discountRate = 20;
    const sub_total = items.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
    const discount = (sub_total * discountRate) / 100;
    const tax = ((sub_total - discount) * taxRate) / 100;
    const total = sub_total - discount + tax;
  
    setFinanceData({
      tax: " ₹"+tax.toFixed(2),
      sub_total:" ₹" +sub_total.toFixed(2),
      discount:" ₹"+ discount.toFixed(2),
      total: " ₹"+total.toFixed(2),
    });
  }, [items]);
  
  


  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form validation
  const validateForm = () => {
    const {
      firstName,
      lastName,
      email,
      mobile,
      address_line,
      city,
      state,
      pincode,
    } = formData;
    if (
      !firstName ||
      !lastName ||

      !mobile ||
      !address_line ||
      !city ||
      !state ||
      !pincode
    ) {
      toast.info("All fields are required!");
      return false;
    }
    // if (!/^\S+@\S+\.\S+$/.test(email)) {
    //   toast.info("Enter a valid email address!");
    //   return false;
    // }
    if (!/^\d{10}$/.test(mobile)) {
      toast.info("Enter a valid 10-digit mobile number!");
      return false;
    }
    return true;
  };

  const user = useSelector((state)=>state.user.user);

  // Add address to the list
  const handleAddressSubmit = async(e) => {
     e.preventDefault();
    if (!validateForm()) return;

    
        addAddress({...formData,user : user._id, email : user.email})
        .then(()=>{
          toast.success(`Address added succesfully!`);
          setAddresses((prev) => [
            ...prev,
            {
              ...formData,
              id: Date.now(),
            },
          ]);
          setSelectedAddressIndex(0);
        })
        .catch((e)=>{
          //console.log('some error : ', e);
          toast.error(`Address Not Added !`);
        })

    
 

    // Reset address fields
    
    // setFormData((prev) => ({
    //   ...prev,
    //   address_line: "",
    //   city: "",
    //   state: "",
    //   pincode: "",
    // }));
  };

  return (
    <>
      <section>
      <div className={`font-[sans-serif] p-8 ${darkTheme ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"}`}>
  <h2 className="text-2xl font-bold">Complete Your Order</h2>
  <form className="mt-8" onSubmit={handleAddressSubmit}>
    <h3 className="text-base mb-4">Personal Details</h3>
    <div className="grid md:grid-cols-2 gap-4">
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        className={`px-4 py-3 w-full text-sm rounded-md focus:outline-pink-600 ${darkTheme ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"}`}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        className={`px-4 py-3 w-full text-sm rounded-md focus:outline-pink-600 ${darkTheme ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"}`}
      />
      <input
        type="email"
        name="email"
        disabled
        placeholder="Email"
        value={`${user.email}`}
        onChange={handleChange}
        className={`px-4 py-3 w-full text-sm rounded-md focus:outline-pink-600 ${darkTheme ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"}`}
      />
      <input
        type="number"
        name="mobile"
        placeholder="Mobile No."
        value={formData.mobile}
        onChange={handleChange}
        className={`px-4 py-3 w-full text-sm rounded-md focus:outline-pink-600 ${darkTheme ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"}`}
      />
    </div>

    <h3 className="text-base mt-8 mb-4">Shipping Address</h3>
    <div className="grid md:grid-cols-2 gap-4">
      <input
        type="text"
        name="address_line"
        placeholder="Address Line"
        value={formData.address_line}
        onChange={handleChange}
        className={`px-4 py-3 w-full text-sm rounded-md focus:outline-pink-600 ${darkTheme ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"}`}
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        className={`px-4 py-3 w-full text-sm rounded-md focus:outline-pink-600 ${darkTheme ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"}`}
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
        className={`px-4 py-3 w-full text-sm rounded-md focus:outline-pink-600 ${darkTheme ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"}`}
      />
      <input
        type="text"
        name="pincode"
        placeholder="Zip Code"
        value={formData.pincode}
        onChange={handleChange}
        className={`px-4 py-3 w-full text-sm rounded-md focus:outline-pink-600 ${darkTheme ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"}`}
      />
    </div>

    <button
      type="submit"
      className={`mt-8 rounded-md px-6 py-3 w-full hover:bg-purple-700 ${darkTheme ? "bg-purple-600 text-gray-100" : "bg-purple-400 text-black"}`}
    >
      + Add Address
    </button>
  </form>

  <h3 className="text-lg font-bold mt-12">Your Addresses</h3>
  <div className="mt-4 space-y-4">
    {addresses.length > 0 ? (
      addresses.map((address, index) => (
        <div
          key={address.id}
          onClick={() => setSelectedAddressIndex(index)}
          className={`p-4 border rounded-md cursor-pointer ${
            selectedAddressIndex === index
              ? darkTheme
                ? "bg-pink-500"
                : "bg-pink-200"
              : darkTheme
              ? "bg-gray-800"
              : "bg-gray-100"
          }`}
        >
          <p className="text-sm font-medium">
            {address.address_line}, {address.city}, {address.state} - {address.pincode}
          </p>
        </div>
      ))
    ) : (
      <div className="text-red-500 font-bold text-xl">No address found!</div>
    )}
  </div>
</div>


        <div
  className={`font-[sans-serif] lg:flex lg:items-center lg:justify-center lg:h-screen max-lg:py-4 ${
    darkTheme ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
  }`}
>
  <div
    className={`${
      darkTheme ? "bg-gray-800 text-gray-100" : "bg-purple-100"
    } p-8 w-full max-lg:max-w-xl mx-auto rounded-md`}
  >
    <h2
      className={`text-3xl font-extrabold text-center ${
        darkTheme ? "text-gray-100" : "text-gray-800"
      }`}
    >
      Payment Summary
    </h2>

    <div className="grid lg:grid-cols-3 gap-6 max-lg:gap-8 mt-16">
      <div className="lg:col-span-2">
        <h3
          className={`text-lg font-bold ${
            darkTheme ? "text-gray-100" : "text-gray-800"
          }`}
        >
          Choose your payment method
        </h3>

        <div className="grid gap-4 sm:grid-cols-2 mt-8">
          {/* Card Payment Option */}
          <div
            className={`flex items-center justify-center rounded-lg px-2 py-4 ${
              darkTheme
                ? "bg-gray-700 text-gray-100"
                : "bg-gray-100 text-gray-800"
            } ${selectedPayment === "card" ? "ring-2 ring-blue-500" : ""}`}
          >
            <input
              type="radio"
              name="payment"
              className="w-6 h-6 cursor-pointer"
              id="card"
              checked={selectedPayment === "card"}
              onChange={handlePaymentChange}
            />
            <label htmlFor="card" className="ml-4 flex gap-2 cursor-pointer">
              <img
                src="https://readymadeui.com/images/visa.webp"
                className="w-12"
                alt="Visa Card"
              />
              <img
                src="https://readymadeui.com/images/american-express.webp"
                className="w-12"
                alt="American Express Card"
              />
              <img
                src="https://readymadeui.com/images/master.webp"
                className="w-12"
                alt="MasterCard"
              />
            </label>
          </div>

          {/* Cash On Delivery Option */}
          <div
            className={`flex items-center justify-center space-x-2 rounded-lg px-4 py-8 ${
              darkTheme
                ? "bg-gray-700 text-gray-100"
                : "bg-gray-100 text-gray-800"
            } ${selectedPayment === "cod" ? "ring-2 ring-blue-500" : ""}`}
          >
            <input
              type="radio"
              name="payment"
              className="w-6 h-6 cursor-pointer"
              id="cod"
              checked={selectedPayment === "cod"}
              onChange={handlePaymentChange}
            />
            <label htmlFor="cod" className="font-bold text-lg cursor-pointer">
              Cash On Delivery
            </label>
          </div>
        </div>

        <form className="mt-8">
          <div className="grid sm:col-span-2 sm:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Name of card holder"
                className={`px-4 py-3.5 w-full text-sm border rounded-md outline-none ${
                  darkTheme
                    ? "bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-500"
                    : "bg-white text-gray-800 focus:border-[#007bff]"
                }`}
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Postal code"
                className={`px-4 py-3.5 w-full text-sm border rounded-md outline-none ${
                  darkTheme
                    ? "bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-500"
                    : "bg-white text-gray-800 focus:border-[#007bff]"
                }`}
              />
            </div>
            {/* Other input fields */}
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <button
              type="button"
              onClick={handelPayment}
              className={`px-7 py-3.5 text-sm tracking-wide rounded-md ${
                
                  
                 "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              {selectedPayment === 'cod' ? 'Proceed further ' :' Proceed to pay '} -&gt;
            </button>
          </div>
        </form>
      </div>

      <div
        className={`p-6 rounded-md max-lg:-order-1 ${
          darkTheme ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
        }`}
      >
        <h3 className="text-lg font-bold">Summary</h3>

        <div
          className={`mt-6 space-y-4 sm:h-52 overflow-y-scroll rounded-md shadow-md scrollbar-thin ${
            darkTheme
              ? "bg-gray-700 text-gray-100 scrollbar-thumb-gray-600 scrollbar-track-gray-800"
              : "bg-gray-100 text-gray-800 scrollbar-thumb-gray-400 scrollbar-track-gray-200"
          }`}
        >
          {finalItems.map((product) => (
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 flex shrink-0 bg-gray-300 rounded-md">
                <img
                  src={product.productId.images[0] }
                  className="w-full object-contain"
                  alt={product.productId.name}
                />
              </div>
              <div className="w-full">
                <h4 className="text-sm font-bold">
                  {product.productId.name}
                </h4>
                <ul className="text-xs mt-2 space-y-1">
                  <li className="flex justify-between">
                    <span>Quantity:</span>
                    <span>{product.quantity}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Price:</span>
                    <span>{product.productId.price}</span>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>

        <hr className="my-6" />
        <ul className="mt-6 space-y-3">
          <li className="flex flex-wrap gap-4 text-sm">
            Sub total{" "}
            <span className="ml-auto font-bold">{financeData.sub_total}</span>
          </li>
          <li className="flex flex-wrap gap-4 text-sm">
            Discount (20%){" "}
            <span className="ml-auto font-bold">{financeData.discount}</span>
          </li>
          <li className="flex flex-wrap gap-4 text-sm">
            Tax <span className="ml-auto font-bold">{financeData.tax}</span>
          </li>
          <hr />
          <li className="flex flex-wrap gap-4 text-base font-bold">
            Total <span className="ml-auto">{financeData.total}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

      </section>
   
    </>
  );
};

export default CheakOutPage;
