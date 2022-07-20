import Head from 'next/head';
import { Box, Container } from '@mui/material';
import {  MobileKeyStatusListResults } from '../components/mobile-key-status/mobile-key-status-list-results';
import { CustomerListToolbar } from '../components/mobile-key-status/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { mobileKeyStatus } from '../__mocks__/mobile_key_status';

const MobileKeyStatus = () => (
  <>
    <Head>
      <title>
        Mobile Key Status
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ mt: 3 }}>
          <MobileKeyStatusListResults mobileKeyStatusList={mobileKeyStatus} />
        </Box>
      </Container>
    </Box>
  </>
);
MobileKeyStatus.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default MobileKeyStatus;
