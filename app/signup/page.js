// app/auth/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Client, Account, Databases, OAuthProvider, ID } from 'appwrite';

// Initialize Appwrite client
const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    agreeToTerms: false
  });
  const [usePhone, setUsePhone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    // Check if user is already logged in
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const user = await account.get();
      // If user is logged in, redirect to dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      // User is not logged in, continue with auth
      console.log('User not logged in');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });
    
    // Validate form
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setMessage({ text: 'Passwords do not match', type: 'error' });
        setLoading(false);
        return;
      }
      if (formData.password.length < 8) {
        setMessage({ text: 'Password must be at least 8 characters', type: 'error' });
        setLoading(false);
        return;
      }
      if (!formData.agreeToTerms) {
        setMessage({ text: 'Please agree to the terms and conditions', type: 'error' });
        setLoading(false);
        return;
      }
    }
    
    try {
      if (usePhone) {
        await handlePhoneAuth();
      } else {
        await handleEmailAuth();
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setMessage({ 
        text: error.message || 'Authentication failed. Please try again.', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async () => {
    if (isLogin) {
      // Email login
      await account.createEmailPasswordSession(formData.email, formData.password);
      setMessage({ text: 'Login successful! Redirecting...', type: 'success' });
      
      // Redirect to dashboard after successful login
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    } else {
      // Email registration - let Appwrite auto-generate the user ID
      await account.create(
        ID.unique(), // Let Appwrite generate the ID
        formData.email, 
        formData.password, 
        `${formData.firstName} ${formData.lastName}`
      );
      
      // Create user profile in database with auto-generated ID
      try {
        await databases.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          'user_profiles',
          ID.unique(), // Auto-generated ID
          {
            user_id: (await account.get()).$id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone || '',
            created_at: new Date().toISOString()
          }
        );
      } catch (error) {
        console.log('Error creating user profile:', error);
        // Continue even if profile creation fails - it can be retried later
      }
      
      // Send verification email
      try {
        await account.createVerification(`${window.location.origin}/verify`);
        setMessage({ 
          text: 'Registration successful! Please check your email for verification.', 
          type: 'success' 
        });
      } catch (error) {
        console.log('Error sending verification email:', error);
        setMessage({ 
          text: 'Registration successful! You can verify your email later.', 
          type: 'success' 
        });
      }
    }
  };

  const handlePhoneAuth = async () => {
    if (isLogin) {
      // Phone login
      await account.createPhonePasswordSession(formData.phone, formData.password);
      setMessage({ text: 'Login successful! Redirecting...', type: 'success' });
      
      // Redirect to dashboard after successful login
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    } else {
      // Phone registration - let Appwrite auto-generate the user ID
      await account.createPhonePassword(
        ID.unique(), // Auto-generated ID
        formData.phone, 
        formData.password, 
        `${formData.firstName} ${formData.lastName}`
      );
      
      // Create user profile with auto-generated ID
      try {
        await databases.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          'user_profiles',
          ID.unique(), // Auto-generated ID
          {
            user_id: (await account.get()).$id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email || '',
            phone: formData.phone,
            created_at: new Date().toISOString()
          }
        );
      } catch (error) {
        console.log('Error creating user profile:', error);
      }
      
      // Send verification SMS
      try {
        await account.createPhoneVerification();
        setVerificationStep(true);
        setMessage({ 
          text: 'Verification code sent to your phone. Please enter it below.', 
          type: 'success' 
        });
      } catch (error) {
        console.log('Error sending verification SMS:', error);
        setMessage({ 
          text: 'Registration successful but could not send verification code. Please contact support.', 
          type: 'error' 
        });
      }
    }
  };

  const verifyPhoneCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await account.updatePhoneVerification(verificationCode);
      setMessage({ text: 'Phone number verified successfully! Redirecting...', type: 'success' });
      
      // Redirect to dashboard after successful verification
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      // Initiate Google OAuth flow - Appwrite will auto-generate the user ID
      account.createOAuth2Session(
        OAuthProvider.Google,
        `${window.location.origin}/dashboard`, // Success URL
        `${window.location.origin}/auth` // Failure URL
      );
    } catch (error) {
      console.error('Google OAuth error:', error);
      setMessage({ text: 'Google authentication failed. Please try again.', type: 'error' });
    }
  };

  const handleForgotPassword = async () => {
    const identifier = usePhone ? formData.phone : formData.email;
    
    if (!identifier) {
      setMessage({ text: 'Please enter your email or phone number', type: 'error' });
      return;
    }
    
    setLoading(true);
    
    try {
      if (usePhone) {
        // For phone password recovery
        await account.createPhoneRecovery();
        setMessage({ 
          text: 'Password recovery instructions sent to your phone.', 
          type: 'success' 
        });
      } else {
        // For email password recovery
        await account.createRecovery(
          formData.email,
          `${window.location.origin}/reset-password`
        );
        setMessage({ 
          text: 'Password recovery instructions sent to your email.', 
          type: 'success' 
        });
      }
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setVerificationStep(false);
    setMessage({ text: '', type: '' });
    // Reset form when switching modes
    setFormData({
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      agreeToTerms: false
    });
  };

  if (verificationStep) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-md">
            <div className="bg-white p-极6 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold text-center mb-2">
                Verify Your Phone Number
              </h1>
              <p className="text-gray-600 text-center mb-6">
                Enter the verification code sent to your phone
              </p>
              
              {message.text && (
                <div className={`mb-4 p-3 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {message.text}
                </div>
              )}
              
              <form onSubmit={verifyPhoneCode} className="space极-y-4">
                <div>
                  <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Verification Code *
                  </label>
                  <input
                    type="text"
                    id="verificationCode"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter 6-digit code"
                    required
                    maxLength={6}
                    pattern="[0-9]{6}"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Verifying...' : 'Verify Code'}
                </button>
              </form>
              
              <div className="mt-4 text-center">
                <button
                  onClick={() => setVerificationStep(false)}
                  className="text-green-600 hover:underline"
                >
                  Back to {isLogin ? 'Login' : 'Registration'}
                </button>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-2">
              {isLogin ? 'Login to Your Account' : 'Create an Account'}
            </h1>
            <p className="text-gray-600 text-center mb-6">
              {isLogin ? 'Welcome back! Please enter your details.' : 'Join Harambee to start supporting causes that matter.'}
            </p>
            
            {/* Google Auth Button */}
            <button
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 mb-6"
            >
              <Image 
                src="/images/google-logo.png" 
                alt="Google" 
                width={20} 
                height={20} 
              />
              <span>{isLogin ? 'Sign in with Google' : 'Sign up with Google'}</span>
            </button>
            
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="极w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with {usePhone ? 'phone' : 'email'}</span>
              </div>
            </div>
            
            {message.text && (
              <div className={`mb-4 p-3 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message.text}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required={!isLogin}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray极-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor={usePhone ? "phone" : "email"} className="block text-sm font-medium text-gray-700">
                    {usePhone ? "Phone Number" : "Email Address"} *
                  </label>
                  <button
                    type="button"
                    onClick={() => setUsePhone(!usePhone)}
                    className="text-sm text-green-600 hover:underline"
                  >
                    Use {usePhone ? "email" : "phone"} instead
                  </button>
                </div>
                
                {usePhone ? (
                  <div className="flex">
                    <div className="w-1/4 mr-2">
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        defaultValue="+254"
                      >
                        <option value="+254">+254</option>
                        <option value="+255">+255</option>
                        <option value="+256">+256</option>
                        <option value="+257">+257</option>
                      </select>
                    </div>
                    <div className="w-3/4">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="712 345 678"
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="your@email.com"
                    required
                  />
                )}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md极 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
                {!isLogin && (
                  <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
                )}
              </div>
              
              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="••••••••"
                    required
                    minLength={8}
                  />
                </div>
              )}
              
              {!isLogin && (
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1"
                    required
                  />
                  <label htmlFor="agreeToTerms极" className="ml-2 block text-sm text-gray-700">
                    I agree to the{' '}
                    <Link href="/terms" className="text-green-600 hover:underline">
                      Terms and Conditions
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-green-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              )}
              
              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      name="remember"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-green-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isLogin ? 'Signing in...' : 'Creating account...'}
                  </span>
                ) : (
                  isLogin ? 'Sign in' : 'Create account'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={toggleAuthMode}
                  className="text-green-600 font-medium hover:underline"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}