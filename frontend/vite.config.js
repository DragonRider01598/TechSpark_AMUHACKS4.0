import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'bigLibraries': ['react', 'react-dom'], 
          'vendorDashboard': ['./src/pages/VendorDashboard.jsx']
        }
      }
    }
  }
  // server: {
  //   host: '0.0.0.0',
  //   port: process.env.PORT || 10000,
  //   allowedHosts: ['megahack-oosm.onrender.com'],
  // }
  
})
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173, // Change the port if needed
//   },
//   resolve: {
//     alias: {
//       '@': '/src', // Shortcut for imports
//     },
//   },
// });

