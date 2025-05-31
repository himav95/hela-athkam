// bulk order, custom order and craftsman request form validations.

export const validateRequired = (value) => {
  return value && value.toString().trim() !== '';
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[0-9]{10}$/;
  return re.test(phone);
};

export const validateNIC = (nic) => {
  // Validate both old (10 digits) and new (12 digits) NIC formats
  const re = /^([0-9]{9}[vVxX]|[0-9]{12})$/;
  return re.test(nic);
};

export const validateDate = (date) => {
  if (!date) return false;
  const selected = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selected > today;
};

export const validateQuantity = (quantity) => {
  return /^[1-9]\d*$/.test(quantity);
};

export const validateFileUpload = (files, required = true) => {
  if (!required) return true;
  return files && files.length > 0;
};

// Specific validation function for Bulk Orders is here.
export const validateBulkOrder = (formData) => {
  const errors = {};

  // Product ID validation
  if (!validateRequired(formData.productId)) {
    errors.productId = 'Product selection is required';
  }

  // Quantity validation
  if (!validateRequired(formData.quantity)) {
    errors.quantity = 'Quantity is required';
  } else if (!validateQuantity(formData.quantity)) {
    errors.quantity = 'Quantity must be a positive number';
  }

  // Delivery Date validation
  if (!validateRequired(formData.deliveryDate)) {
    errors.deliveryDate = 'Delivery date is required';
  } else if (!validateDate(formData.deliveryDate)) {
    errors.deliveryDate = 'Delivery date must be in the future';
  }

  // Delivery Option validation
  if (!validateRequired(formData.deliveryOption)) {
    errors.deliveryOption = 'Please select a delivery option';
  }

  // Comments validation (optional, but check length if provided)
  if (formData.comments && formData.comments.length > 500) {
    errors.comments = 'Comments cannot exceed 500 characters';
  }

  return errors;
};

// Specific validation function for Custom Orders is here.
export const validateCustomOrder = (formData) => {
  const errors = {};

  // Order Type validation
  if (!validateRequired(formData.orderType)) {
    errors.orderType = 'Order type is required';
  }

  if (formData.orderType === 'existing') {
    // Product ID validation for existing products
    if (!validateRequired(formData.productId)) {
      errors.productId = 'Product selection is required';
    }
  } else if (formData.orderType === 'custom') {
    // Product Name validation for custom designs
    if (!validateRequired(formData.productName)) {
      errors.productName = 'Product name is required';
    } else if (formData.productName.length > 100) {
      errors.productName = 'Product name cannot exceed 100 characters';
    }

    // Image Sketch validation for custom designs
    if (!formData.imageSketch) {
      errors.imageSketch = 'Design sketch/image is required for custom orders';
    } else {
      // Validate file size (10MB limit - matches backend)
      if (formData.imageSketch.size > 10 * 1024 * 1024) {
        errors.imageSketch = 'Image file size must be less than 10MB';
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(formData.imageSketch.type)) {
        errors.imageSketch = 'Please upload a valid image file (JPEG, PNG, GIF, WebP)';
      }
    }
  }

  // Quantity validation
  if (!validateRequired(formData.quantity)) {
    errors.quantity = 'Quantity is required';
  } else if (!validateQuantity(formData.quantity)) {
    errors.quantity = 'Quantity must be a positive number';
  }

  // Delivery Date validation
  if (!validateRequired(formData.deliveryDate)) {
    errors.deliveryDate = 'Delivery date is required';
  } else if (!validateDate(formData.deliveryDate)) {
    errors.deliveryDate = 'Delivery date must be in the future';
  }

  // Comments validation (optional, but check length if provided)
  if (formData.comments && formData.comments.length > 1000) {
    errors.comments = 'Comments cannot exceed 1000 characters';
  }

  return errors;
};

export const getValidationSchema = (formType) => {
  const commonFields = {
    name: { validate: validateRequired, message: 'Name is required!' },
    email: { validate: validateEmail, message: 'Invalid email address!' },
    phoneNumber: { validate: validatePhone, message: 'Invalid phone number (10 digits required!)' },
  };

  const bulkOrderSchema = {
    ...commonFields,
    product: { validate: validateRequired, message: 'Product selection is required' },
    productCategory: { validate: validateRequired, message: 'Product category is required!' },
    quantity: {
      validate: (value) => /^[1-9]\d*$/.test(value),
      message: 'Quantity must be a positive number'
    },
    deliveryDate: {
      validate: (date) => {
        if (!date) return false;
        const deliveryDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return deliveryDate > today;
      },
      message: 'Delivery date must be in the future'
    },
    deliveryOption: { validate: validateRequired, message: 'Please select a delivery option' }
  };

  const craftsmanSchema = {
    ...commonFields,
    nic: { validate: validateNIC, message: 'Invalid NIC format!' },
    address: { validate: validateRequired, message: 'Address is required!' },
    productName: { validate: validateRequired, message: 'Product name is required!' },
    productCategory: { validate: validateRequired, message: 'Product category is required!' },
    productImages: { validate: (files) => validateFileUpload(files, true), message: 'Product images are required!' },
    productDescription: { validate: validateRequired, message: 'Product description is required!' },
  };

  const customOrderSchema = {
    ...commonFields,
    images: { validate: validateFileUpload, message: "Image or sketch is required!"},
    orderDescription: { validate: validateRequired, message: 'Order description is required!' },
    quantity: {
      validate: (value) => /^[1-9]\d*$/.test(value),
      message: 'Quantity must be a positive number.'
    },
    deliveryDate: {
      validate: (date) => {
        if (!date) return false;
        const deliveryDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return deliveryDate > today;
      },
      message: 'Delivery date must be in the future.'
    },
    deliveryOption: { validate: validateRequired, message: 'Please select a delivery option.' }
  };

  switch (formType) {
    case 'bulk':
      return bulkOrderSchema;
    case 'craftsman':
      return craftsmanSchema;
    case 'custom':
      return customOrderSchema;
    default:
      return {};
  }
};

export const validateForm = (formData, formType) => {
  const schema = getValidationSchema(formType);
  const errors = {};

  Object.keys(schema).forEach((field) => {
    const validator = schema[field];
    if (!validator.validate(formData[field])) {
      errors[field] = validator.message;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};