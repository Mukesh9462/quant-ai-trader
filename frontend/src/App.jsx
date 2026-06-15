import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import MarketTicker from "./components/MarketTicker";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Login from "./pages/Login";
import Register from "./pages/Register";
import News from "./pages/News";
import Trade from "./pages/Trade";
import AISignals from "./pages/AISignals";
import Charts from "./pages/Charts";
import Watchlist from "./pages/Watchlist";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <MarketTicker />

      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Routes */}

        <Route
          path="/portfolio"
          element={
            <ProtectedRoute>
              <Portfolio />
            </ProtectedRoute>
          }
        />

        <Route
          path="/news"
          element={
            <ProtectedRoute>
              <News />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trade"
          element={
            <ProtectedRoute>
              <Trade />
            </ProtectedRoute>
          }
        />

        <Route
          path="/signals"
          element={
            <ProtectedRoute>
              <AISignals />
            </ProtectedRoute>
          }
        />

        <Route
          path="/charts"
          element={
            <ProtectedRoute>
              <Charts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <Watchlist />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;