# Movie App

A React Native app that interacts with The Movie Database (TMDB) API, demonstrating API integration, state management, and UI design.

## Features

- **Home Screen**: Displays a scrollable list of popular movies with search functionality
- **Movie Details**: Shows comprehensive information about selected movies
- **Search**: Real-time search with TMDB API integration
- **Modern UI**: Dark theme with beautiful, user-friendly design
- **Error Handling**: Proper error states and loading indicators
- **Pull to Refresh**: Refresh functionality for the movie list
- **Infinite Scroll**: Load more movies as you scroll

## API Integration

- **Popular Movies**: `https://api.themoviedb.org/3/movie/popular`
- **Search Movies**: `https://api.themoviedb.org/3/search/movie?query=[query]`
- **Movie Details**: `https://api.themoviedb.org/3/movie/{id}`
- **Image Base URL**: `https://image.tmdb.org/t/p/w500`

## Tech Stack

- React Native 0.81.1
- TypeScript
- React Navigation 7.x
- React Native Safe Area Context
- The Movie Database (TMDB) API

## Project Structure

```
MoviesApp/
├── components/
│   └── MovieItem.tsx          # Reusable movie list item component
├── navigation/
│   └── AppNavigator.tsx       # Navigation setup
├── screens/
│   ├── HomeScreen.tsx         # Main screen with movie list and search
│   └── MovieDetailScreen.tsx  # Movie details screen
├── services/
│   └── api.ts                 # TMDB API service for data fetching
├── types/
│   └── Movie.ts               # TypeScript interfaces for TMDB data
└── App.tsx                    # Main app component
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. For iOS:
   ```bash
   cd ios && pod install && cd ..
   npm run ios
   ```

3. For Android:
   ```bash
   npm run android
   ```

## Features Implemented

✅ **Home Screen (Movies List)**
- Fetch popular movies from TMDB API
- Display in scrollable FlatList with infinite scroll
- Show title, year, rating, plot, and poster for each movie
- Pagination support (20 items per page)

✅ **Search Functionality**
- Search bar at the top
- Real-time search using TMDB search API
- Dynamic list updates with search results

✅ **Movie Detail Screen**
- Navigate on movie tap
- Fetch detailed movie information from TMDB
- Display comprehensive movie details

✅ **UI Design**
- User-friendly dark theme with gold accents
- Error handling for failed requests
- Loading spinners and skeleton loaders
- Pull-to-refresh functionality
- Infinite scroll for better performance

✅ **Code Quality**
- Clean, readable TypeScript code
- Proper componentization
- Reusable MovieItem component
- Effective state management with hooks
- TMDB API integration with proper error handling

## TMDB API Data Structure

The app handles the following TMDB movie data structure:

```typescript
interface TMDBMovie {
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
```

## Key Features

### 🎬 **Movie Discovery**
- Browse popular movies from TMDB
- High-quality movie posters
- Real-time search functionality
- Infinite scroll for seamless browsing

### 🔍 **Advanced Search**
- Search by movie title
- Instant results as you type
- Pagination support for search results
- Clear search functionality

### 📱 **Modern UI/UX**
- Dark theme optimized for movie browsing
- Smooth animations and transitions
- Responsive design for all screen sizes
- Intuitive navigation

### ⚡ **Performance Optimized**
- FlatList for efficient rendering
- Image caching and optimization
- Lazy loading with infinite scroll
- Proper memory management

## Error Handling

The app includes comprehensive error handling for:
- Network connectivity issues
- API failures and rate limiting
- Empty search results
- Invalid movie IDs
- Loading states and timeouts

## API Authentication

The app uses TMDB API with Bearer token authentication:
- Secure API key management
- Proper request headers
- Error handling for authentication issues

## Performance Optimizations

- FlatList for efficient rendering of large lists
- useCallback for optimized re-renders
- Proper key extraction for list items
- Image loading with fallback placeholders
- Infinite scroll to reduce initial load time
- Pagination for better API performance

## Future Enhancements

- Movie trailers integration
- User favorites and watchlist
- Movie recommendations
- Advanced filtering options
- Offline support with caching
- User reviews and ratings
