# Frontend - Next.js React Application

Modern React application built with Next.js for exploring professional networks through an intuitive UI.

## Technology Stack

- **Next.js 14.2.5** - React framework with server-side rendering and file-based routing
- **React 18.3.1** - UI library with hooks and concurrent features
- **JavaScript (ES6+)** - Modern JavaScript with async/await, arrow functions, and modules

## Project Structure

```
frontend/
├── components/
│   └── Layout.js              # Shared layout with navigation
├── pages/
│   ├── api/
│   │   └── proxy.js           # API proxy to backend
│   ├── index.js               # Home page with feature cards
│   ├── skill.js               # Search professionals by skill
│   ├── company.js             # Company skill network explorer
│   └── path.js                # Collaboration path finder
├── .env.local.example         # Environment variables template
├── next.config.js             # Next.js configuration
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## Pages

### Home Page (`/`)
Landing page with navigation cards for all three main features.

**Features:**
- Visual cards with icons and descriptions
- Clear navigation to each feature
- Responsive grid layout
- Modern design with hover effects

### Skill Search Page (`/skill`)
Search for professionals by specific skills.

**Features:**
- Search input with Enter key support
- Loading state during API calls
- Error handling with user-friendly messages
- Results displayed as cards with skill tags
- Empty state when no results found
- Result count display

**Available Skills from Seed Data:**
- Product Strategy, AI Ethics, Stakeholder Management
- Java, Graph Databases, Distributed Systems
- Machine Learning, Graph Analytics, Python
- Performance Marketing, A/B Testing, Customer Retention
- Program Management, Cross-functional Leadership, AI Strategy

### Company Network Page (`/company`)
Discover companies connected through shared talent.

**Features:**
- Search by skill name
- Company cards with professional lists
- Professional names displayed as tags
- Loading and error states
- Empty state handling

### Path Finder Page (`/path`)
Find collaboration paths between professionals.

**Features:**
- Input fields for person IDs
- Visual path representation
- Expandable raw data view
- Multi-path result support
- Helper text showing available IDs
- Loading and error states

**Available Person IDs from Seed Data:**
- p1: Aisha Patel
- p2: Marcus Lee
- p3: Priya Singh
- p4: Olivia Ramirez
- p5: Eric Chen

## Components

### Layout
Shared layout component providing consistent navigation and footer across all pages.

**Props:**
- `title` (string, optional): Page title displayed in header
- `children` (React node): Page content

**Features:**
- Responsive navigation bar
- Logo and branding
- Navigation links with hover effects
- Footer with attribution
- Consistent styling

## API Proxy

The frontend uses an API proxy (`/api/proxy`) to forward requests to the backend. This:

- Avoids CORS issues in development
- Centralizes backend URL configuration
- Provides error handling for backend unavailability
- Supports environment-based backend URLs

**Configuration:**
Set `BACKEND_URL` in `.env.local` or `next.config.js`:
```env
BACKEND_URL=http://localhost:8080
```

## Styling Approach

The application uses inline styles for simplicity and portability:

- **Color Palette:**
  - Primary: `#2563eb` (blue)
  - Success: `#10b981` (green)
  - Purple: `#8b5cf6` (purple)
  - Background: `#f8fafc` (slate)
  - Text: `#1e293b` (slate-800)
  - Muted: `#64748b` (slate-500)

- **Typography:**
  - System font stack for native feel
  - Clear hierarchy with sizes 14px-32px
  - Appropriate font weights for emphasis

- **Components:**
  - Cards with borders and subtle shadows
  - Rounded corners (8px-16px)
  - Consistent padding (12px-32px)
  - Hover effects for interactivity

## State Management

Each page uses React's `useState` hook for local state:

- **Input Values:** Search terms, person IDs
- **Data:** API results (people, companies, paths)
- **UI State:** Loading, error, hasSearched flags

Example pattern:
```javascript
const [skill, setSkill] = useState("Graph Databases");
const [people, setPeople] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [hasSearched, setHasSearched] = useState(false);
```

## Error Handling

The application implements comprehensive error handling:

1. **API Errors:** Caught in try-catch blocks with user-friendly messages
2. **Loading States:** Visual feedback during async operations
3. **Empty States:** Helpful messages when no results are found
4. **Network Errors:** Proxy handles backend unavailability gracefully

## Environment Configuration

### Development
Create `.env.local`:
```env
BACKEND_URL=http://localhost:8080
```

### Production
Set `BACKEND_URL` environment variable to your deployed backend URL.

## Running the Application

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation
```bash
npm install
```

### Development Mode
```bash
npm run dev
```
Runs on `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

### Production Build with Static Export
```bash
npm run build
```
The `.next` folder contains the optimized production build.

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Configure environment variables:
   - `BACKEND_URL`: Your backend API URL
3. Deploy automatically on push

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variable: `BACKEND_URL`

### Other Platforms
Any platform supporting Next.js:
- AWS Amplify
- Google Cloud Platform
- DigitalOcean App Platform
- Railway

## Performance Optimization

- **Code Splitting:** Automatic with Next.js page-based routing
- **Image Optimization:** Use `next/image` for images (if added)
- **Font Optimization:** Next.js optimizes font loading
- **Static Generation:** Pages are pre-rendered when possible
- **API Caching:** Consider adding React Query or SWR for API caching

## Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Sufficient color contrast
- Focus indicators on interactive elements

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Modern browsers with ES6+ support required.

## Future Enhancements

Potential improvements for the application:

1. **State Management:** Implement Redux or React Query for complex state
2. **Styling:** Migrate to Tailwind CSS or CSS Modules
3. **Testing:** Add Jest and React Testing Library
4. **TypeScript:** Migrate from JavaScript to TypeScript
5. **Authentication:** Add user authentication and personalization
6. **Real-time:** Implement WebSocket for live updates
7. **Graph Visualization:** Add D3.js or vis.js for interactive graphs
8. **Advanced Filters:** Add filter panels for complex queries
9. **Export:** Allow users to export results as CSV/JSON
10. **Dark Mode:** Add theme switching capability

## Troubleshooting

### Proxy Errors
If API calls fail:
1. Verify backend is running on the configured URL
2. Check `BACKEND_URL` in `.env.local`
3. Ensure CORS is configured on the backend

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
Change port in `package.json`:
```json
"scripts": {
  "dev": "next dev -p 3001"
}
```

## Contributing

When adding new features:

1. Follow the existing component structure
2. Use inline styles for consistency
3. Implement loading and error states
4. Test on different screen sizes
5. Ensure accessibility best practices
6. Update this README with new pages/components
