import axios from 'axios';
import { getSession } from 'next-auth/react';

// For server-side fetch, we might need a separate API client or pass the token explicitly.
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1',
  withCredentials: true, // For httpOnly cookies if using them
});

// Interceptor to attach the token if we were using purely local storage, 
// but since NextAuth is handling it, we might attach it from session
apiClient.interceptors.request.use(async (config) => {
  if (typeof window !== 'undefined') {
    // Client side
    const session = await getSession();
    if (session?.user?.id) {
       // Our backend uses jwt in cookies mostly, but we can also pass bearer if needed
       // config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
  }
  return config;
});
