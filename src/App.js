import { Box } from "@mui/material";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import MiniDrawer from "../src/component/nav/Navbar";
import { NotificationProvider } from "../src/context/notification";
import { ThemeProviderWrapper } from "../src/context/ThemeContext"; // Import theme provider
import Login from "../src/pages/login";
import Register from "../src/pages/RegisterPage";
import Stocklist from "../src/pages/StockDetailPage";
import WatchlistPage from "../src/pages/watchlist/WatchlistPage";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideDrawerRoutes = ["/login", "/register"];
  const showDrawer = !hideDrawerRoutes.includes(location.pathname);

  return (
    <Box sx={{ display: "flex" }}>
      {showDrawer && (
        <Box sx={{ width: "260px", flexShrink: 0, position: "fixed" }}>
          <MiniDrawer />
        </Box>
      )}
      <Box
        sx={{
          flexGrow: 1,
          padding: 3,
          marginLeft: showDrawer ? "260px" : "0px",
          transition: "margin 0.3s ease-in-out",
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

const App = () => {
  return (
    <ThemeProviderWrapper>
      <NotificationProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/*"
              element={
                <Layout>
                  <Routes>
                    <Route path="/watchlist" element={<WatchlistPage />} />
                    <Route path="/stocklist" element={<Stocklist />} />
                  </Routes>
                </Layout>
              }
            />
          </Routes>
        </Router>
      </NotificationProvider>
    </ThemeProviderWrapper>
  );
};

export default App;
