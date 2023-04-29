const validateForm = (formData) => {
    let errors = {};
    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }
    if (!formData.type.trim()) {
      errors.type = "Property type is required";
    }
    if (!formData.address.trim()) {
      errors.address = "Address is required";
    }
    if (!formData.price.trim()) {
      errors.price = "Price is required";
    } else if (!/^\d+$/.test(formData.price.trim())) {
      errors.price = "Price must be a number";
    }
    if (!formData.location.trim()) {
      errors.location = "Location is required";
    }
    if (!formData.image.trim()) {
      errors.image = "Image URL is required";
    } else if (!/^https?:\/\/\S+$/.test(formData.image.trim())) {
      errors.image = "Invalid image URL";
    }
    return errors;
  };
  
  export default validateForm;
  