# AgriConnect

AgriConnect is a **local farmers' market application** that helps users find nearby markets, explore available products, and view vendor details. It also provides vendors with a dashboard to register, manage products, and update their listings. Built with **React, Node.js, Express.js, MongoDB, and Google APIs**, AgriConnect bridges the gap between farmers and consumers for a seamless marketplace experience.

## Screenshots

<img src="https://github.com/RohitParmar-17/MegaHack/blob/main/frontend/src/assets/screenshots/dashboard.png" alt="Dashboard" width="100%">

<img src="https://github.com/RohitParmar-17/MegaHack/blob/main/frontend/src/assets/screenshots/markets.png" alt="Markets" width="100%">

<img src="https://github.com/RohitParmar-17/MegaHack/blob/main/frontend/src/assets/screenshots/market2.png" alt="Market2" width="100%">

<img src="https://github.com/RohitParmar-17/MegaHack/blob/main/frontend/src/assets/screenshots/products.png" alt="Products" width="100%">

<img src="https://github.com/RohitParmar-17/MegaHack/blob/main/frontend/src/assets/screenshots/vendor.png" alt="Vendor" width="100%">

## Features

- **Search Nearby Markets** – Find farmers' markets based on location.

- **Product-Based Search** – Look up specific products and see which markets have them.
  
- **Vendor Registration** – Vendors can register and list their products in a chosen market.
  
- **Product Management** – Vendors can add, edit, and manage their product listings.
  
- **Vendor Dashboard** – A centralized interface for vendors to track and update their offerings.

## Tech Stack

- **Frontend:** React, Tailwind CSS, DaisyUI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **APIs:** Google APIs (for location-based search)
- **Styling:** Tailwind CSS, DaisyUI
- **Notifications:** Toast for user feedback

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/DragonRider01598/TechSpark_AMUHACKS4.0.git
   cd TechSpark_AMUHACKS4.0
   ```
2. Install dependencies:
   ```sh
   cd frontend
   npm install

   cd backend
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   **backend**
   MONGO_URI=mongobd_srv
   FRONTEND_URL=your_frontend_url
   JWT_SECRET=jwt_secret
   GOOGLE_API=your_key_here
   NODE_ENV="development" or "production"
   
   **frontend**
   VITE_GOOGLE_MAPS_API_KEY=your_api_key
   VITE_BACKEND_URL=your_backend_url
   VITE_GEMINI_API_KEY=your_api_key
   ```
4. Start the backend server:
   ```sh
   cd backend
   npm start
   ```
5. Start the frontend:
   ```sh
   cd frontend
   npm run dev
   ```

## Usage

- Search for nearby farmers' markets.
- Find markets selling specific products.
- Vendors can register and list their products.
- Manage and update product listings via the vendor dashboard.

## Contributors

- **Rohit Parmar** - [RohitParmar-17](https://github.com/RohitParmar-17)
- **Aaron Mendonca** - [DragonRider01598](https://github.com/DragonRider01598)
- **Arya Gawde** - [AryaG26](https://github.com/AryaG26)
- **Nilay Koul** - [Nilay-28](https://github.com/Nilay-28)

## Contributing

Feel free to submit pull requests or open issues for any improvements.

---

## Contact
For any issues or suggestions, feel free to reach out:
- **Email**: rohitghost5050@gmail.com
