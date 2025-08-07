import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {movieAPI, getImageUrl} from '../services/api';
import './Home.css'; // ← Import the CSS file

const Home = () => {
    const [movies,setMovies] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    const [searchQuery,setSearchQuery] = useState('')
    const [isSearching,setIsSearching] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                console.log('🔄 Fetching popular movies...');
                const data = await movieAPI.getPopularMovies();
                console.log('✅ Movies loaded:', data.results?.length);
                setMovies(data.results || []);
            } catch (error) {
                console.log('Failed to fetch movies:', error);
                setError('Failed to load movies. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchMovies();
    }, []);

    const handleSearch = async(event)=>{
        event.preventDefault(); //prevent from reloading the page
        if(!searchQuery.trim()) return; //if search query is empty, do nothing

        setIsSearching(true);
        try{
            const data = await movieAPI.searchMovies(searchQuery);
            setMovies(data.results || []);
        }catch(error){
            console.error('Error searching movies:', error);
            setError('Failed to search movies. Please try again later.');
        }finally{
            setIsSearching(false);
        }

    }

    const clearSearch = async()=>{
        setSearchQuery('');
        setLoading(true);
        try{
            const data = await movieAPI.getPopularMovies();
            setMovies(data.results || []);
        }catch(error){
            console.error('Error fetching popular movies:', error);
            setError('Failed to load popular movies. Please try again later.');
        }finally{
            setLoading(false);
        }
    }

        // In any component:
    // const loadTopRatedMovies = async () => {
    //     const data = await movieAPI.getTopRatedMovies();
    //     setMovies(data.results);
    // };

    // const loadTrendingMovies = async () => {
    //     const data = await movieAPI.getTrendingMovies();
    //     setMovies(data.results);
    // };

    // const loadUpcomingMovies = async () => {
    //     const data = await movieAPI.getUpcomingMovies();
    //     setMovies(data.results);
    // };



    const handleMovieClick = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                🔄 Loading popular movies...
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <h2 className="error-title">❌ {error}</h2>
                <button className="retry-button" onClick={() => window.location.reload()}>
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="home-container">
            {/* Header */}
            <header className="hero-header">
                <h1 className="hero-title">Welcome</h1>
                <p className="hero-subtitle">
                    Millions of movies, TV shows and people to discover. Explore now.
                </p>
                { /* Search Bar */}
                <div className = "search-container">
                    <form onSubmit = {handleSearch} className = "search-form">
                        <input
                            type = "text"
                            placeholder = "Search for a movie, tv show, person..."
                            value = {searchQuery}
                            onChange = {(e) => setSearchQuery(e.target.value)}
                            className = "search-input"
                        />
                        <button type = "submit" disabled = {isSearching} className = "search-button">
                            Search
                        </button>
                        {searchQuery && (
                            <button 
                            type="button"
                            onClick={clearSearch}
                            className = "clear-button"
                            >Clear</button>

                        )}
                    </form>
                </div>
            </header>

            {/* Movies Grid */}
            <div className="movies-grid">
                {movies.map(movie => (
                    <div 
                        key={movie.id}
                        className="movie-card"
                        onClick={() => handleMovieClick(movie.id)}
                    >
                        {/* Movie Poster */}
                        <div className="movie-poster-container">
                            <img 
                                src={getImageUrl(movie.poster_path)} 
                                alt={movie.title}
                                className="movie-poster"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/300x450/cccccc/666666?text=No+Image';
                                }}
                            />
                            {/* Rating Badge */}
                            <div className="rating-badge">
                                ⭐ {movie.vote_average?.toFixed(1)}
                            </div>
                        </div>

                        {/* Movie Info */}
                        <div className="movie-info">
                            <h3 className="movie-title">{movie.title}</h3>
                            
                            <p className="movie-overview">{movie.overview}</p>

                            <div className="movie-meta">
                                <span className="release-year">
                                    📅 {new Date(movie.release_date).getFullYear()}
                                </span>
                                
                                <span className="view-details-badge">
                                    View Details →
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;