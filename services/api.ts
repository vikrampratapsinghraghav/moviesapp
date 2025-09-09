import { TMDBMovie, TMDBMovieDetails, TMDBResponse, Movie, MovieListItem } from "../types/Movie";

const BASE_URL = "https://api.themoviedb.org/3";
const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWExYzRhYzVkZTc4MDE1YzU2YmZmNWYxMDU5NzNjOCIsIm5iZiI6MTc1NzQwNTE4OS4zMjYwMDAyLCJzdWIiOiI2OGJmZTAwNWEwYTgwYWQxMTE0ZTY4OGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.KrGvba5xNLEbao7IwDMhHSkfGmjbnwMVxkGCKtTDUDY";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const getHeaders = () => ({
  "Authorization": `Bearer ${BEARER_TOKEN}`,
  "accept": "application/json",
});

export class ApiService {
  static async fetchMovies(page: number = 1): Promise<MovieListItem[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/popular?page=${page}`,
        {
          headers: getHeaders(),
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: TMDBResponse<TMDBMovie> = await response.json();
      return data.results.map(movie => this.transformMovieListItem(movie));
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw new Error("Failed to fetch movies");
    }
  }

  static async searchMovies(query: string, page: number = 1): Promise<MovieListItem[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
        {
          headers: getHeaders(),
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: TMDBResponse<TMDBMovie> = await response.json();
      return data.results.map(movie => this.transformMovieListItem(movie));
    } catch (error) {
      console.error("Error searching movies:", error);
      throw new Error("Failed to search movies");
    }
  }

  static async fetchMovieById(id: number): Promise<Movie> {
    try {
      // Fetch movie details
      const movieResponse = await fetch(
        `${BASE_URL}/movie/${id}`,
        {
          headers: getHeaders(),
        }
      );
      
      if (!movieResponse.ok) {
        throw new Error(`HTTP error! status: ${movieResponse.status}`);
      }
      
      const movieData: TMDBMovieDetails = await movieResponse.json();
      
      // Fetch credits to get director and cast
      const creditsResponse = await fetch(
        `${BASE_URL}/movie/${id}/credits`,
        {
          headers: getHeaders(),
        }
      );
      
      let director = "N/A";
      let cast = "N/A";
      
      if (creditsResponse.ok) {
        const creditsData = await creditsResponse.json();
        const directorInfo = creditsData.crew.find((person: any) => person.job === "Director");
        if (directorInfo) {
          director = directorInfo.name;
        }
        
        if (creditsData.cast && creditsData.cast.length > 0) {
          cast = creditsData.cast.slice(0, 5).map((actor: any) => actor.name).join(", ");
        }
      }
      
      return this.transformMovieDetails(movieData, director, cast);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      throw new Error("Failed to fetch movie details");
    }
  }

  private static transformMovieListItem(tmdbMovie: TMDBMovie): MovieListItem {
    return {
      id: tmdbMovie.id,
      title: tmdbMovie.title,
      year: new Date(tmdbMovie.release_date).getFullYear(),
      director: "N/A", // TMDB doesn't provide director in list view
      genre: [], // Will be populated from genre_ids if needed
      plot: tmdbMovie.overview,
      rating: tmdbMovie.vote_average,
      runtime: "N/A", // Not available in list view
      poster: tmdbMovie.poster_path ? `${IMAGE_BASE_URL}${tmdbMovie.poster_path}` : "",
    };
  }

  private static transformMovieDetails(tmdbMovie: TMDBMovieDetails, director: string, cast: string): Movie {
    return {
      id: tmdbMovie.id,
      title: tmdbMovie.title,
      year: new Date(tmdbMovie.release_date).getFullYear(),
      director: director,
      genre: tmdbMovie.genres.map(g => g.name),
      plot: tmdbMovie.overview,
      rating: tmdbMovie.vote_average,
      runtime: tmdbMovie.runtime ? `${tmdbMovie.runtime} min` : "N/A",
      poster: tmdbMovie.poster_path ? `${IMAGE_BASE_URL}${tmdbMovie.poster_path}` : "",
      backdrop: tmdbMovie.backdrop_path ? `${IMAGE_BASE_URL}${tmdbMovie.backdrop_path}` : "",
      language: tmdbMovie.original_language,
      country: tmdbMovie.production_countries.map(c => c.name).join(", "),
      awards: "N/A", // Not available in TMDB basic API
      actors: [], // Would need credits endpoint
      cast: cast,
      genres: tmdbMovie.genres.map(g => g.name),
      releaseDate: tmdbMovie.release_date,
      imdbRating: tmdbMovie.vote_average,
      imdbVotes: tmdbMovie.vote_count.toString(),
      type: "movie",
      boxOffice: tmdbMovie.revenue ? `$${tmdbMovie.revenue.toLocaleString()}` : "N/A",
      production: tmdbMovie.production_companies.map(p => p.name).join(", "),
      website: tmdbMovie.homepage || "N/A",
      response: "True",
    };
  }
}
