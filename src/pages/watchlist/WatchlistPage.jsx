import { Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import {
  PageContainer,
  PageHeader,
  PageHeaderToolbar,
} from "@toolpad/core/PageContainer";
import * as React from "react";
import BasicDateCalendar from "../../component/watchlist/calendar";
import GridDemo from "../../component/watchlist/chart";
import BasicPie from "../../component/watchlist/piechart";

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
    <PageHeaderToolbar>
      <Stack direction="row" spacing={1} alignItems="center"></Stack>
    </PageHeaderToolbar>
  );
}

function CustomPageHeader() {
  return <PageHeader slots={{ toolbar: CustomPageToolbar }} />;
}

export default function WatchlistPage(props) {
  const { window } = props;

  const theme = useTheme();
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      theme={theme}
      window={demoWindow}
      branding={{
        title: "ACME Inc.",
      }}
    >
      <Paper sx={{ p: 2, width: "100%" }}>
        <PageContainer slots={{ header: CustomPageHeader }}>
          <Grid container spacing={2}>
            {/* Row 1: Calendar & List */}
            <Grid item xs={12} md={6}>
              <Card sx={{ minHeight: 300 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Calendar
                  </Typography>
                  <BasicDateCalendar />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ minHeight: 300 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    List
                  </Typography>
                  <div
                    style={{
                      height: 250,
                      backgroundColor: "#f0f0f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    List Content Here
                  </div>
                </CardContent>
              </Card>
            </Grid>

            {/* Row 2: Chart & Pie Chart */}
            <Grid item xs={12} md={6}>
              <Card sx={{ minHeight: 300 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Chart
                  </Typography>
                  <GridDemo />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ minHeight: 300 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Pie Chart
                  </Typography>
                  <BasicPie />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </PageContainer>
      </Paper>
    </AppProvider>
  );
}
