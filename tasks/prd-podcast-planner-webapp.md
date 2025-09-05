# Product Requirements Document: Podcast Planner Web Application

## Introduction/Overview
Build a full-stack Single Page Application (SPA) for Coach Nikita's podcast planner program using OAuth 2.0 PKCE flows with react-oidc-context and a stateless Flask API backend. The React frontend handles Google/Facebook OAuth authentication using the Authorization Code flow with PKCE for maximum security, while the Flask backend validates OAuth access tokens and serves as a pure API. This architecture follows 2025 security best practices for SPAs.

## Goals
1. **Create a secure, scalable web application** using Flask backend + React frontend
2. **Implement industry-standard OAuth authentication** (Google/Facebook) with session management
3. **Build reusable page templates** with consistent styling and smooth SPA transitions
4. **Establish automated database migrations** with PostgreSQL and proper ORM patterns
5. **Deliver production-ready containerized application** with Docker Compose for local development
6. **Implement comprehensive CSS testing** with visual regression testing capabilities

## User Stories
- **As a podcast creator**, I want to authenticate via Google/Facebook OAuth directly in the React app so that I can access my personalized dashboard immediately without server redirects
- **As a user**, I want to navigate through 8 structured sections with smooth, elegant transitions so that the experience feels polished and professional
- **As a user**, I want to see my progress visually tracked so that I stay motivated to complete the program
- **As a developer**, I want automated database migrations and proper testing so that I can deploy updates confidently
- **As a system administrator**, I want containerized applications with proper security so that deployment and scaling is straightforward

## MVP Definition
**Core MVP Features:**
1. Frontend OAuth 2.0 PKCE authentication (Google + Facebook) with automatic token refresh and secure storage
2. Dashboard showing 8-section progress with visual indicators
3. Section-level completion tracking stored in PostgreSQL database
4. Smooth glassmorphism transitions between dashboard and section views
5. Responsive design working on mobile and desktop
6. Automated database migrations with proper rollback capabilities
7. Docker Compose setup for local development with PostgreSQL

**MVP Success Criteria:**
- User can authenticate via OAuth 2.0 PKCE flow and maintain secure sessions with automatic token refresh handled by oidc-client-ts
- Progress is persisted and displayed accurately
- All CSS tests pass (visual regression + accessibility)
- Application starts successfully with single `docker-compose up` command

## Functional Requirements

### Must Have (MVP)
1. **M001:** System MUST authenticate users via OAuth 2.0 PKCE flow using react-oidc-context with Google and Facebook providers
2. **M002:** System MUST store user progress in PostgreSQL database with proper relational design
3. **M003:** System MUST display dashboard with 8-section progress cards using React components
4. **M004:** System MUST implement glassmorphism transitions when navigating between views
5. **M005:** System MUST use Flask-SQLAlchemy ORM with Alembic for automated database migrations
6. **M006:** System MUST validate OAuth access tokens on Flask backend using provider's token introspection endpoint
7. **M007:** System MUST provide responsive design supporting mobile devices (320px+) and desktop
8. **M008:** System MUST containerize frontend and backend with Docker Compose configuration

### Should Have
9. **S001:** System SHOULD implement visual regression testing using Percy or Chromatic
10. **S002:** System SHOULD provide accessibility compliance (WCAG 2.1 AA minimum)
11. **S003:** System SHOULD implement API rate limiting and request validation
12. **S004:** System SHOULD provide proper error handling and user feedback

### Could Have
13. **C001:** System COULD implement real-time progress synchronization across multiple devices
14. **C002:** System COULD provide export functionality for user progress
15. **C003:** System COULD implement dark mode with system preference detection

### Won't Have (MVP)
16. **W001:** System WON'T implement custom user registration/password management
17. **W002:** System WON'T include payment processing or subscription management
18. **W003:** System WON'T provide admin panel or content management interface

## Key Function Signatures

### Backend (Flask API with OAuth Token Validation)
```python
import requests
from functools import wraps
from flask import request, jsonify

# OAuth Token Validation Middleware
def require_oauth_auth(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        access_token = request.headers.get('Authorization', '').replace('Bearer ', '')
        if not access_token:
            return jsonify({'error': 'No access token provided'}), 401
        
        # Validate token with OAuth provider (Google/Facebook)
        user_info = validate_oauth_token(access_token)
        if not user_info:
            return jsonify({'error': 'Invalid access token'}), 401
            
        request.current_user = user_info
        return f(*args, **kwargs)
    return decorated_function

def validate_oauth_token(access_token: str) -> dict:
    """Validate token with Google/Facebook userinfo endpoint"""
    try:
        # Google userinfo endpoint
        response = requests.get(
            f'https://www.googleapis.com/oauth2/v2/userinfo?access_token={access_token}'
        )
        if response.status_code == 200:
            return response.json()
        return None
    except Exception:
        return None

# Protected API Endpoints
@api_bp.route('/api/user/progress')
@require_oauth_auth
def get_user_progress() -> Dict[str, Any]:
    oauth_id = request.current_user['id']
    # Get user progress from database

@api_bp.route('/api/user/progress', methods=['POST'])
@require_oauth_auth
def update_progress() -> Dict[str, str]:
    oauth_id = request.current_user['id']
    # Update user progress

# Database Models
class User(db.Model):
    oauth_id = db.Column(db.String(128), unique=True, nullable=False)
    email = db.Column(db.String(120), nullable=False)
    name = db.Column(db.String(100))
    provider = db.Column(db.String(50))  # 'google', 'facebook'
    picture = db.Column(db.String(255))

class UserProgress(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    section_id = db.Column(db.Integer, nullable=False)
    completion_percentage = db.Column(db.Float, default=0.0)
```

