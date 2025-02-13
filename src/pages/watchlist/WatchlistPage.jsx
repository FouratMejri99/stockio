import { Card, CardContent, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { PageHeader, PageHeaderToolbar } from "@toolpad/core/PageContainer";
import dayjs from "dayjs";
import * as React from "react";
import { useState } from "react";
import BasicDateCalendar from "../../component/watchlist/calendar";
import GridDemo from "../../component/watchlist/chart";
import StockList from "../../component/watchlist/list";
import Dashboard from "../../component/watchlist/piechart";

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

function CustomPageToolbar() {
  return (
    <PageHeaderToolbar>{/* Custom toolbar if needed */}</PageHeaderToolbar>
  );
}

function CustomPageHeader() {
  return <PageHeader slots={{ toolbar: CustomPageToolbar }} />;
}

export default function WatchlistPage(props) {
  const { window } = props;
  const theme = useTheme();
  const [selectedRange, setSelectedRange] = useState([
    dayjs("2023-01-09"),
    dayjs("2023-02-10"),
  ]);

  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      theme={theme}
      window={demoWindow}
      branding={{
        title: "ACME Inc.",
      }}
    >
      <Box sx={{ flexGrow: 1, padding: 9, marginRight: 17 }}>
        <Grid container spacing={4}>
          {/* Stock List */}
          <Grid item xs={12} sm={8} md={8}>
            <Card elevation={3} sx={{ height: "100%" }}>
              <CardContent>
                <StockList />
              </CardContent>
            </Card>
          </Grid>

          {/* Date Calendar */}
          <Grid item xs={12} sm={4} md={4}>
            <BasicDateCalendar
              selectedRange={selectedRange}
              setSelectedRange={setSelectedRange}
              sx={{
                height: "100%",
              }}
            />
          </Grid>

          {/* Stock Chart */}
          <Grid item xs={12} sm={8} md={8}>
            <Card elevation={10} sx={{ height: "100%" }}>
              <CardContent>
                <Typography
                  variant="h2"
                  noWrap
                  sx={{
                    flexGrow: 1,
                    display: "flex", // Use flexbox for centering
                    justifyContent: "center", // Center horizontally
                    alignItems: "center", // Center vertically
                    fontFamily: '"Housttely Signature", cursive',
                    fontSize: "1rem",
                  }}
                >
                  Stocks History Chart
                </Typography>
                <GridDemo sx={{ width: "100%", height: "400px" }} />
              </CardContent>
            </Card>
          </Grid>

          {/* Pie Chart */}
          <Grid item xs={12} sm={4} md={4}>
            <Card elevation={3} sx={{ height: "100%" }}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column", // Stack elements vertically
                  alignItems: "center", // Center content horizontally
                  justifyContent: "center", // Center content vertically
                  textAlign: "center", // Center text horizontally
                }}
              >
                <Typography
                  variant="h2"
                  noWrap
                  sx={{
                    fontFamily: '"Housttely Signature", cursive',
                    fontSize: "1rem",
                    marginBottom: 2, // Add some space between the title and pie chart
                  }}
                >
                  Prices Pie
                </Typography>
                <Dashboard
                  selectedRange={selectedRange}
                  setSelectedRange={setSelectedRange}
                  sx={{
                    display: "flex",
                    justifyContent: "center", // Center pie chart horizontally
                    alignItems: "center", // Ensure it's centered vertically if required
                    flexGrow: 1,
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </AppProvider>
  );
}
