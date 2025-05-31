// Utility functions for handling product ID formatting

/**
 * Format integer product ID to display format (e.g., 1 -> "P001")
 * @param {number} productId - Integer product ID from database
 * @returns {string} - Formatted product ID (e.g., "P001")
 */
export const formatProductId = (productId) => {
  if (!productId) return '';
  return `P${String(productId).padStart(3, '0')}`;
};

/**
 * Extract integer ID from formatted product ID (e.g., "P001" -> 1)
 * @param {string} formattedId - Formatted product ID (e.g., "P001")
 * @returns {number} - Integer product ID
 */
export const parseProductId = (formattedId) => {
  if (!formattedId || typeof formattedId !== 'string') return null;
  const match = formattedId.match(/^P(\d+)$/);
  return match ? parseInt(match[1], 10) : null;
};

/**
 * Create product display text combining formatted ID and name
 * @param {object} product - Product object with product_id and product_name
 * @returns {string} - Display text (e.g., "P001 - Product Name")
 */
export const getProductDisplayText = (product) => {
  if (!product || !product.product_id || !product.product_name) return '';
  return `${formatProductId(product.product_id)} - ${product.product_name}`;
};

/**
 * Create product display text with price
 * @param {object} product - Product object with product_id, product_name, and price
 * @returns {string} - Display text (e.g., "P001 - Product Name - Rs. 100")
 */
export const getProductDisplayTextWithPrice = (product) => {
  if (!product || !product.product_id || !product.product_name) return '';
  const baseText = getProductDisplayText(product);
  return product.price ? `${baseText} - Rs. ${product.price}` : baseText;
};