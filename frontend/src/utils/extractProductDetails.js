// Extracts product details from voice input
// Processes and structures product information for database storage
export const extractProductDetails = async (inputText) => {
   const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

   const prompt = `
You are an expert in converting casual Hindi-English market phrases into structured data.

Extract the following fields:

stock: "low stock" if it contains "thode", "kam", etc. "in stock" by default or if it contains "bohot", "full", etc.

product: Translate to English (e.g., tamatar → tomato)

price: Numeric only (e.g., "sau" → 100)

unit: Standard unit like "kg", "Liter", "Dozen"

category: Choose from ["Vegetables", "Fruits", "Dairy", "Grains"] based on the product

Example:

Input: bohot tamatar sau rupya kilo  

Output:

{

  "stock": "in stock",
  "product": "Tomato",
  "price": 100,
  "unit": "kg",
  "category": "Vegetables"
}

ONLY PROVIDE THE JSON OBJECT FOR THIS DATA

Input: "${inputText}"
Output:
`;

   const requestPayload = {
      contents: [
         {
            role: "user",
            parts: [{ text: prompt }],
         },
      ],
   };

   try {
      const response = await fetch(
         `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(requestPayload),
         }
      );

      if (!response.ok) {
         throw new Error(`API call failed: ${response.statusText}`);
      }

      const data = await response.json();
      const textResponse = data.candidates[0]?.content?.parts[0]?.text;

      if (textResponse) {
         let cleanedResponse = textResponse.replace(/`/g, "").trim();

         if (cleanedResponse.startsWith("json")) {
            cleanedResponse = cleanedResponse.slice(4).trim();
         }
         console.log(cleanedResponse);
         return JSON.parse(cleanedResponse);
      } else {
         throw new Error("No content returned from Gemini.");
      }
   } catch (error) {
      console.error("Error fetching product details:", error);
      return {
         product: "Unknown",
         price: 0,
         unit: "kg",
         stock: "in stock",
      };
   }
}; 