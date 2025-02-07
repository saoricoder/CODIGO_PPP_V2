
import {API_URL} from './apiConfig';

const cie11Service = {
  searchDiseases: async (query) => {
    const response = await fetch(`${API_URL}/cie11/search?query=${query}`);
    return response.json();
  },
};

export default cie11Service;