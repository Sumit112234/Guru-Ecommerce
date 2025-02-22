import React, { useState } from 'react';
import { 
    Moon, Sun, ImagePlus, Save, Plus, Trash2
} from 'lucide-react';
import { useUser } from '../../context/userContext';
import { useSelector } from 'react-redux';
import { addProductAPI } from '../../helper/productFuntionality';
import { toast } from 'react-toastify';


// Shared Layout Component with Theme Toggle
const backendUrl = import.meta.env.VITE_APP_SERVER_URL;
const ProductLayout = ({ children, title }) => {
  const {darkTheme} = useUser();
  
  
  return (
    <div 
      className={`min-h-screen p-6 transition-colors duration-300 
        ${darkTheme 
          ? 'bg-gray-900 text-purple-100' 
          : 'bg-purple-50 text-gray-800'
        }`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-3xl font-bold ${darkTheme ? 'text-purple-300' : 'text-purple-700'}`}>
            {title}
          </h1>
        </div>
        {children}
      </div>
    </div>
  );
};

// Add Product Page
const AddProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    unit: '1',
    stock: 1,
    price: 0,
    discount: 0,
    description: '',
    images: ['']
  });
  const allCategories = useSelector((state) => state.products.products).flatMap((product) => product.category.map((cat) => cat));
  const categories = [...new Set(allCategories)];

  const [errors, setErrors] = useState({});

  // const categories = ['Electronics', 'Clothing', 'Books', 'Furniture', 'Toys'];
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };


  const handleImageUpload = (files, index) => {
    if (!files || files.length === 0) return;

    const imagePromises = Array.from(files).map(file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    });

    Promise.all(imagePromises).then(images => {
        setProductData(prev => {
            const updatedImages = [...prev.images]; // Copy existing images
            images.forEach((img, i) => {
                updatedImages[index + i] = img; // Insert images at correct indexes
            });

            return { ...prev, images: updatedImages };
        });
    }).catch(error => console.error("Image upload error:", error));

    //console.log("images from addProduct : ", productData.images);
};


  const handleMultipleImageUpload = (files) => {
    const fileArray = Array.from(files);
    const imagePromises = fileArray.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(results => {
      setProductData(prev => ({
        ...prev,
        images: [...prev.images, ...results].slice(0, 6) // Limit to 6 images
      }));
    });
  };


  const addImageUploadBox = () => {
    setProductData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImageUploadBox = (index) => {
    setProductData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!productData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    // Category validation
    if (!productData.category) {
      newErrors.category = 'Please select a category';
    }

    // Price validation
    if (productData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    // Stock validation
    if (productData.stock < 0) {
      newErrors.stock = 'Stock cannot be negative';
    }

    // Discount validation
    if (productData.discount < 0 || productData.discount > 100) {
      newErrors.discount = 'Discount must be between 0 and 100';
    }

    // Description validation
    if (!productData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    // Images validation
    const validImages = productData.images.filter(img => img.trim() !== '');
    if (validImages.length === 0) {
      newErrors.images = 'At least one image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productData.name || !productData.price || productData.images.length === 0) {
        alert("Please fill all required fields and upload at least one image.");
        return;
    }

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("category", productData.category);
    formData.append("unit", productData.unit);
    formData.append("stock", productData.stock);
    formData.append("price", productData.price);
    formData.append("discount", productData.discount);
    formData.append("description", productData.description);

    // Convert base64 images to file blobs
    productData.images.forEach((image, index) => {
        fetch(image)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], `image-${index + 1}.png`, { type: "image/png" });
                formData.append("images", file);
            })
            .catch(error => console.error("Error converting base64 to file:", error));
    });
  
    setTimeout(async () => {
      setLoading(true);
        try {
            const response = await fetch(`${backendUrl}product/add-product`, {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("Product added successfully!");
                setProductData({
                    images: []
                });
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Error submitting product:", error);
        }
        finally{
          setLoading(false);
        }
    }, 1000); // Delay to ensure all images are converted
};

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (validateForm()) {
//     const formData = new FormData();
//     formData.append("name", productData.name);
//     formData.append("category", productData.category);
//     formData.append("unit", productData.unit);
//     formData.append("stock", productData.stock);
//     formData.append("price", productData.price);
//     formData.append("discount", productData.discount);
//     formData.append("description", productData.description);

//     // Convert base64 images back to files and append to formData
//     productData.images.forEach((base64String, index) => {
//       const byteString = atob(base64String.split(',')[1]);
//       const mimeString = base64String.split(',')[0].split(':')[1].split(';')[0];
//       const ab = new ArrayBuffer(byteString.length);
//       const ia = new Uint8Array(ab);
      
//       for (let i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//       }
      
//       const blob = new Blob([ab], { type: mimeString });
//       const file = new File([blob], `image-${index}.${mimeString.split('/')[1]}`, { type: mimeString });
//       formData.append("images", file);
//     });

//     try {
//       await addProductAPI(formData);
//       toast.success("Product added successfully!");
//     } catch (error) {
//       //console.log("Some error occurred ", error);
//     }
//   } else {
//     alert('Please correct the errors in the form');
//   }
// };


  return (
    <ProductLayout title="Add New Product">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div>
              <label 
                className="block text-sm font-medium dark:text-purple-300 mb-2"
              >
                Product Name
              </label>
              <input 
                type="text" 
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md 
                  dark:bg-gray-700 dark:text-purple-100 
                  dark:border-purple-600 focus:ring-purple-500
                  ${errors.name ? 'border-red-500 dark:border-red-400' : ''}`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label 
                className="block text-sm font-medium dark:text-purple-300 mb-2"
              >
                Category
              </label>
              <select
                name="category"
                value={productData.category}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md 
                  dark:bg-gray-700 dark:text-purple-100 
                  dark:border-purple-600 focus:ring-purple-500
                  ${errors.category ? 'border-red-500 dark:border-red-400' : ''}`}
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
              )}
            </div>
          </div>

          {/* Images Upload */}
          <div className="grid grid-cols-3 gap-4">
  {productData.images.map((image, index) => (
    <div 
      key={index} 
      className="border-2 border-dashed rounded-lg p-2 
        dark:border-purple-600 flex flex-col items-center relative"
    >
      {image ? (
        <>
          <img 
            src={image} 
            alt={`Product ${index + 1}`} 
            className="w-full h-32 object-cover rounded-md" 
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
        <ImagePlus className="text-gray-400 dark:text-purple-500 w-12 h-12" />
      )}
      <input 
        type="file" 
        accept="image/*"
        multiple
        onChange={(e) => handleImageUpload(e.target.files, index)} // ✅ Pass index
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
  {productData.images.length < 6 && (
    <div 
      onClick={addImageUploadBox}
      className="border-2 border-dashed rounded-lg p-2 
        dark:border-purple-600 flex flex-col items-center 
        justify-center cursor-pointer hover:bg-purple-50 
        dark:hover:bg-purple-900 transition-colors"
    >
      <Plus className="text-purple-600 w-12 h-12" />
      <span className="text-sm text-purple-600 mt-2">
        Add More Images
      </span>
    </div>
  )}
</div>


          {/* Pricing and Stock */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label 
                className="block text-sm font-medium dark:text-purple-300 mb-2"
              >
                Price
              </label>
              <input 
                type="number" 
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md 
                  dark:bg-gray-700 dark:text-purple-100 
                  dark:border-purple-600 focus:ring-purple-500
                  ${errors.price ? 'border-red-500 dark:border-red-400' : ''}`}
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price}</p>
              )}
            </div>
            <div>
              <label 
                className="block text-sm font-medium dark:text-purple-300 mb-2"
              >
                Discount (%)
              </label>
              <input 
                type="number" 
                name="discount"
                value={productData.discount}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md 
                  dark:bg-gray-700 dark:text-purple-100 
                  dark:border-purple-600 focus:ring-purple-500
                  ${errors.discount ? 'border-red-500 dark:border-red-400' : ''}`}
              />
              {errors.discount && (
                <p className="text-red-500 text-xs mt-1">{errors.discount}</p>
              )}
            </div>
            <div>
              <label 
                className="block text-sm font-medium dark:text-purple-300 mb-2"
              >
                Stock
              </label>
              <input 
                type="number" 
                name="stock"
                value={productData.stock}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md 
                  dark:bg-gray-700 dark:text-purple-100 
                  dark:border-purple-600 focus:ring-purple-500
                  ${errors.stock ? 'border-red-500 dark:border-red-400' : ''}`}
              />
              {errors.stock && (
                <p className="text-red-500 text-xs mt-1">{errors.stock}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label 
              className="block text-sm font-medium dark:text-purple-300 mb-2"
            >
              Description
            </label>
            <textarea 
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md 
                dark:bg-gray-700 dark:text-purple-100 
                dark:border-purple-600 focus:ring-purple-500
                ${errors.description ? 'border-red-500 dark:border-red-400' : ''}`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            {/* <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 
                bg-purple-600 text-white rounded-md 
                hover:bg-purple-700 transition-colors"
            >
              <Save size={20} />
              Save Product
            </button> */}
            <button
                type="submit"
                className={`flex items-center gap-2 px-6 py-2 
                bg-purple-600 text-white rounded-md 
                hover:bg-purple-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                 {loading ? (
                  <div className="inline-block h-6 w-6 animate-spin rounded-full border-b-2 border-gray-900 border-t-2 "></div>
                ) : (
                  <div className='flex '>
                    <Save size={20} className='mr-2' />
                    Save Product
                  </div>
               )}
              </button>
          </div>
        </form>
      </div>
    </ProductLayout>
  );
};

export default AddProductPage;
