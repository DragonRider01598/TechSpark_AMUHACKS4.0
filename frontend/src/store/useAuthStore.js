// Authentication state management
// Handles user login, logout, and session persistence
import { create } from 'zustand'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const useAuthStore = create((set) => ({
   authUser: { isLogged: false, userId: null, username: '', profileImage: '' },

   authenticateUser: async () => {
      try {
         const response = await fetch(`${BACKEND_URL}/auth/`, {
            method: 'GET',
            credentials: 'include',
         });

         if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
         }
   
         const data = await response.json(); 
         // console.log("User data:", data);
         set({ authUser: data })
      } catch (error) {
         console.error('Error during authentication:', error);
      }
   }
}))


