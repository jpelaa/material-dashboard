import Head from 'next/head';
import { Box, Table, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import MobileKeyStatusComp from '../components/mobile-key-status';
import { DashboardLayout } from '../components/dashboard-layout';


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
      <MobileKeyStatusComp />
    </Box>
  </>
);


MobileKeyStatus.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default MobileKeyStatus;
