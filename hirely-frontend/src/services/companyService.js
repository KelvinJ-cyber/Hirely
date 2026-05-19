import api from './api';

/**
 * @typedef {Object} CompanyProfilePayload
 * @property {string} legalName
 * @property {string} primaryIndustry
 * @property {string} website
 * @property {string} headquarters
 * @property {string} tagline
 * @property {string} aboutCompany
 * @property {string} missionStatement
 * @property {string[]} coreValues
 */

/**
 * @typedef {Object} ServiceResponse
 * @property {boolean} success
 * @property {any} [data]
 * @property {string} [error]
 */

export const companyService = {
  /**
   * Fetches the company profile for a given user ID.
   *
   * @param {string|number} userId - The ID of the user owning the company profile.
   * @returns {Promise<ServiceResponse>} A promise resolving to the success state and data/error.
   */
  getProfile: async (userId) => {
    if (!userId) {
      return { success: false, error: 'User ID is required to fetch profile.' };
    }

    try {
      const response = await api.get(`/api/companies/profile/${userId}`);
      return { 
        success: true, 
        data: response.data 
      };
    } catch (error) {
      console.error('[CompanyService] Error fetching profile:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to fetch company profile.',
      };
    }
  },

  /**
   * Creates or updates a company profile for a given user ID.
   *
   * @param {string|number} userId - The ID of the user.
   * @param {CompanyProfilePayload} profileData - The company profile data payload.
   * @returns {Promise<ServiceResponse>} A promise resolving to the success state and data/error.
   */
  createProfile: async (userId, profileData) => {
    if (!userId) {
      return { success: false, error: 'User ID is required to create profile.' };
    }

    try {
      const response = await api.post(`/api/companies/create-profile/${userId}`, profileData);
      return { 
        success: true, 
        data: response.data 
      };
    } catch (error) {
      console.error('[CompanyService] Error creating profile:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to create company profile.',
      };
    }
  }
};
