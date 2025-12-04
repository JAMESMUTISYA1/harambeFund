// contexts/AuthContext.js
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Client, Account } from 'appwrite';

// Initialize Appwrite client (singleton pattern)
const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check auth status when component mounts
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const user = await account.get();
      setCurrentUser(user);
    } catch (error) {
      console.log('User not logged in');
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      await account.createEmailSession(email, password);
      const user = await account.get();
      setCurrentUser(user);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setCurrentUser(null);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}