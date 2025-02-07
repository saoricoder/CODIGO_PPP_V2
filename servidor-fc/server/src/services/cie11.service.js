const axios = require('axios');
const qs = require('qs');
require('dotenv').config();


const CIE11_API_BASE_URL = 'https://id.who.int/icd/entity';
const CIE11_SEARCH_URL = 'https://id.who.int/icd/release/11/2024-01/mms/search';
const TOKEN_ENDPOINT = 'https://icdaccessmanagement.who.int/connect/token';
const CLIENT_ID = process.env.CIE11_CLIENT_ID;
const CLIENT_SECRET = process.env.CIE11_CLIENT_SECRET;
const SCOPE = 'icdapi_access';

let accessToken = null;
let tokenExpirationTime = null;

const cie11Service = {
  getAccessToken: async () => {
    if (accessToken && tokenExpirationTime > Date.now()) {
      return accessToken;
    }

    try {
      const response = await axios.post(TOKEN_ENDPOINT, 
        qs.stringify({
          grant_type: 'client_credentials',
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          scope: SCOPE
        }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      accessToken = response.data.access_token;
      tokenExpirationTime = Date.now() + (response.data.expires_in * 1000);
      return accessToken;
    } catch (error) {
      console.error('Error obtaining access token:', error);
      throw error;
    }
  },

  makeAuthenticatedRequest: async (url, method = 'GET', params = {}) => {
    try {
      const token = await cie11Service.getAccessToken();
      const response = await axios({
        method,
        url,
        params,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'API-Version': 'v2',
          'Accept-Language': 'es'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error making authenticated request:', error);
      throw error;
    }
  },

  searchDiseases: async (query) => {
    try {
      const response = await cie11Service.makeAuthenticatedRequest(CIE11_SEARCH_URL, 'POST', {
        q: `${query}%`,
        flatResults: 'true',
        includeKeywordResult: 'true',
        medicalCodingMode:'true',
        includePostcoordination: 'true',
        useBroaderSynonyms: 'false',
        useFlexiSearch: 'false',
        highlightingEnabled: 'true',
      });
      return response.destinationEntities;
    } catch (error) {
      console.error('Error searching diseases:', error);
      throw error;
    }
  },

  getDiseaseDetails: async (code, language = 'es') => {
    try {
      return await cie11Service.makeAuthenticatedRequest(`${CIE11_API_BASE_URL}/${code}`, 'GET', { language });
    } catch (error) {
      console.error('Error fetching disease details:', error);
      throw error;
    }
  }
};

module.exports = cie11Service;