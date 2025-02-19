import React, { useState } from 'react';
import { 
  Pencil, Save, X, ImagePlus, Trash2, Star 
} from 'lucide-react';
import { useUser } from '../../context/userContext';

const ProductEditModal = ({  product, onClose, onSave , loading }) => {
  const { darkTheme } = useUser();
  const [editedProduct, setEditedProduct] = useState({
    ...product,
    // Ensure images is an array
    images: product.images || [],
    // Predefined categories and subcategories
    categories: ['Tea', 'Electronics', 'Clothing', 'Books', 'Furniture', 'Toys'],
    subcategories: {
      'Tea': ['Black Tea', 'Green Tea', 'Herbal Tea'],
      'Electronics': ['Computers', 'Phones', 'Accessories'],
      'Clothing': ['T-Shirts', 'Pants', 'Jackets'],
      'Books': ['Fiction', 'Non-Fiction', 'Educational'],
      'Furniture': ['Chairs', 'Tables', 'Sofas'],
      'Toys': ['Board Games', 'Action Figures', 'Educational Toys']
    },
    // Ensure rating is set
    rating: product.reviews && product.reviews.length > 0 
      ? Math.round(product.reviews.reduce((sum, review) => sum + review.ratings, 0) / product.reviews.length)
      : 0
  });
  

  // const handleImageUpload = (index, file) => {
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     const newImages = [...editedProduct.images];
  //     newImages[index] = reader.result;
  //     setEditedProduct(prev => ({
  //       ...prev,
  //       images: newImages
  //     }));
  //   };
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleImageUpload = (index, files) => {
    if (!files || files.length === 0) return;

    
    const imagePromises = Array.from(files).map(file => 
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      })
    );

    Promise.all(imagePromises)
      .then(images => {
        setEditedProduct(prev => {
          const updatedImages = [...prev.images];

          images.forEach((img, i) => {
            updatedImages[index + i] = img; // Insert at correct position
          });

          return { ...prev, images: updatedImages };
        });
      })
      .catch(error => console.error("Image upload error:", error));
};

  
  const addImageUploadBox = () => {
    if (editedProduct.images.length < 6) {
      setEditedProduct(prev => ({
        ...prev,
        images: [...prev.images, null] // Use null instead of empty string
      }));
    }
  };
  
  const removeImageUploadBox = (index) => {
    setEditedProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (e) => {
    setEditedProduct(prev => ({
      ...prev,
      category: e.target.value,
      subcategory: '' // Reset subcategory when main category changes
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editedProduct.name || !editedProduct.price || editedProduct.images.length === 0) {
      alert("Please fill all required fields and upload at least one image.");
      return;
  }
    onSave(editedProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 pt-72 p-4">
      <div className={`w-full max-w-4xl mx-auto rounded-xl shadow-2xl ${darkTheme ? 'bg-gray-800' : 'bg-white'}`}>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-3xl font-bold ${darkTheme ? 'text-purple-300' : 'text-purple-700'}`}>
              Edit Product
            </h2>
            <button 
              type="button" 
              onClick={onClose} 
              className="text-gray-500 hover:text-red-500"
            >
              <X size={32} />
            </button>
          </div>

          {/* Basic Product Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2">Product Name</label>
              <input 
                type="text"
                name="name"
                value={editedProduct.name}
                onChange={handleInputChange}
                className={`w-full p-3 rounded ${darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                required
              />
            </div>
            {/* <div>
              <label className="block mb-2">Category</label>
              <select
                value={editedProduct.category[0] || ''}
                onChange={handleCategoryChange}
                className={`w-full p-3 rounded ${darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                required
              >
                <option value="">Select Category</option>
                {editedProduct.categories.map(cat => (
                  <option onClick= key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div> */}
          </div>

          {/* Pricing and Stock */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block mb-2">Price</label>
              <input 
                type="number"
                name="price"
                value={editedProduct.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className={`w-full p-3 rounded ${darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                required
              />
            </div>
            <div>
              <label className="block mb-2">Stock</label>
              <input 
                type="number"
                name="stock"
                value={editedProduct.stock}
                onChange={handleInputChange}
                min="0"
                className={`w-full p-3 rounded ${darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                required
              />
            </div>
            <div>
              <label className="block mb-2">Discount (%)</label>
              <input 
                type="number"
                name="discount"
                value={editedProduct.discount || 0}
                onChange={handleInputChange}
                min="0"
                max="100"
                className={`w-full p-3 rounded ${darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2">Description</label>
            <textarea 
              name="description"
              value={editedProduct.description || ''}
              onChange={handleInputChange}
              rows={4}
              className={`w-full p-3 rounded ${darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
              required
            />
          </div>

          {/* Images Upload */}
          <div>
  <label className="block mb-4">Product Images</label>
  <div className="grid grid-cols-4 gap-4">
    {editedProduct.images.map((image, index) => (
      <div 
        key={index} 
        className="border-2 border-dashed rounded-lg p-2 dark:border-purple-600 
          flex flex-col items-center relative"
      >
        {image ? (
          <>
            <img 
              src={image} 
              alt={`Product ${index + 1}`} 
              className="w-full h-32 object-cover rounded-md aspect-square" 
            />
            <button
              type="button"
              onClick={() => removeImageUploadBox(index)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <Trash2 size={16} />
            </button>
          </>
        ) : (
          <ImagePlus 
            className="text-gray-400 dark:text-purple-500 w-12 h-12" 
          />
        )}
        <input 
          type="file" 
          accept="image/*"
          multiple
          onChange={(e) => handleImageUpload(index, e.target.files)}
          className="hidden" 
          id={`image-upload-${index}`}
        />
        <label 
          htmlFor={`image-upload-${index}`}
          className="mt-2 text-sm text-purple-600 cursor-pointer"
        >
          Upload Image
        </label>
      </div>
    ))}
    
    {editedProduct.images.length < 6 && (
      <div 
        onClick={addImageUploadBox}
        className="border-2 border-dashed rounded-lg p-2 dark:border-purple-600 
          flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50 
          dark:hover:bg-purple-900 transition-colors"
      >
        <Pencil className="text-purple-600 w-12 h-12" />
        <span className="text-sm text-purple-600 mt-2">
          Add More Images
        </span>
      </div>
    )}
  </div>
</div>

          {/* Additional Product Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2">Unit</label>
              <input 
                type="text"
                name="unit"
                value={editedProduct.unit || ''}
                onChange={handleInputChange}
                className={`w-full p-3 rounded ${darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
              />
            </div>
            <div>
              <label className="block mb-2">Rating</label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    size={24}
                    fill={star <= editedProduct.ratings ? "#FFD700" : "#CED5D8"}
                    onClick={() => setEditedProduct(prev => ({ ...prev, ratings: star }))}
                    className="cursor-pointer mr-1"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className={`flex items-center gap-2 px-6 py-3 
                bg-purple-600 text-white rounded-md 
                hover:bg-purple-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                // disabled={loading}
            >
              <Save size={20} />
              {loading ? <div className="inline-block h-6 sm:w-6 animate-spin rounded-full border-b-2 border-gray-900 border-t-2 "></div> : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditModal;