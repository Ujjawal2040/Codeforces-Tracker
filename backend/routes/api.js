const express = require('express');
const router = express.Router();
const axios = require('axios');
const Search = require('../models/Search');

// Codeforces API Base URL
const CF_API = 'https://codeforces.com/api';

// Route: GET /api/user/:handle
// Description: Fetch user info and rating changes
router.get('/user/:handle', async (req, res) => {
    const { handle } = req.params;

    try {
        // Fetch user info
        const userResponse = await axios.get(`${CF_API}/user.info?handles=${handle}`);
        if (userResponse.data.status !== 'OK') {
            return res.status(404).json({ message: 'User not found' });
        }

        const userData = userResponse.data.result[0];

        // Fetch rating changes
        const ratingResponse = await axios.get(`${CF_API}/user.rating?handle=${handle}`);
        const ratingChanges = ratingResponse.data.result;

        // Save or update search history (Optional - won't break the app if DB is down)
        try {
            await Search.findOneAndUpdate(
                { handle },
                { lastSearched: Date.now() },
                { upsert: true, new: true }
            );
        } catch (dbError) {
            console.warn('MongoDB history update failed:', dbError.message);
        }

        res.json({
            user: userData,
            ratingHistory: ratingChanges
        });
    } catch (error) {
        console.error('Error fetching data from Codeforces:', error.message);
        res.status(error.response?.status || 500).json({ 
            message: error.response?.data?.comment || 'Internal Server Error' 
        });
    }
});

// Route: GET /api/recent-searches
// Description: Get last 5 searched handles
router.get('/recent-searches', async (req, res) => {
    try {
        const searches = await Search.find().sort({ lastSearched: -1 }).limit(5);
        res.json(searches);
    } catch (error) {
        console.warn('MongoDB fetch history failed:', error.message);
        res.json([]); // Return empty array if DB is down
    }
});

module.exports = router;
