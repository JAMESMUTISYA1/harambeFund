// hooks/useHomepageData.js
import { useState, useEffect } from 'react';
import { appwriteService } from '@/lib/appwriteService';

export const useHomepageData = () => {
  const [featuredCampaigns, setFeaturedCampaigns] = useState([]);
  const [featuredTestimonials, setFeaturedTestimonials] = useState([]);
  const [impactStats, setImpactStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        setLoading(true);
        
        // Fetch data in parallel for better performance
        const [campaignsData, testimonialsData, statsData] = await Promise.allSettled([
          appwriteService.getFeaturedCampaigns(),
          appwriteService.getFeaturedTestimonials(),
          appwriteService.getImpactStats()
        ]);

        // Handle each promise result
        if (campaignsData.status === 'fulfilled') {
          setFeaturedCampaigns(campaignsData.value.documents || []);
        } else {
          console.error('Error fetching campaigns:', campaignsData.reason);
        }
        
        if (testimonialsData.status === 'fulfilled') {
          setFeaturedTestimonials(testimonialsData.value.documents || []);
        } else {
          console.error('Error fetching testimonials:', testimonialsData.reason);
        }
        
        if (statsData.status === 'fulfilled') {
          setImpactStats(statsData.value.documents || []);
        } else {
          console.error('Error fetching stats:', statsData.reason);
        }
        
      } catch (err) {
        console.error('Error fetching homepage data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageData();
  }, []);

  return {
    featuredCampaigns,
    featuredTestimonials,
    impactStats,
    loading,
    error
  };
};

// Individual hooks for specific data if needed
export const useFeaturedCampaigns = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await appwriteService.getFeaturedCampaigns();
        setData(result.documents || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export const useFeaturedTestimonials = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await appwriteService.getFeaturedTestimonials();
        setData(result.documents || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export const useImpactStats = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await appwriteService.getImpactStats();
        setData(result.documents || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};