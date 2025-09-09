import { TMDBMovie, TMDBMovieDetails, TMDBResponse, MovieListItem, Movie } from '../types/Movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWExYzRhYzVkZTc4MDE1YzU2YmZmNWYxMDU5NzNjOCIsIm5iZiI6MTc1NzQwNTE4OS4zMjYwMDAyLCJzdWIiOiI2OGJmZTAwNWEwYTgwYWQxMTE0ZTY4OGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.KrGvba5xNLEbao7IwDMhHSkfGmjbnwMVxkGCKtTDUDY';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export class ApiService {
  static async fetchMovies(page: number = 1): Promise<MovieListItem[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/popular?page=${page}`,
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: TMDBResponse<TMDBMovie> = await response.json();
      return data.results.map(this.transformMovieListItem);
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw new Error('Failed to fetch movies. Please check your internet connection.');
    }
  }

  static async searchMovies(query: string, page: number = 1): Promise<MovieListItem[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: TMDBResponse<TMDBMovie> = await response.json();
      return data.results.map(this.transformMovieListItem);
    } catch (error) {
      console.error('Error searching movies:', error);
      throw new Error('Failed to search movies. Please try again.');
    }
  }

  static async fetchMovieById(id: number): Promise<Movie> {
    try {
      const headers = {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      } as const;

      const [detailsRes, creditsRes] = await Promise.all([
        fetch(`${BASE_URL}/movie/${id}`, { headers }),
        fetch(`${BASE_URL}/movie/${id}/credits`, { headers }),
      ]);

      if (!detailsRes.ok) {
        throw new Error(`HTTP error! status: ${detailsRes.status}`);
      }
      if (!creditsRes.ok) {
        throw new Error(`HTTP error! status: ${creditsRes.status}`);
      }

      const data: TMDBMovieDetails = await detailsRes.json();
      const credits: any = await creditsRes.json();

      const movie = this.transformMovieDetails(data);

      // Extract director from crew and top actors from cast
      try {
        const director = Array.isArray(credits?.crew)
          ? credits.crew.find((c: any) => c?.job === 'Director')?.name || 'N/A'
          : 'N/A';
        const actors = Array.isArray(credits?.cast)
          ? credits.cast.slice(0, 6).map((c: any) => c?.name).filter(Boolean)
          : [];
        return { ...movie, director, actors };
      } catch {
        return movie;
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw new Error('Failed to fetch movie details. Please try again.');
    }
  }
  private static transformMovieListItem(tmdbMovie: TMDBMovie): MovieListItem {
    return {
      id: tmdbMovie.id,
      title: tmdbMovie.title,
      year: new Date(tmdbMovie.release_date).getFullYear(),
      director: 'N/A', // TMDB doesn't provide director in list view
      genre: [], // Will be populated from genre_ids if needed
      plot: tmdbMovie.overview,
      rating: tmdbMovie.vote_average,
      runtime: 'N/A', // Not available in list view
      poster: tmdbMovie.poster_path ? `${IMAGE_BASE_URL}${tmdbMovie.poster_path}` : '',
    };
  }

  private static transformMovieDetails(tmdbMovie: TMDBMovieDetails): Movie {
    return {
      id: tmdbMovie.id,
      title: tmdbMovie.title,
      year: new Date(tmdbMovie.release_date).getFullYear(),
      director: 'N/A', // TMDB doesn't provide director in basic API
      genre: tmdbMovie.genres.map(g => g.name),
      plot: tmdbMovie.overview,
      rating: tmdbMovie.vote_average,
      runtime: tmdbMovie.runtime ? `${tmdbMovie.runtime} min` : 'N/A',
      poster: tmdbMovie.poster_path ? `${IMAGE_BASE_URL}${tmdbMovie.poster_path}` : '',
      language: tmdbMovie.original_language,
      country: tmdbMovie.production_countries.map(c => c.name).join(', '),
      awards: 'N/A', // Not available in TMDB basic API
      actors: [], // Would need credits endpoint
      imdbRating: tmdbMovie.vote_average,
      imdbVotes: tmdbMovie.vote_count.toString(),
      type: 'movie',
      boxOffice: tmdbMovie.revenue ? `$${tmdbMovie.revenue.toLocaleString()}` : 'N/A',
      production: tmdbMovie.production_companies.map(p => p.name).join(', '),
      website: tmdbMovie.homepage || 'N/A',
      response: 'True',
    };
  }
}
