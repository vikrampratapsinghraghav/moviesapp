# MyFlix - Movie Discovery App

<div align="center">
  <img src="https://img.shields.io/badge/React%20Native-0.81-blue.svg" alt="React Native Version" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue.svg" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Platform-iOS%20%7C%20Android-lightgrey.svg" alt="Platform" />
  <img src="https://img.shields.io/badge/API-TMDB-red.svg" alt="API" />
</div>

<br />

A modern, Netflix-inspired movie discovery app built with React Native and TypeScript. Browse trending movies, search for your favorites, and discover new content with a beautiful, responsive interface.

## 🎬 Features

### ✨ Core Functionality
- **Movie Discovery**: Browse popular, trending, and top-rated movies
- **Advanced Search**: Real-time search with debounced API calls
- **Movie Details**: Comprehensive movie information with cast, crew, and ratings
- **Responsive Design**: Optimized for both iOS and Android devices

### 🎨 User Experience
- **Netflix-Style UI**: Dark theme with modern, sleek design
- **Smooth Animations**: Entrance animations and interactive feedback
- **Infinite Scroll**: Seamless browsing with pagination
- **Pull-to-Refresh**: Easy content updates
- **Loading States**: Skeleton loaders and loading indicators

### 🔧 Technical Features
- **TypeScript**: Full type safety and better development experience
- **Custom Hooks**: Reusable logic for movies, search, and scroll state
- **Separated Styles**: Clean architecture with dedicated style files
- **Error Handling**: Comprehensive error states and retry mechanisms
- **Performance Optimized**: Memoized components and efficient rendering

## 📱 Screenshots

<div align="center">
  <img src="https://via.placeholder.com/300x600/141414/ffffff?text=Home+Screen" alt="Home Screen" width="200" />
  <img src="https://via.placeholder.com/300x600/141414/ffffff?text=Search+Results" alt="Search Results" width="200" />
  <img src="https://via.placeholder.com/300x600/141414/ffffff?text=Movie+Details" alt="Movie Details" width="200" />
</div>

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- React Native CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)
- Xcode (for iOS development on macOS)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/myflix-movie-app.git
   cd myflix-movie-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **iOS Setup**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start Metro bundler**
   ```bash
   npx react-native start --reset-cache
   ```

5. **Run the app**
   ```bash
   # iOS
   npx react-native run-ios
   
   # Android
   npx react-native run-android
   ```

## 🏗️ Project Structure

```
MoviesApp/
├── components/           # Reusable UI components
│   ├── movies/          # Movie-specific components
│   ├── ui/              # Generic UI components
│   └── index.ts         # Component exports
├── constants/           # App constants and theme
│   └── theme.ts         # Colors, dimensions, typography
├── hooks/               # Custom React hooks
│   ├── useMovies.ts     # Movie data management
│   ├── useSearch.ts     # Search functionality
│   └── useScrollState.ts # Scroll state management
├── navigation/          # Navigation configuration
│   └── AppNavigator.tsx # Stack navigator setup
├── screens/             # App screens
│   ├── HomeScreen.tsx   # Main movie list screen
│   └── MovieDetailScreen.tsx # Movie details screen
├── services/            # API and external services
│   └── api.ts           # TMDB API integration
├── styles/              # Separated style files
│   ├── components/      # Component-specific styles
│   ├── screens/         # Screen-specific styles
│   ├── utils.ts         # Style utility functions
│   └── index.ts         # Style exports
├── types/               # TypeScript type definitions
│   └── Movie.ts         # Movie-related types
└── App.tsx              # Main app component
```

## 🎯 Key Components

### Custom Hooks

- **`useMovies`**: Manages movie data, pagination, and API calls
- **`useSearch`**: Handles search functionality with debouncing
- **`useScrollState`**: Manages scroll state to prevent accidental taps

### UI Components

- **`MovieItem`**: Individual movie card with animations
- **`SearchInput`**: Debounced search input with loading state
- **`HeroBanner`**: Featured movie banner
- **`MovieSection`**: Horizontal movie lists
- **`LoadingSpinner`**: Reusable loading indicator
- **`EmptyState`**: Error and empty state components

## 🎨 Design System

### Theme
- **Primary Color**: Netflix Red (#e50914)
- **Background**: Dark (#141414)
- **Typography**: System fonts with consistent sizing
- **Spacing**: 8px base unit with consistent scale

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Primary and secondary variants
- **Inputs**: Consistent styling with focus states
- **Animations**: Smooth transitions and micro-interactions

## 🔌 API Integration

### The Movie Database (TMDB)
- **Base URL**: `https://api.themoviedb.org/3`
- **Authentication**: Bearer token
- **Endpoints Used**:
  - `/movie/popular` - Popular movies
  - `/search/movie` - Movie search
  - `/movie/{id}` - Movie details
  - `/movie/{id}/credits` - Cast and crew

### Data Flow
1. **Fetch Movies**: Load popular movies on app start
2. **Search**: Debounced search with real-time results
3. **Details**: Fetch comprehensive movie information
4. **Credits**: Get director and cast information

## 🛠️ Development

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and formatting
- **Prettier**: Consistent code formatting
- **Component Architecture**: Separated concerns and reusable components

### Performance
- **Memoization**: React.memo for expensive components
- **Debouncing**: Search input with 400ms delay
- **Lazy Loading**: Images loaded on demand
- **Optimized Renders**: useCallback and useMemo hooks

### Testing
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📦 Dependencies

### Core
- **React Native**: 0.81
- **TypeScript**: 5.0
- **React Navigation**: 6.x

### UI & Styling
- **React Native Safe Area Context**: Safe area handling
- **React Native Vector Icons**: Icon library

### Development
- **Metro**: React Native bundler
- **Flipper**: Debugging and development tools

## 🚀 Deployment

### iOS
1. Configure signing in Xcode
2. Build for release: `npx react-native run-ios --configuration Release`
3. Archive and upload to App Store Connect

### Android
1. Generate signed APK: `cd android && ./gradlew assembleRelease`
2. Upload to Google Play Console

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m "Add amazing feature"`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## �� License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **The Movie Database (TMDB)** for providing the movie data API
- **React Native Community** for excellent documentation and tools
- **Netflix** for design inspiration

## 📞 Contact

**Developer**: Your Name  
**Email**: your.email@example.com  
**LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)  
**Portfolio**: [Your Portfolio Website](https://yourwebsite.com)

---

<div align="center">
  <p>Made with ❤️ using React Native</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
