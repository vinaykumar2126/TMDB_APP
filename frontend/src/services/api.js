const API_BASE_URL = 'http://localhost:5000/api';

export const movieAPI = {
    getPopularMovies: async()=>{
        try {
            // Frontend sends HTTP request to YOUR backend
            const response = await fetch(`${API_BASE_URL}/movies/popular`);
            if(!response.ok){
                throw new Error('Failed to fetch popular movies');
            }
            else{
                return await response.json(); // Converts response to JavaScript object
            }
            
        } catch (error) {
            console.error('Error fetching popular movies:', error);
            throw error
        }

    },

    searchMovies: async(query)=>{
        try {
            const response = await fetch(`${API_BASE_URL}/movies/search/${encodeURIComponent(query)}`);//fetch request to backend
            if(!response.ok){
                throw new Error("Failed to search movies");
            }
            //gets the response in the form of string
            //and converts it to a JavaScript object
            return await response.json();
        } catch (error) {
            console.error('Error searching movies:', error);
            throw error;
        }
    },
    getTopRatedMovies: async()=>{
        try {
            const response = await fetch(`${API_BASE_URL}/movies/top-rated`);
            if(!response.ok){
                throw new Error('Failed to fetch top rated movies');
            }
            return await response.json();
            
        } catch (error) {
            console.error('Error fetching top rated movies:', error);
            throw error;
        }
    },
    getTrendingMovies: async() => {
        try {
            const response = await fetch(`${API_BASE_URL}/movies/trending`);
            if(!response.ok){
                throw new Error('Failed to fetch trending movies');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching trending movies:', error);
            throw error;
        }
    },
    getUpcomingMovies: async() => {
        try {
            const response = await fetch(`${API_BASE_URL}/movies/upcoming`);
            if(!response.ok){
                throw new Error('Failed to fetch upcoming movies');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching upcoming movies:', error);
            throw error;
        }
    },
    getNowPlayingMovies: async() => {
        try {
            const response = await fetch(`${API_BASE_URL}/movies/now-playing`);
            if(!response.ok){
                throw new Error('Failed to fetch now playing movies');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching now playing movies:', error);
            throw error;
        }
    }



};
export const getImageUrl = (posterPath, size = 'w500') => {
  if (!posterPath) return '/placeholder-movie.jpg';
  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
};