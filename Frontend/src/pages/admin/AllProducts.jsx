import React, { useState } from "react";
import { useUser } from "../../context/userContext";
import ProductEditModal from "./ProductEdit";
import { useSelector } from "react-redux";
// import { setProducts } from "../../redux/slices/productSlice";
import { Link } from "react-router-dom";
import { RefreshCcw } from "lucide-react";
import { deleteProductAPI, updateProductAPI } from "../../helper/productFuntionality";
const AllProducts = () => {

  const [loading ,setLoading] = useState(false);
  const [productData, setProductData] = useState(useSelector((state)=>state.products.products));
  const [products, setProducts] = useState(productData);
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [productToDeleteId, setProductToDeleteId] = useState('');
  const { darkTheme } = useUser();
  const [isDeleteModelVisible, setisDeleteModelVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isEditModelOpen, setisEditModelOpen] = useState(false);

  // State to store product data for editing
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleEditClick = (product) => {
    setCurrentProduct(product); // Set the product to be edited
    setisEditModelOpen(true); // Open the modal
  };

  // Handle modal close
  const handleCloseModal = () => {
    setisEditModelOpen(false);
    setCurrentProduct(null); // Clear current product
  };


  const refreshProducts = ()=>{
    // setProducts(useSelector((state)=>state.products.products));
    setProductData(productData)
  }

  const handleEditedProduct = (pro) => {
    // ////console.log(pro);
    setLoading(true);
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === pro._id
          ? { ...product, stock: pro.stock, name : pro.name, price : pro.price, discount : pro.discount, 
            description : pro.description, 
            image : pro.images,
            unit : pro.unit,
            ratings : pro.ratings

           }
          : product
      )
    );

      
     const formData = new FormData();
    formData.append("name", pro.name);
    formData.append("category", pro.category);
    formData.append("unit", pro.unit);
    formData.append("stock", pro.stock);
    formData.append("price", pro.price);
    formData.append("discount", pro.discount);
    formData.append("description", pro.description);
    formData.append("ratings", pro.ratings);
  
    // Convert base64 images to file blobs
    pro.images.forEach((image, index) => {
        if(image.startsWith('http'))
          {
            formData.append("uploadedImages", image);
          } 
          else{
            fetch(image)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], `image-${index + 1}.png`, { type: "image/png" });
                formData.append("images", file);
            })
            .catch(error => console.error("Error converting base64 to file:", error));
          }      
    });
    setTimeout(()=>{
      updateProductAPI(pro._id , formData)
      .then(()=>{
        setLoading(false);
      })
      .catch((e)=>{
        ////console.log(e);
        setLoading(false);
      })
      // ////console.log(formData);
    },[1000])

    



  }


  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Updated Product:", currentProduct);
    handleCloseModal(); // Close modal after submitting
  };

  const handleQuantityChange = (id, delta) => {
    ////console.log(id, delta );
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id
          ? { ...product, stock: Math.max(0, product.stock + delta) }
          : product
      )
    );
  };

  const handlePriceChange = (id, delta) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id
          ? { ...product, price: Math.max(0, product.price + delta) }
          : product
      )
    );
  };

  const handleDelete = (id) => {
    // setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    setProductToDeleteId(id);
    setisDeleteModelVisible(true);
  };

  // const handleDelete = (productId) => {
  //   setSelectedProduct(productId);
  // };

  const confirmDelete = async () => {
    
    setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productToDeleteId));
    await deleteProductAPI(productToDeleteId);
    setisDeleteModelVisible(false);
  };

  const cancelDelete = () => {
    setisDeleteModelVisible(false);
    setSelectedProduct(null);
  };

  const handleEdit = (id) => {
    alert(`Edit product with ID: ${id}`);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );


  useState(()=>{
    setProducts(productData);

    return ()=>setProducts(productData);
  },[productData ])


  return (

    <>
    <div className={`font-sans p-4 min-h-screen ${darkTheme ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
  <div className="w-full text-center py-8">
    <span className="font-bold text-4xl">All Products</span>
  </div>

  

  <div className="mb-4 flex justify-between items-center">
    <input
      type="date"
      className={`border px-3 py-2 rounded ${darkTheme ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black'}`}
      value={filterDate}
      onChange={(e) => setFilterDate(e.target.value)}
    />
    
        <input
          type="text"
          placeholder="Search..."
          className={`border px-3 py-2 rounded w-1/3 ${darkTheme ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black'}`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
    
    
  </div>
  <div className="flex justify-end px-3">
    <button onClick={refreshProducts} className="flex font-bold text-lg">Refresh <RefreshCcw/></button>
  </div>

  <table className={`min-w-full ${darkTheme ? 'bg-gray-800' : 'bg-white'}`}>
    <thead className={`${darkTheme ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-black'}`}>
      <tr>
        <th className="p-4 text-left">PRODUCT</th>
        <th className="p-4 text-left">PRICE</th>
        <th className="p-4 text-left">STOCK</th>
        <th className="p-4 text-left">RATINGS</th>
        <th className="p-4 text-left">ACTIONS</th>
      </tr>
    </thead>
    <tbody>
      {filteredProducts.map((product, idx) => (
        <tr key={idx} className={`border-t ${darkTheme ? 'border-gray-700' : 'border-gray-300'}`}>
          {/* {////console.log(product.images[0], product.images[0][0] , idx)} */}
          <Link to={`/product-detail/${product._id}`}>
          <td className="p-4 flex items-center">
            <img src={product?.images[0]} alt={product.name} className="w-10 h-10 mr-4" />
            {product.name}
          </td>
          </Link>
          <td className="p-4">
            <div className="flex items-center">
              <button
                className={`px-2 py-1 rounded mr-2 ${darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}
                onClick={() => handlePriceChange(product._id, -1)}
              >
                -
              </button>
              ${product.price}
              <button
                className={`px-2 py-1 rounded ml-2 ${darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}
                onClick={() => handlePriceChange(product._id, 1)}
              >
                +
              </button>
            </div>
          </td>
          <td className="p-4">
            <div className="flex items-center">
              <button
                className={`px-2 py-1 rounded mr-2 ${darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}
                onClick={() => handleQuantityChange(product._id, -1)}
              >
                -
              </button>
              {product.stock}
              <button
                className={`px-2 py-1 rounded ml-2 ${darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}
                onClick={() => handleQuantityChange(product._id, 1)}
              >
                +
              </button>
            </div>
          </td>
          <td>
            {[...Array((Math.floor(product.ratings) ? Math.floor(product.ratings) : 0))].map((rate, idx) => (
              <svg key={idx} className="w-4 h-4 inline" viewBox="0 0 14 13" fill="none">
                <path
                  className="fill-yellow-300"
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                />
              </svg>
            ))}
            {[...Array(5 - (Math.floor(product.ratings) ? Math.floor(product.ratings) : 0))].map((rate, idx) => (
              <svg key={idx} className="w-4 h-4 inline" viewBox="0 0 14 13" fill="none">
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" fill="#CED5D8" />
              </svg>
            ))}
          </td>
          <td className="p-4">
          <td class="p-4">
              <button class="mr-4" onClick={()=>handleEditClick(product)} title="Edit">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 fill-blue-500 hover:fill-blue-700"
                  viewBox="0 0 348.882 348.882">
                  <path
                    d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                    data-original="#000000" />
                  <path
                    d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                    data-original="#000000" />
                </svg>
              </button>
              <button class="mr-4" onClick={()=>handleDelete(product._id)} title="Delete">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
                  <path
                    d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                    data-original="#000000" />
                  <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                    data-original="#000000" />
                </svg>
              </button>
            </td>
            {/* <div className="relative">
              <button
                className={`px-2 py-1 rounded ${darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}
                onClick={() => {
                  const dropdown = document.getElementById(`dropdown-${product.id}`);
                  dropdown.classList.toggle("hidden");
                }}
              >
                ...
              </button>
              <div
                id={`dropdown-${product.id}`}
                className={`absolute right-0 mt-2 w-24 border rounded shadow ${
                  darkTheme ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                } hidden`}
              >
                <button className="block px-4 py-2 text-left w-full hover:bg-gray-600">Edit</button>
                <button className="block px-4 py-2 text-left w-full hover:bg-gray-600">Delete</button>
              </div>
            </div> */}
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {isDeleteModelVisible && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
          id="popup-modal"
        >
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 flex flex-col ">
          <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
            <div className="flex justify-center items-center space-y-8">
            <h3 className="text-lg font-normal text-gray-500 text-center w-2/3 dark:text-gray-400 mb-4">
              Are you sure you want to delete this product?
            </h3>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmDelete}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-4 py-2"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={cancelDelete}
                className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg px-4 py-2"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}


</div>
{isEditModelOpen && (
  <ProductEditModal  product={currentProduct} onClose={handleCloseModal} loading={loading} onSave={(item)=>handleEditedProduct(item)}/>
  )}
  </>
  );
};

export default AllProducts;
