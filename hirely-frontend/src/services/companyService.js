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
  },

  /**
   * Creates a new job posting for the company.
   *
   * @param {string|number} companyId - The ID of the company.
   * @param {Object} jobData - The job details payload.
   * @returns {Promise<ServiceResponse>}
   */
  createJob: async (companyId, jobData) => {
    if (!companyId) {
      return { success: false, error: 'Company ID is required to create a job.' };
    }

    try {
      const response = await api.post(`/api/companies/create-job/${companyId}`, jobData);
      return { 
        success: true, 
        data: response.data 
      };
    } catch (error) {
      console.error('[CompanyService] Error creating job:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to create job posting.',
      };
    }
  },

  /**
   * Fetches all job listings for a company.
   *
   * @param {string|number} userId - The user ID of the company owner.
   * @returns {Promise<ServiceResponse>}
   */
  getListings: async (userId) => {
    if (!userId) {
      return { success: false, error: 'User ID is required to fetch listings.' };
    }

    try {
      const response = await api.get(`/api/companies/listings/${userId}`);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('[CompanyService] Error fetching listings:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to fetch listings.',
      };
    }
  },

  /**
   * Deletes a job posting.
   *
   * @param {string|number} jobId - The job ID to delete.
   * @param {string|number} companyId - The company (user) ID.
   * @returns {Promise<ServiceResponse>}
   */
  deleteJob: async (jobId, companyId) => {
    if (!jobId || !companyId) {
      return { success: false, error: 'Job ID and Company ID are required.' };
    }

    try {
      const response = await api.delete(`/api/companies/${jobId}/${companyId}`);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('[CompanyService] Error deleting job:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to delete job.',
      };
    }
  },

  /**
   * Updates a job posting.
   *
   * @param {string|number} jobId - The job ID to update.
   * @param {string|number} companyId - The company (user) ID.
   * @param {Object} jobData - The updated job data.
   * @returns {Promise<ServiceResponse>}
   */
  updateJob: async (jobId, companyId, jobData) => {
    if (!jobId || !companyId) {
      return { success: false, error: 'Job ID and Company ID are required.' };
    }

    try {
      const response = await api.put(`/api/companies/${jobId}/${companyId}`, jobData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('[CompanyService] Error updating job:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to update job.',
      };
    }
  }
};