### Frontend (React with OAuth PKCE)
```typescript
import { useAuth } from 'react-oidc-context';
import { User } from 'oidc-client-ts';

// OAuth Auth Context (provided by react-oidc-context)
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  signinRedirect: () => Promise<void>;
  signoutRedirect: () => Promise<void>;
  removeUser: () => Promise<void>;
}

// OAuth User Profile
interface OAuthUser {
  sub: string;  // OAuth subject identifier
  email: string;
  name: string;
  picture?: string;
  provider: 'google' | 'facebook';
}

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// OAuth Configuration
interface OAuthConfig {
  authority: string;  // OAuth provider authority URL
  client_id: string;
  redirect_uri: string;
  response_type: 'code';
  scope: string;
  post_logout_redirect_uri?: string;
}

// API Client with OAuth Token
interface ApiClientConfig {
  baseURL: string;
  getAuthHeader: () => { Authorization: string } | {};
}
```

## Interface Definitions

### API Contract
```yaml
# GET /api/user/progress
Response:
  200:
    content:
      application/json:
        schema:
          type: object
          properties:
            sections:
              type: array
              items:
                type: object
                properties:
                  id: { type: integer }
                  title: { type: string }
                  completion_percentage: { type: number }
                  last_updated: { type: string, format: date-time }

# POST /api/user/progress
Request:
  content:
    application/json:
      schema:
        type: object
        properties:
          section_id: { type: integer }
          completion_percentage: { type: number, minimum: 0, maximum: 100 }
        required: [section_id, completion_percentage]
```

### Database Schema
```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    oauth_id VARCHAR(255) UNIQUE NOT NULL,
    provider VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- User progress table
CREATE TABLE user_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    section_id INTEGER NOT NULL,
    completion_percentage FLOAT DEFAULT 0.0,
    section_data JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

## Technical Standards

### Backend Standards
- **Framework:** Flask 3.1+ with Flask-SQLAlchemy 3.1+
- **Authentication:** OAuth 2.0 access token validation via provider userinfo endpoints
- **Database:** PostgreSQL 16+ with psycopg3 driver (latest for 2025)
- **ORM/Migrations:** SQLAlchemy 2.1+ with Alembic via Flask-Migrate
- **API:** RESTful API design with proper HTTP status codes
- **Security:** Flask-CORS for cross-origin requests, OAuth access tokens for authentication
- **Environment:** python-dotenv for configuration, OAuth client credentials
- **Validation:** Marshmallow or Pydantic for request/response validation

### Frontend Standards
- **Framework:** React 18.3+ with TypeScript 5.6+
- **Build Tool:** Vite 6.0+ for fast development and building
- **Authentication:** react-oidc-context 3.3.0+ with oidc-client-ts 3.3.0+
- **OAuth Providers:** Direct integration with Google/Facebook OAuth 2.0 endpoints
- **Styling:** Tailwind CSS 4.0+ with custom brand colors from existing mockups
- **State Management:** React Context API for auth state + user progress
- **HTTP Client:** Axios with OAuth access token interceptors
- **Animations:** Framer Motion for glassmorphism transitions
- **Testing:** Jest + React Testing Library + OAuth mock providers

### DevOps Standards
- **Containerization:** Docker with multi-stage builds, Docker Compose for development
- **Database:** PostgreSQL Helm chart for local development
- **Code Quality:** ESLint, Prettier, Flake8, Black for code formatting
- **Git Hooks:** pre-commit hooks for code quality checks
- **Documentation:** OpenAPI/Swagger for API documentation

## API Contract Definitions

### Error Response Schema
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid section_id provided",
    "details": {
      "field": "section_id",
      "constraint": "Must be between 1 and 8"
    }
  },
  "timestamp": "2025-09-05T04:27:35Z",
  "request_id": "req_abc123"
}
```

