// Application constants
export const APP_NAME = 'Podcast Planner';
export const APP_VERSION = '1.0.0';

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// OAuth Configuration
export const OAUTH_REDIRECT_URI = import.meta.env.VITE_OAUTH_REDIRECT_URI || `${window.location.origin}/auth/callback`;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  CALLBACK: '/auth/callback',
  SECTIONS: '/sections',
  SECTION: '/sections/:id',
  PROFILE: '/profile',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  PROGRESS_CACHE: 'progress_cache',
} as const;

// Section Configuration
export const PODCAST_SECTIONS = [
  {
    id: 1,
    title: 'Show Concept & Format',
    description: 'Define your podcast concept, format, and target audience',
  },
  {
    id: 2,
    title: 'Content Planning',
    description: 'Plan your content calendar and episode structure',
  },
  {
    id: 3,
    title: 'Technical Setup',
    description: 'Equipment, software, and recording environment setup',
  },
  {
    id: 4,
    title: 'Branding & Design',
    description: 'Logo, artwork, and visual identity creation',
  },
  {
    id: 5,
    title: 'Recording Process',
    description: 'Recording techniques and workflow optimization',
  },
  {
    id: 6,
    title: 'Editing & Production',
    description: 'Post-production, editing, and audio enhancement',
  },
  {
    id: 7,
    title: 'Publishing & Distribution',
    description: 'Platform setup and episode distribution strategy',
  },
  {
    id: 8,
    title: 'Marketing & Growth',
    description: 'Promotion strategies and audience growth tactics',
  },
] as const;