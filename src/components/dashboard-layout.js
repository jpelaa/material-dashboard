import { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import { DRAWER_WIDTH } from 'src/static/styles';

const DashboardLayoutRoot = styled('div')(({ theme, open }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  ...(open && {
    paddingLeft: DRAWER_WIDTH
  }),
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <DashboardLayoutRoot open={isSidebarOpen}>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar
        open={isSidebarOpen}
        onSidebarOpen={() => setSidebarOpen(!isSidebarOpen)}
      />

      <DashboardSidebar
        onClose={() => setSidebarOpen(!isSidebarOpen)}
        open={isSidebarOpen}
      />
    </>
  );
};
