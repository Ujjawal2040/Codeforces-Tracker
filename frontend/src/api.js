import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchUserData = async (handle) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user/${handle}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch data';
    }
};

export const fetchRecentSearches = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/recent-searches`);
        return response.data;
    } catch (error) {
        console.error('Error fetching history:', error);
        return [];
    }
};
