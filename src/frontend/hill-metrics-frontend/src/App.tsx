import './App.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import SearchPage from './pages/Search/SearchPage'
import ComparisonPage from './pages/Comparison/ComparisonPage'

// Create router with routes for search and comparison pages
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
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
