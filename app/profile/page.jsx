// app/profile/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Client, Account, Databases, Storage, ID } from 'appwrite';

// Initialize AppWrite client
const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Collection IDs
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_USERS_COLLECTION_ID || 'users';
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'harambee';
const AVATAR_BUCKET_ID = process.env.NEXT_PUBLIC_AVATAR_BUCKET_ID || 'avatars';

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [userDonations, setUserDonations] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    bio: '',
    avatar: null
  });
  const [avatarPreview, setAvatarPreview] = useState('');

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const user = await account.get();
      setCurrentUser(user);
      fetchUserProfile(user.$id);
      fetchUserCampaigns(user.$id);
      fetchUserDonations(user.$id);
    } catch (error) {
      console.log('User not logged in');
      router.push('/auth?redirect=/profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async (userId) => {
    try {
      const profile = await databases.getDocument(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        userId
      );
      
      setUserProfile(profile);
      setFormData({
        name: profile.name || '',
        phone: profile.phone || '',
        location: profile.location || '',
        bio: profile.bio || '',
        avatar: null
      });
      
      if (profile.avatar) {
        setAvatarPreview(storage.getFilePreview(AVATAR_BUCKET_ID, profile.avatar));
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // If profile doesn't exist, create a basic one
      if (error.code === 404) {
        createUserProfile(userId);
      }
    }
  };

  const createUserProfile = async (userId) => {
    try {
      const user = await account.get();
      const profileData = {
        name: user.name || '',
        email: user.email || '',
        phone: '',
        location: '',
        bio: '',
        verification_status: 'pending',
        total_donated: 0,
        campaigns_created: 0
      };

      const newProfile = await databases.createDocument(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        userId,
        profileData
      );

      setUserProfile(newProfile);
      setFormData({
        name: newProfile.name || '',
        phone: newProfile.phone || '',
        location: newProfile.location || '',
        bio: newProfile.bio || '',
        avatar: null
      });
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  };

  const fetchUserCampaigns = async (userId) => {
    try {
      const campaigns = await databases.listDocuments(
        DATABASE_ID,
        'campaigns',
        [
          Query.equal('creator_id', userId),
          Query.orderDesc('$createdAt')
        ]
      );
      setUserCampaigns(campaigns.documents);
    } catch (error) {
      console.error('Error fetching user campaigns:', error);
    }
  };

  const fetchUserDonations = async (userId) => {
    try {
      const donations = await databases.listDocuments(
        DATABASE_ID,
        'donations',
        [
          Query.equal('donor_id', userId),
          Query.orderDesc('$createdAt'),
          Query.limit(10)
        ]
      );
      setUserDonations(donations.documents);
    } catch (error) {
      console.error('Error fetching user donations:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        avatar: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let avatarId = userProfile?.avatar;

      // Upload new avatar if selected
      if (formData.avatar) {
        // Delete old avatar if exists
        if (avatarId) {
          try {
            await storage.deleteFile(AVATAR_BUCKET_ID, avatarId);
          } catch (error) {
            console.log('No old avatar to delete');
          }
        }

        // Upload new avatar
        const uploadResponse = await storage.createFile(
          AVATAR_BUCKET_ID,
          ID.unique(),
          formData.avatar
        );
        avatarId = uploadResponse.$id;
      }

      // Update profile
      const updatedProfile = await databases.updateDocument(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        currentUser.$id,
        {
          name: formData.name,
          phone: formData.phone,
          location: formData.location,
          bio: formData.bio,
          ...(avatarId && { avatar: avatarId })
        }
      );

      setUserProfile(updatedProfile);
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('There was an error updating your profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      name: userProfile?.name || '',
      phone: userProfile?.phone || '',
      location: userProfile?.location || '',
      bio: userProfile?.bio || '',
      avatar: null
    });
    setAvatarPreview(userProfile?.avatar ? storage.getFilePreview(AVATAR_BUCKET_ID, userProfile.avatar) : '');
    setEditing(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </main>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Redirecting to login...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {avatarPreview ? (
                    <Image
                      src={avatarPreview}
                      alt="Profile"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {userProfile?.name?.[0]?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                </div>
                
                {editing && (
                  <label className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full cursor-pointer hover:bg-green-700 transition">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </label>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    {editing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="text-2xl font-bold text-gray-800 bg-gray-100 px-3 py-2 rounded-md w-full md:w-auto"
                        placeholder="Your Name"
                      />
                    ) : (
                      <h1 className="text-2xl font-bold text-gray-800">
                        {userProfile?.name || 'Anonymous User'}
                      </h1>
                    )}
                    <p className="text-gray-600">{userProfile?.email}</p>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    {editing ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSubmit}
                          disabled={saving}
                          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                        >
                          {saving ? 'Saving...' : 'Save'}
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEditing(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>

                {/* Verification Status */}
                <div className="mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    userProfile?.verification_status === 'verified' 
                      ? 'bg-green-100 text-green-800'
                      : userProfile?.verification_status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {userProfile?.verification_status?.charAt(0).toUpperCase() + userProfile?.verification_status?.slice(1)}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {userCampaigns.length}
                    </div>
                    <div className="text-sm text-gray-600">Campaigns</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(userProfile?.total_donated || 0)}
                    </div>
                    <div className="text-sm text-gray-600">Donated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {userDonations.length}
                    </div>
                    <div className="text-sm text-gray-600">Contributions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  {editing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="Your phone number"
                    />
                  ) : (
                    <p className="text-gray-800">{userProfile?.phone || 'Not provided'}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  {editing ? (
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="Your location"
                    />
                  ) : (
                    <p className="text-gray-800">{userProfile?.location || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">About Me</h2>
              
              {editing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder="Tell us about yourself..."
                  maxLength={1000}
                />
              ) : (
                <p className="text-gray-800 whitespace-pre-wrap">
                  {userProfile?.bio || 'No bio provided yet.'}
                </p>
              )}
            </div>
          </div>

          {/* User Campaigns */}
          {userCampaigns.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">My Campaigns</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userCampaigns.slice(0, 4).map(campaign => (
                  <div key={campaign.$id} className="border rounded-lg p-4 hover:shadow-md transition">
                    <h3 className="font-semibold text-gray-800 mb-2">{campaign.title}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{campaign.description}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-green-600 font-medium">
                        {formatCurrency(campaign.raised || 0)} raised
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        campaign.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {userCampaigns.length > 4 && (
                <button className="w-full mt-4 text-green-600 hover:text-green-700 font-medium">
                  View all campaigns ({userCampaigns.length})
                </button>
              )}
            </div>
          )}

          {/* Recent Donations */}
          {userDonations.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Contributions</h2>
              
              <div className="space-y-3">
                {userDonations.map(donation => (
                  <div key={donation.$id} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="font-medium text-gray-800">
                        {donation.campaign_title || 'Unknown Campaign'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(donation.$createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-green-600 font-semibold">
                      {formatCurrency(donation.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}