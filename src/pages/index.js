import Head from 'next/head';
import { Box, Container, Table, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import { MobileKeyStatusListResults } from '../components/mobile-key-status/mobile-key-status-list-results';
import { CustomerListToolbar } from '../components/mobile-key-status/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { mobileKeyStatus } from '../__mocks__/mobile_key_status';


const SearchInput = () => {
  return <TableCell>
    <TextField
      id="outlined-size-small"
      defaultValue="Search "
      size="small"
    />
  </TableCell>
}

const MobileKeyStatusSearch = () => {
  return <Table
    sx={{ minWidth: 750 }}
    aria-labelledby="tablesearch"
    size={'small'}>
    <TableBody>
      <TableRow>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((data, index) => {
          console.log("index : " + index)
          return <SearchInput key={index} />
        })}
      </TableRow>
    </TableBody>
  </Table>
}

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
          <MobileKeyStatusSearch />
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
