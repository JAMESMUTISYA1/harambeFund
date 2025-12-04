// hooks/useCampaignData.js
import { useState, useEffect } from 'react';
import { databases, ID } from '@/lib/appwrite';

const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const campaignsCollectionId = process.env.NEXT_PUBLIC_CAMPAIGNS_COLLECTION_ID;
const donationsCollectionId = process.env.NEXT_PUBLIC_DONATIONS_COLLECTION_ID;

export const useCampaignDetails = (campaignId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      if (!campaignId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const campaign = await databases.getDocument(
          databaseId,
          campaignsCollectionId,
          campaignId
        );

        setData(campaign);
      } catch (err) {
        console.error("Error fetching campaign details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignDetails();
  }, [campaignId]);

  return { data, loading, error };
};

export const useCreateDonation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const createDonation = async ({ campaignId, amount, paymentMethod, mobileMoneyPhone }) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create donation record
      const donation = await databases.createDocument(
        databaseId,
        donationsCollectionId,
        ID.unique(),
        {
          campaign_id: campaignId,
          amount: parseFloat(amount),
          donor_name: 'Anonymous',
          donor_id: 'Anonymous',
          payment_method: paymentMethod,
          transaction_id: `TXN_${Date.now()}`,
          status: 'completed',
          anonymous: true,
          currency: 'KES',
          mobile_money_phone: mobileMoneyPhone
        }
      );

      setData(donation);
      return donation;
    } catch (err) {
      console.error("Error creating donation:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createDonation, data, loading, error };
};

export const useUpdateCampaign = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const updateCampaign = async ({ campaignId, updates }) => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedCampaign = await databases.updateDocument(
        databaseId,
        campaignsCollectionId,
        campaignId,
        updates
      );

      setData(updatedCampaign);
      return updatedCampaign;
    } catch (err) {
      console.error("Error updating campaign:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateCampaign, data, loading, error };
};

export const useCampaignDonations = (campaignId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaignDonations = async () => {
      if (!campaignId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const donations = await databases.listDocuments(
          databaseId,
          donationsCollectionId,
          [
            Query.equal('campaign_id', campaignId),
            Query.orderDesc('$createdAt'),
            Query.limit(20)
          ]
        );

        setData(donations.documents || []);
      } catch (err) {
        console.error("Error fetching campaign donations:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignDonations();
  }, [campaignId]);

  return { data, loading, error };
};

export const useRecentDonations = (limit = 10) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentDonations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const donations = await databases.listDocuments(
          databaseId,
          donationsCollectionId,
          [
            Query.orderDesc('$createdAt'),
            Query.limit(limit)
          ]
        );

        setData(donations.documents || []);
      } catch (err) {
        console.error("Error fetching recent donations:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentDonations();
  }, [limit]);

  return { data, loading, error };
};