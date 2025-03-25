# Technical Context: Hill Metrics Financial Screener

## Technology Stack

### Frontend
- **Framework**: React
- **State Management**: Redux/Zustand
- **Routing**: React Router
- **CSS Framework**: Tailwind CSS v3.4.17
- **UI Components**: Custom components with responsive design
- **Data Visualization**: Recharts for interactive charts and graphs
- **HTTP Client**: Axios for API communication
- **Build Tools**: Vite
- **Package Manager**: npm

### Backend
- **Framework**: ASP.NET Core Web API
- **Language**: C#
- **Authentication**: JWT-based authentication
- **API Documentation**: Swagger/OpenAPI
- **Validation**: FluentValidation
- **Logging**: Serilog
- **Dependency Injection**: Built-in ASP.NET Core DI container

### Database
- **RDBMS**: MySQL
- **ORM**: Entity Framework Core
- **Migrations**: EF Core Migrations
- **Query Performance**: Optimized indexes and query strategies

### DevOps & Infrastructure
- **Version Control**: Git
- **CI/CD**: To be determined
- **Containerization**: Docker (optional)
- **Hosting**: To be determined

## Development Environment Setup

### Prerequisites
- .NET SDK (latest LTS version)
- Node.js (latest LTS version)
- npm or yarn
- MySQL Server
- Visual Studio or Visual Studio Code
- Git

### Local Development Setup

#### Database Setup
```bash
# MySQL connection details
Host: localhost
Port: 3306
Username: root
Password: [there is no pass]
Database: hill-database
```

#### Backend Setup
1. Clone the repository
2. Navigate to the backend project directory
3. Restore NuGet packages:
   ```bash
   dotnet restore
   ```
4. Update the database with migrations:
   ```bash
   dotnet ef database update
   ```
5. Run the backend API:
   ```bash
   dotnet run
   ```
   The API will be available at `https://localhost:5001` and `http://localhost:5000`

#### Frontend Setup
1. Navigate to the frontend project directory
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```
3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The frontend will be available at `http://localhost:5173`

### Environment Configuration

#### Backend (.NET)
- `appsettings.json` - Base configuration
- `appsettings.Development.json` - Development-specific overrides
- `appsettings.Production.json` - Production-specific overrides

Key configuration sections:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Port=3306;Database=hill-database;Uid=root;Pwd=;"
  },
  "JwtSettings": {
    "SecretKey": "[development-only-secret]",
    "Issuer": "HillMetrics",
    "Audience": "HillMetricsUsers",
    "ExpiryMinutes": 60
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "AllowedHosts": "*",
  "CorsOrigins": [
    "http://localhost:3000"
  ]
}
```

#### Frontend (React)
- `.env` - Base environment variables
- `.env.development` - Development-specific variables
- `.env.production` - Production-specific variables

Key environment variables:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_AUTH_STORAGE_KEY=hill_metrics_auth
REACT_APP_VERSION=$npm_package_version
```

## CSS Framework Configuration

### Tailwind CSS Setup
- **Version**: Tailwind CSS v3.4.17 (stable release)
- **Configuration**: Standard configuration with custom theme extensions
- **PostCSS Integration**: Using standard PostCSS plugin setup
- **Plugins**: tailwindcss-animate for animation utilities

### CSS Compatibility Considerations
- Tailwind CSS v4 was initially attempted but downgraded to v3.4.17 due to compatibility issues
- The v4 alpha release had breaking changes in the PostCSS plugin architecture
- Using the module.exports syntax in tailwind.config.js instead of ES module export syntax
- Custom color palette and animation definitions maintained across versions

### CSS Best Practices
- Using utility-first approach for component styling
- Maintaining consistent color variables through Tailwind theme configuration
- Responsive design implemented using Tailwind's responsive modifiers
- Custom animations defined in the tailwind.config.js file

## Technical Constraints

### Performance Requirements
- **Search Response Time**: < 500ms for typical searches
- **Filter Application**: < 300ms for applying filters
- **Page Load Time**: < 2s for initial load, < 1s for subsequent navigation
- **Concurrent Users**: Support for 1000+ concurrent users

### Scalability Considerations
- Stateless API design to support horizontal scaling
- Efficient database queries with proper indexing
- Pagination for large result sets
- Caching strategies for frequently accessed data

### Browser Compatibility
- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile Browsers**: iOS Safari, Android Chrome
- **Responsive Design**: Support for desktop, tablet, and mobile viewports

### Accessibility Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast
- Text resizing support

### Security Requirements
- HTTPS for all communications
- JWT-based authentication with secure token storage
- Input validation and sanitization
- Protection against common web vulnerabilities (XSS, CSRF, SQL Injection)
- Secure password storage with bcrypt hashing

## Dependencies and Libraries

