const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const movieRoutes = require('./routes/movies');

// Use routes
app.use('/api/movies', movieRoutes);

// Health check route
app.get('/', (req,res)=>{
    res.json({message: 'TMDB Backend API is running!'});
});

// Start the server
app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`)
})