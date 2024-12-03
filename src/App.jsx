import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './Layout.jsx';
import Landing from './pages/Landing.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import Battle from './pages/Battle.jsx';
import Roster from './pages/Roster.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route element={<ProtectedRoute />}>
          <Route path="battle" element={<Battle />} />
          <Route path="roster" element={<Roster />} />
        </Route>
      </Route>
    )
  )


  return <RouterProvider router={router} />;
}

export default App