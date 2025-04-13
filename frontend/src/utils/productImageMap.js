// frontend/src/utils/productImageMap.js
const productImageMap = {
    // Vegetables
    'tomato': '/product-images/tomato.jpg',
    'tamatar': '/product-images/tomato.jpg',
    'potato': '/product-images/potato.png',
    'aalu': '/product-images/potato.png',
    'onion': '/product-images/onion.png',
    'pyaaz': '/product-images/onion.png',
    
    // Fruits
    'apple': '/product-images/apple.png',
    'seb': '/product-images/apple.png',
    'banana': '/product-images/banana.png',
    'kela': '/product-images/banana.png',
    
    // Dairy
    'milk': '/product-images/milk.png',
    'doodh': '/product-images/milk.png',
    
    // Grains
    'rice': '/product-images/rice.png',
    'chawal': '/product-images/rice.png',
    'wheat': '/product-images/wheat.png',
    'gehun': '/product-images/wheat.png'
  };
  
  export const getProductImage = (productName) => {
    const normalizedName = productName.toLowerCase().trim();
    return productImageMap[normalizedName] || '/product-images/default.png';
  };
  
  export default productImageMap;