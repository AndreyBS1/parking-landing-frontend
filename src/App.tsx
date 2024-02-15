import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import AuthPage from './pages/auth.page'
import CallRequestsPage from './pages/call-requests.page'
import DashboardPage from './pages/dashboard.page'
import MainPage from './pages/main.page'
import PantryPlacesPage from './pages/pantry-places.page'
import PantryPurchaseRequestsPage from './pages/pantry-purchase-requests.page'
import ParkingPlacesPage from './pages/parking-places.page'
import PlaceParametersPage from './pages/place-parameters.page'
import PurchaseRequestsPage from './pages/purchase-requests.page'
import { useAuthStore } from './stores/use-auth-store.hook'

function initializeApp() {
  if (window === undefined) {
    return
  }
  const accessToken = sessionStorage.getItem('access_token')
  if (accessToken) {
    useAuthStore.setState({ accessToken })
  }
}
initializeApp()

const router = createBrowserRouter([
  {
    path: '',
    element: <MainPage />,
  },
  {
    path: 'admin',
    loader: () => {
      const accessToken = sessionStorage.getItem('access_token')
      if (!accessToken) {
        redirect('/admin/auth')
      }
      return null
    },
    children: [
      {
        path: 'auth',
        element: <AuthPage />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
        children: [
          {
            path: 'place-parameters',
            element: <PlaceParametersPage />,
          },
          {
            path: 'parking-places',
            element: <ParkingPlacesPage />,
          },
          {
            path: 'pantry-places',
            element: <PantryPlacesPage />,
          },
          {
            path: 'purchase-requests',
            element: <PurchaseRequestsPage />,
          },
          {
            path: 'pantry-purchase-requests',
            element: <PantryPurchaseRequestsPage />,
          },
          {
            path: 'call-requests',
            element: <CallRequestsPage />,
          },
        ],
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