### Backend Dependencies

#### Core Framework
- Microsoft.AspNetCore.App
- Microsoft.EntityFrameworkCore
- Microsoft.EntityFrameworkCore.MySql
- Microsoft.EntityFrameworkCore.Design

#### Authentication & Security
- Microsoft.AspNetCore.Authentication.JwtBearer
- System.IdentityModel.Tokens.Jwt
- BCrypt.Net-Next

#### API Documentation
- Swashbuckle.AspNetCore

#### Validation & Mapping
- FluentValidation.AspNetCore
- AutoMapper.Extensions.Microsoft.DependencyInjection

#### Logging
- Serilog.AspNetCore
- Serilog.Sinks.Console
- Serilog.Sinks.File

### Frontend Dependencies

#### Core Framework
- react v19.0.0
- react-dom v19.0.0
- react-router-dom v7.3.0

#### State Management
- zustand v5.0.3

#### CSS Framework
- tailwindcss v3.4.17
- tailwindcss-animate v1.0.7
- postcss v8.5.3
- autoprefixer v10.4.21

#### UI Components
- Custom component library
- lucide-react v0.483.0 (for icons)

#### Data Visualization
- recharts v2.15.1
- chart.js v4.4.8
- react-chartjs-2 v5.3.0

#### HTTP Client
- axios v1.8.3

#### Form Handling
- formik v2.4.6
- yup v1.6.1

#### Utilities
- lodash v4.17.21
- date-fns v4.1.0
- uuid v11.1.0

## Database Schema Overview

The database schema is designed to efficiently store and retrieve financial instrument data with support for various asset types and their specific attributes. The schema follows a normalized approach with appropriate relationships between entities.

Key tables include:
- Instruments (core financial instrument data)
- InstrumentTypes (types of financial instruments)
- AssetCategories (categories of assets)
- Sectors (industry sectors)
- Markets (geographical markets)
- MarketTypes (developed, emerging, frontier)
- Various asset-specific detail tables (CryptoDetails, MutualFundDetails, etc.)
- Performance and quality metrics tables
- User-related tables

For a detailed view of the database schema, refer to the database_spec.md documentation.

## API Overview

The API follows RESTful principles with resource-based endpoints. It provides comprehensive functionality for searching, filtering, and retrieving financial instrument data.

Key API endpoints include:
- `/api/instruments` - Get instruments with filtering and search
- `/api/instruments/{id}` - Get detailed information for a specific instrument
- `/api/instrument-types` - Get instrument types
- `/api/asset-categories` - Get asset categories
- `/api/sectors` - Get sectors
- `/api/markets` - Get markets
- `/api/market-types` - Get market types
- `/api/graph-data/{id}` - Get graph data for a specific instrument
- `/api/auth/login` - Authenticate a user
- `/api/users` - User management endpoints

For a detailed view of the API endpoints, refer to the api_spec.md documentation.

## Development Workflow

### Branching Strategy
- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches
- `release/*` - Release preparation branches

### Code Review Process
1. Developer creates a feature/bugfix branch
2. Developer implements changes and writes tests
3. Developer creates a pull request to the develop branch
4. Code is reviewed by at least one other developer
5. Automated tests are run in the CI pipeline
6. Changes are merged to develop after approval
7. Periodically, develop is merged to main for releases

### Testing Strategy
- **Unit Tests**: Test individual components in isolation
- **Integration Tests**: Test interactions between components
- **End-to-End Tests**: Test complete user flows
- **Performance Tests**: Test system performance under load

### Deployment Process
1. Code is merged to main branch
2. CI/CD pipeline builds and tests the application
3. Application is deployed to staging environment
4. Manual verification is performed
5. Application is deployed to production environment

## Monitoring and Logging

### Logging Strategy
- **Application Logs**: Structured logging with Serilog
- **Request/Response Logging**: API request and response logging for debugging
- **Error Logging**: Detailed error logging with stack traces
- **Performance Logging**: Timing of critical operations

### Monitoring Considerations
- **Health Checks**: Endpoint for system health monitoring
- **Performance Metrics**: Tracking of key performance indicators
- **Error Rates**: Monitoring of application errors
- **User Activity**: Monitoring of user engagement and usage patterns

## Future Technical Considerations

### Potential Enhancements
- **Real-time Data Updates**: WebSocket integration for live data
- **Advanced Analytics**: Machine learning for trend analysis and recommendations
- **Mobile Applications**: Native mobile apps for iOS and Android
- **Offline Support**: Progressive Web App features for offline functionality
- **Multi-language Support**: Internationalization for global users

### Technical Debt Management
- Regular code reviews to identify and address technical debt
- Refactoring sessions to improve code quality
- Automated code quality checks in the CI pipeline
- Documentation updates to maintain accurate technical documentation
