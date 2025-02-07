import { Box } from "@mui/material";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import MiniDrawer from "./component/nav/Navbar";
import HomePage from "./pages/HomePage";
import Login from "./pages/login";
import Register from "./pages/RegisterPage";
import Stocklist from "./pages/StockDetailPage";
import WatchlistPage from "./pages/watchlist/WatchlistPage";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideDrawerRoutes = ["/login", "/register"];
  const showDrawer = !hideDrawerRoutes.includes(location.pathname);

  return (
    <Box sx={{ display: "flex" }}>
      {/* Keep Drawer fixed so it doesn't push content */}
      {showDrawer && (
        <Box sx={{ width: "260px", flexShrink: 0, position: "fixed" }}>
          <MiniDrawer />
        </Box>
      )}

      {/* Content Area, ensures no shifting */}
      <Box
        sx={{
          flexGrow: 1,
          padding: 3,
          marginLeft: showDrawer ? "260px" : "0px", // Keeps layout stable
          transition: "margin 0.3s ease-in-out",
          width: "100%", // Prevents content from resizing
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes wrapped with MiniDrawer */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/watchlist" element={<WatchlistPage />} />
                <Route path="/stocklist" element={<Stocklist />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
