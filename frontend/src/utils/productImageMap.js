// frontend/src/utils/productImageMap.js
// Maps product names to their corresponding image paths
// Provides default images for products in the inventory
const productImageMap = {
  // Vegetables
  'beetroot': '/product-images/Beetroot.jpeg',
  'broccoli': '/product-images/Broccoli.jpeg',
  'cabbage': '/product-images/Cabbage.jpeg',
  'capsicum': '/product-images/Capsicum.jpeg',
  'carrot': '/product-images/Carrot.jpeg',
  'cauliflower': '/product-images/Cauliflower.jpeg',
  'cucumber': '/product-images/Cucumber.jpeg',
  'garlic': '/product-images/Garlic.jpeg',
  'okra': '/product-images/Okra.jpeg',
  'onion': '/product-images/Onion.jpeg',
  'peas': '/product-images/Peas.jpeg',
  'potato': '/product-images/Potato.jpeg',
  'pumpkin': '/product-images/Pumpkin.jpeg',
  'raddish': '/product-images/Raddish.jpeg',
  'tomato': '/product-images/Tomato.jpeg',
  'lettuce': '/product-images/Lettuce.jpeg',

  // Fruits
  'apple': '/product-images/Apple.jpeg',
  'banana': '/product-images/Banana.jpeg',
  'cherry': '/product-images/Cherry.jpeg',
  'coconut': '/product-images/Coconut.jpeg',
  'grapes': '/product-images/Grapes.jpeg',
  'guava': '/product-images/Guava.jpeg',
  'kiwi': '/product-images/Kiwi.jpeg',
  'lychee': '/product-images/Lychee.jpeg',
  'mango': '/product-images/Mango.jpeg',
  'orange': '/product-images/Orange.jpeg',
  'papaya': '/product-images/Papaya.jpeg',
  'peach': '/product-images/Peach.jpeg',
  'pineapple': '/product-images/Pineapple.jpeg',
  'plum': '/product-images/Plum.jpeg',
  'pomegranate': '/product-images/Pomegranate.jpeg',
  'rasberry': '/product-images/Rasberry.jpeg',
  'strawberry': '/product-images/Strawberry.jpeg',
  'watermelon': '/product-images/Watermelon.jpeg',

  // Dairy
  'butter': '/product-images/Butter.jpeg',
  'curd': '/product-images/Curd.jpeg',
  'ghee': '/product-images/Ghee.jpeg',
  'milk': '/product-images/Milk.jpeg',
  'paneer': '/product-images/Paneer.jpeg',
  'icecream': '/product-images/Icecream.jpeg',

  // Grains & Others
  'maida': '/product-images/Maida.jpeg',
  'pulses': '/product-images/Pulses.jpeg',
  'rice': '/product-images/Rice.jpeg',
  'wheat': '/product-images/Wheat.jpeg'
};

  
  export const getProductImage = (productName) => {
    const normalizedName = productName.toLowerCase().trim();
    return productImageMap[normalizedName] || '/product-images/default.png';
  };
  
  export default productImageMap;