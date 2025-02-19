export const getFormData = (pro) =>{

    const formData = new FormData();
    formData.append("name", pro.name);
    formData.append("category", pro.category);
    formData.append("unit", pro.unit);
    formData.append("stock", pro.stock);
    formData.append("price", pro.price);
    formData.append("discount", pro.discount);
    formData.append("description", pro.description);
    formData.append("ratings", pro.ratings);
    formData.append("reviews", pro.reviews);
  
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
        
    return formData;
}