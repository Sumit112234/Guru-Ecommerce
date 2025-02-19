let backendUrl = import.meta.env.VITE_APP_SERVER_URL;

export const addProductAPI = async (formData) => {
    //console.log("Sending FormData:", formData);

    const response = await fetch(backendUrl + "product/add-product", {
        method: "POST",
        body: formData 
    });

    return response.json();
};


export const updateProductAPI = async (id, productData) => {
    const response = await fetch(`${backendUrl}product/update-product/${id}`, {
        method: "PUT",
        body: productData, 
    });

    return response.json();
};

export const addReview = async (id, review) => {
    const response = await fetch(`${backendUrl}product/add-review/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(review),
    });

    return response.json();
};



export const deleteProductAPI = async (id) => {
    //console.log(id);
    const response = await fetch(`${backendUrl}product/delete-product/${id}`, {
        method: "post"
    });
    return response.json();
    // http://localhost:8759/api/product/get-product
};

export const getProductAPI = async () => {
    const response = await fetch(backendUrl+"products");
    return response.json();
};

export const createOrders = async (data) => {
    //console.log("data from createOrders : ", data)
    let order = {
        userId: data.Uid,
        payment_id: data.Pid,
        payment_status: data.status,
        delivery_address: data.addressId, 
      }
    try {
      const response = await fetch(backendUrl+"product/add-orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
        },
        credentials: 'include',
        body: JSON.stringify(order),
    } );
  
      if (response) {
        //console.log("Order Created Successfully", response);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };
  

