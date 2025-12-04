// lib/appwriteService.js
import { Client, Databases, Query, Storage } from 'appwrite';

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);
const storage = new Storage(client);

const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const campaignsCollectionId = process.env.NEXT_PUBLIC_CAMPAIGNS_COLLECTION_ID;
const campaignsBucketId = process.env.NEXT_PUBLIC_CAMPAIGNS_BUCKET_ID;

export const appwriteService = {
  // Get featured campaigns with image URLs
  getFeaturedCampaigns: async () => {
    try {
      const campaigns = await databases.listDocuments(
        databaseId,
        campaignsCollectionId,
        [
          Query.equal('featured', true),
          Query.orderDesc('$createdAt'),
          Query.limit(6)
        ]
      );
      
      // Enhance campaigns with image URLs
      const campaignsWithImages = await Promise.all(
        campaigns.documents.map(async (campaign) => {
          if (campaign.featured_image) {
            try {
              // Check if featured_image is already a URL or a file ID
              if (campaign.featured_image.startsWith('http')) {
                // It's already a URL, use it directly
            
                return {
                  ...campaign,
                  imageUrl: campaign.featured_image
                 
                };
              } else {
                // It's a file ID, generate the URL from Appwrite storage
                const imageUrl = storage.getFilePreview(
                  campaignsBucketId,
                  campaign.featured_image,
                  400, // width
                  192  // height
                );
                console.log(imageUrl);
                return {
                  ...campaign,
                  imageUrl: imageUrl.toString()
                };
              }
            } catch (error) {
              console.error('Error getting image for campaign:', campaign.$id, error);
              return campaign;
            }
          }
          return campaign;
        })
      );
      
      return {
        ...campaigns,
        documents: campaignsWithImages
      };
    } catch (error) {
      console.error('Error fetching featured campaigns:', error);
      throw error;
    }
  },

  // Get file preview URL
  getFilePreview: (bucketId, fileId, width = 400, height = 300) => {
    return storage.getFilePreview(
      bucketId,
      fileId,
      width,
      height,
      undefined,
      undefined,
      undefined,
      'center'
    );
  },

  // Get file view URL (for direct download)
  getFileView: (bucketId, fileId) => {
    return storage.getFileView(bucketId, fileId);
  },

  // Get featured testimonials
  getFeaturedTestimonials: async () => {
    try {
      const testimonialsCollectionId = process.env.NEXT_PUBLIC_TESTIMONIALS_COLLECTION_ID;
      const testimonialsBucketId = process.env.NEXT_PUBLIC_TESTIMONIALS_BUCKET_ID;
      
      const testimonials = await databases.listDocuments(
        databaseId,
        testimonialsCollectionId,
        [
          Query.equal('featured', true),
          Query.orderDesc('$createdAt'),
          Query.limit(3)
        ]
      );
      
      // Enhance testimonials with image URLs if they have avatars
      const testimonialsWithImages = await Promise.all(
        testimonials.documents.map(async (testimonial) => {
          if (testimonial.avatar) {
            try {
              // Check if avatar is already a URL or a file ID
              if (testimonial.avatar.startsWith('http')) {
                // It's already a URL, use it directly
                return {
                  ...testimonial,
                  avatarUrl: testimonial.avatar
                };
              } else {
                // It's a file ID, generate the URL from Appwrite storage
                const imageUrl = storage.getFilePreview(
                  testimonialsBucketId,
                  testimonial.avatar,
                  100, // width
                  100  // height
                );
                return {
                  ...testimonial,
                  avatarUrl: imageUrl.toString()
                };
              }
            } catch (error) {
              console.error('Error getting avatar for testimonial:', testimonial.$id, error);
              return testimonial;
            }
          }
          return testimonial;
        })
      );
      
      return {
        ...testimonials,
        documents: testimonialsWithImages
      };
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  },

  // Get impact stats
  getImpactStats: async () => {
    try {
      const statsCollectionId = process.env.NEXT_PUBLIC_STATS_COLLECTION_ID;
      
      return await databases.listDocuments(
        databaseId,
        statsCollectionId,
        [Query.limit(4)]
      );
    } catch (error) {
      console.error('Error fetching impact stats:', error);
      throw error;
    }
  },

  // Helper function to check if a string is a URL
  isUrl: (str) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  },
  // Get active campaigns with image URLs
getActiveCampaigns: async () => {
  try {
    const campaigns = await databases.listDocuments(
      databaseId,
      campaignsCollectionId,
      [
        Query.equal('status', 'active'),
        Query.orderDesc('$createdAt')
      ]
    );
    
    // Enhance campaigns with image URLs
    const campaignsWithImages = await Promise.all(
      campaigns.documents.map(async (campaign) => {
        if (campaign.featured_image) {
          try {
            // Check if featured_image is already a URL or a file ID
            if (campaign.featured_image.startsWith('http')) {
              // It's already a URL, use it directly
              return {
                ...campaign,
                imageUrl: campaign.featured_image
              };
            } else {
              // It's a file ID, generate the URL from Appwrite storage
              const imageUrl = storage.getFilePreview(
                campaignsBucketId,
                campaign.featured_image,
                400, // width
                192  // height
              );
              return {
                ...campaign,
                imageUrl: imageUrl.toString()
              };
            }
          } catch (error) {
            console.error('Error getting image for campaign:', campaign.$id, error);
            return campaign;
          }
        }
        return campaign;
      })
    );
    
    return {
      ...campaigns,
      documents: campaignsWithImages
    };
  } catch (error) {
    console.error('Error fetching active campaigns:', error);
    throw error;
  }
},




// Get campaign by ID with image URLs
getCampaignById: async (campaignId) => {
  try {
    const campaign = await databases.getDocument(
      databaseId,
      campaignsCollectionId,
      campaignId
    );

    // Enhance campaign with image URLs
    if (campaign.featured_image) {
      try {
        if (campaign.featured_image.startsWith('http')) {
          campaign.imageUrl = campaign.featured_image;
        } else {
          const imageUrl = storage.getFilePreview(
            campaignsBucketId,
            campaign.featured_image,
            800,
            400
          );
          campaign.imageUrl = imageUrl.toString();
        }
      } catch (error) {
        console.error('Error getting image for campaign:', campaignId, error);
      }
    }

    return campaign;
  } catch (error) {
    console.error('Error fetching campaign:', error);
    throw error;
  }
},

// Get campaign donations
getCampaignDonations: async (campaignId) => {
  try {
    const DONATIONS_COLLECTION_ID = process.env.NEXT_PUBLIC_DONATIONS_COLLECTION_ID;
    return await databases.listDocuments(
      databaseId,
      DONATIONS_COLLECTION_ID,
      [
        Query.equal('campaign_id', campaignId),
        Query.orderDesc('$createdAt'),
        Query.limit(20)
      ]
    );
  } catch (error) {
    console.error('Error fetching donations:', error);
    throw error;
  }
},

// Get campaign updates
getCampaignUpdates: async (campaignId) => {
  try {
    const UPDATES_COLLECTION_ID = process.env.NEXT_PUBLIC_UPDATES_COLLECTION_ID;
    return await databases.listDocuments(
      databaseId,
      UPDATES_COLLECTION_ID,
      [
        Query.equal('campaign_id', campaignId),
        Query.orderDesc('$createdAt'),
        Query.limit(10)
      ]
    );
  } catch (error) {
    console.error('Error fetching updates:', error);
    throw error;
  }
},

// Get related campaigns
getRelatedCampaigns: async (category, excludeCampaignId) => {
  try {
    let queries = [
      Query.equal('category', category),
      Query.equal('status', 'active'),
      Query.orderDesc('$createdAt'),
      Query.limit(4)
    ];

    if (excludeCampaignId) {
      queries.push(Query.notEqual('$id', excludeCampaignId));
    }

    const campaigns = await databases.listDocuments(
      databaseId,
      campaignsCollectionId,
      queries
    );

    // Enhance campaigns with image URLs
    const campaignsWithImages = await Promise.all(
      campaigns.documents.map(async (campaign) => {
        if (campaign.featured_image) {
          try {
            if (campaign.featured_image.startsWith('http')) {
              campaign.imageUrl = campaign.featured_image;
            } else {
              const imageUrl = storage.getFilePreview(
                campaignsBucketId,
                campaign.featured_image,
                400,
                192
              );
              campaign.imageUrl = imageUrl.toString();
            }
          } catch (error) {
            console.error('Error getting image for campaign:', campaign.$id, error);
          }
        }
        return campaign;
      })
    );

    return {
      ...campaigns,
      documents: campaignsWithImages
    };
  } catch (error) {
    console.error('Error fetching related campaigns:', error);
    throw error;
  }
}








  
};

