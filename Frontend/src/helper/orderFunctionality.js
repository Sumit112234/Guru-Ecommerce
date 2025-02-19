let backendUrl = import.meta.env.VITE_APP_SERVER_URL;

export const updateStatus = async (orderId, status) => {
    

    const response = await fetch(backendUrl + "admin/update-status", {
        credentials: "include",
        headers: {
            "Content-Type": "application/json", 
        },
        method: "POST",
        body: JSON.stringify({orderId, status}) ,
    });

    return response.json();
};


// export const updateProductAPI = async (id, productData) => {
//     const response = await fetch(`${backendUrl}product/update-product/${id}`, {
//         method: "PUT",
//         body: productData, 
//     });

//     return response.json();
// };
