import './App.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import SearchPage from './pages/Search/SearchPage'
import ComparisonPage from './pages/Comparison/ComparisonPage'
import OverviewPage from './pages/Overview/OverviewPage'
import SearchDemoPage from './pages/SearchDemo/SearchDemoPage'

// Create router with routes for search, comparison, overview and search demo pages
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/search" replace />
  },
  {
    path: '/search',
    element: <SearchPage />
  },
  {
    path: '/comparison',
    element: <ComparisonPage />
  },
  {
    path: '/overview/:id',
    element: <OverviewPage />
  },
  {
    path: '/search-demo',
    element: <SearchDemoPage />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
