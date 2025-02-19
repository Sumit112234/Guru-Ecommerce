import React, { useState } from 'react';

const AddProductsTodatabase = () => {
  const [product, setProduct] = useState({
    name: '',
    images: [],
    category: '',
    unit: '1',
    stock: 0,
    price: 0,
    discount: 0,
    ratings: 5,
    tags: '',
    description: '',
    more_details: {},
    publish: true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}product/add-product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
      if (response.status) {
        alert('Product added successfully');
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding product');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Images</label>
          <input
            type="text"
            name="images"
            value={product.images}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
       
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Unit</label>
          <input
            type="text"
            name="unit"
            value={product.unit}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Stock</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Discount</label>
          <input
            type="number"
            name="discount"
            value={product.discount}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Ratings</label>
          <input
            type="number"
            name="ratings"
            value={product.ratings}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Tags</label>
          <input
            type="text"
            name="tags"
            value={product.tags}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">More Details</label>
          <textarea
            name="more_details"
            value={product.more_details}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Publish</label>
          <input
            type="checkbox"
            name="publish"
            checked={product.publish}
            onChange={() => setProduct((prevProduct) => ({ ...prevProduct, publish: !prevProduct.publish }))}
            className="form-checkbox"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 transition duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductsTodatabase;
