import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addtoCart, removeFromCart } from "../redux/slices/cartSlice"; // Update the import paths based on your project structure

const MyCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleIncrement = (item) => {
    dispatch(addtoCart(item));
  };

  const handleDecrement = (item) => {
    dispatch(removeFromCart(item)); // This action should reduce the quantity or remove the item if quantity becomes 0
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart({ ...item, quantity: item.quantity })); // Remove all instances of the item
  };

  return (
    <div className="font-sans md:max-w-4xl max-md:max-w-xl mx-auto bg-white py-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
          <h2 className="text-2xl font-bold text-gray-800">Cart</h2>
          <hr className="border-gray-300 mt-4 mb-8" />

          <div className="space-y-4">
            {cart.items.map((item) => (
              <div className="grid grid-cols-3 items-center gap-4" key={item._id}>
                <div className="col-span-2 flex items-center gap-4">
                  <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                    <img
                      src={item.image || "https://via.placeholder.com/150"}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-gray-800">{item.name}</h3>
                    <h6
                      className="text-xs text-red-500 cursor-pointer mt-0.5"
                      onClick={() => handleRemove(item)}
                    >
                      Remove
                    </h6>

                    <div className="flex gap-4 mt-4">
                      <button
                        type="button"
                        onClick={() => handleDecrement(item)}
                        className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
                      >
                        -
                      </button>

                      <span className="mx-2.5">{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() => handleIncrement(item)}
                        className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="ml-auto">
                  <h4 className="text-base font-bold text-gray-800">
                    ${(item.totalPrice || item.price * item.quantity).toFixed(2)}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-100 rounded-md p-4 md:sticky top-0">
          <div className="flex border border-blue-600 overflow-hidden rounded-md">
            <input
              type="text"
              placeholder="Promo code"
              className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-2.5"
            />
            <button
              type="button"
              className="flex items-center justify-center font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 px-4 text-sm text-white"
            >
              Apply
            </button>
          </div>

          <ul className="text-gray-800 mt-8 space-y-4">
            <li className="flex flex-wrap gap-4 text-base">
              Discount <span className="ml-auto font-bold">$0.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-base">
              Shipping <span className="ml-auto font-bold">$2.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-base">
              Tax <span className="ml-auto font-bold">$4.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-base font-bold">
              Total <span className="ml-auto">${cart.totalPrice.toFixed(2)}</span>
            </li>
          </ul>

          <div className="mt-8 space-y-2">
            <button
              type="button"
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Checkout
            </button>
            <button
              type="button"
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
