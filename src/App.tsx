import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainPage from './pages/main.page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
