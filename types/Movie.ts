// TMDB API Response Types
export interface TMDBMovie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TMDBMovieDetails extends TMDBMovie {
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  } | null;
  budget: number;
  genres: Array<{
    id: number;
    name: string;
  }>;
  homepage: string | null;
  imdb_id: string | null;
  origin_country: string[];
  production_companies: Array<{
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  revenue: number;
  runtime: number | null;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  tagline: string | null;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// Our app's simplified interfaces
export interface Movie {
  id: number;
  title: string;
  year: number;
  director: string;
  genre: string[];
  plot: string;
  rating: number;
  runtime: string;
  poster: string;
  backdrop: string;
  language: string;
  country: string;
  awards: string;
  actors: string[];
  cast: string;
  genres: string[];
  releaseDate: string;
  imdbRating: number;
  imdbVotes: string;
  type: string;
  boxOffice: string;
  production: string;
  website: string;
  response: string;
}

export interface MovieListItem {
  id: number;
  title: string;
  year: number;
  director: string;
  genre: string[];
  plot: string;
  rating: number;
  runtime: string;
  poster: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
