const express = require('express');
const axios = require('axios');
const router = express.Router();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = process.env.TMDB_BASE_URL

// Get popular movies
router.get('/popular', async(req,res)=>{
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=1`
    );
    res.json(response.data);
    } catch (error) {
        console.log('Error fetching popular movies:', error)
        res.status(500).json({error: 'Failed to fetch popular movies'});
    }
});

router.get('/top-rated',async(req,res)=>{
    try {
        const response = await axios.get((`${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&page=1`));
        res.json(response.data);
        
    } catch (error) {
        console.log('Error fetching top rated movies:', error);
        res.status(500).json({error: 'Failed to fetch top rated movies'});
        
    }
})

// Get movie details
router.get('/:id',async(req,res)=>{
    try {
        const movieId = req.params.id;
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.log('Error fetching movie details:', error);
        res.status(500).json({error: 'Failed to fetch movie details'});
    }
})

// search movies
router.get('/search/:query',async(req,res)=>{
    try {
        const query = req.params.query;
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`);
        res.json(response.data);
        
    } catch (error) {
        console.log('Error searching movies:', error)
        res.status(500).json({error: 'Failed to search movies'});
        
    }

})

module.exports = router;