### Status Codes
- **200:** Successful GET requests
- **201:** Successful resource creation
- **400:** Bad request (validation errors)
- **401:** Unauthorized (authentication required)
- **403:** Forbidden (insufficient permissions)
- **404:** Resource not found
- **429:** Rate limit exceeded
- **500:** Internal server error

## Non-Goals (Out of Scope)
- Custom authentication system implementation
- Payment processing or subscription management
- Admin panel for content management
- Real-time collaboration features
- Mobile native applications
- Email notification system
- Advanced analytics or reporting dashboard

## Future Iterations
- **Phase 2:** Content management system for updating section content
- **Phase 3:** Advanced progress analytics and reporting
- **Phase 4:** Social features (sharing progress, community aspects)
- **Phase 5:** Mobile applications (React Native)
- **Phase 6:** Integration with podcast hosting platforms

## Design Considerations

### Visual Design
- **Base Template:** Extend existing mockup-option-1.html with proper template inheritance
- **Brand Colors:** Use authentic Thrive with Nikita colors (pewter-blue, coral, baby-pink, gainsboro, cookies-cream)
- **Typography:** Crimson Text for headings, Muli for body text
- **Glassmorphism Effects:** CSS backdrop-filter with blur effects, subtle transparency overlays
- **Responsive Breakpoints:** 320px (mobile), 768px (tablet), 1024px (desktop), 1440px (large desktop)

### UX Patterns
- **Loading States:** Skeleton screens during data fetching
- **Error States:** User-friendly error messages with recovery actions
- **Success Feedback:** Subtle animations and progress celebrations
- **Navigation:** Breadcrumb navigation for section context

## Technical Considerations

### Security Requirements
- **HTTPS:** Force HTTPS in production with HSTS headers
- **PKCE Security:** OAuth 2.0 Authorization Code flow with PKCE for maximum SPA security
- **Token Validation:** Backend validates OAuth access tokens via provider userinfo endpoints
- **CORS:** Proper CORS configuration for SPA-API communication
- **OAuth Configuration:** OAuth client IDs and endpoints stored in environment variables
- **Input Validation:** Server-side validation for all user inputs
- **Rate Limiting:** API rate limiting per authenticated OAuth user
- **Token Storage:** Secure token storage managed by oidc-client-ts (sessionStorage/localStorage with encryption)

### Performance Requirements
- **Page Load:** Initial page load under 3 seconds on 3G connection
- **Transitions:** Smooth 60fps animations even on lower-end devices
- **API Response:** API responses under 500ms for standard operations
- **Database:** Proper indexing on user_id and section_id columns

### Scalability Considerations
- **Database Connection Pooling:** SQLAlchemy connection pooling configured
- **Caching Strategy:** Redis for session storage (future consideration)
- **CDN Ready:** Static assets served with proper cache headers
- **Horizontal Scaling:** Stateless application design for load balancing

## Success Metrics
1. **Authentication Success Rate:** >99% successful OAuth logins
2. **Performance:** <3 second initial page load, <500ms API responses
3. **User Engagement:** Users complete average of 4+ sections
4. **Technical Quality:** 100% CSS test pass rate, 0 critical security vulnerabilities
5. **Development Velocity:** Database migrations deploy without downtime
6. **Accessibility:** WCAG 2.1 AA compliance score >95%

## CSS Testing Strategy

### Visual Regression Testing
- **Tool:** Percy (BrowserStack) for comprehensive cross-browser testing
- **Coverage:** Dashboard, section views, authentication flows, responsive breakpoints
- **CI Integration:** Automated visual diff detection in pull requests
- **Baseline Management:** Smart baseline updates for legitimate design changes

### CSS Unit Testing
- **Framework:** Jest with JSDOM for CSS utility testing
- **Coverage:** Component styling, responsive behavior, animation states
- **Accessibility:** Automated contrast ratio and focus state testing
- **Performance:** CSS bundle size monitoring and unused CSS detection

### Testing Scope
```javascript
// Example CSS test structure
describe('Dashboard Component Styles', () => {
  test('applies correct brand colors', () => {
    // Test pewter-blue, coral, baby-pink color applications
  });
  
  test('responsive grid layout', () => {
    // Test grid behavior at different breakpoints
  });
  
  test('glassmorphism effects', () => {
    // Test backdrop-blur and transparency values
  });
});
```

## Open Questions
1. **OAuth Provider Priority:** Should Google or Facebook be the primary/default authentication method?
2. **Content Storage:** Should the 8-section content be stored in the database or as static files?
3. **Session Duration:** What should be the default session timeout duration?
4. **Error Logging:** What logging service should be integrated for production error tracking?
5. **Backup Strategy:** What automated backup schedule should be implemented for user data?
6. **Monitoring:** What application performance monitoring tools should be integrated?

---

**Document Version:** 1.0  
**Last Updated:** 2025-09-05  
**Next Review:** Before implementation begins