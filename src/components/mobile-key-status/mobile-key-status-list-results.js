import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import { MOBILE_KEY_STATUS_TABLE_HEADER } from 'src/static/constants';
import MobileIssuanceSummary from './mobile-issuance-summary';
import { formatDDMMMYYYY } from 'src/utils/date';

const getColorBasedOnStatus = (overAllStatus) => {
  if (overAllStatus.toLowerCase() === "incomplete") {
    return "warning.main"
  } else if (overAllStatus.toLowerCase() === "complete") {
    return "success.main"
  } else {
    return "secondary.main"
  }
}

export const MobileKeyStatusListResults = ({ mobileKeyStatusList, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [details, setDetails] = useState(null);


  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  console.log(showPopup, "  showPopup")
  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={'small'}
        >
          <TableHead>
            <TableRow>
              {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
              {Object.values(MOBILE_KEY_STATUS_TABLE_HEADER).map((headerValue) => {
                return <TableCell key={headerValue}>
                  {headerValue}
                </TableCell>
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {mobileKeyStatusList.slice(0, limit).map((data) => (
              <TableRow
                hover
                key={data.id}
                selected={selectedCustomerIds.indexOf(data.id) !== -1}
              >
                {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
                  </TableCell> */}
                <TableCell >
                  <Typography
                    variant='p'
                    sx={{
                      color: getColorBasedOnStatus(data.overAllStatus)
                    }}
                  >
                    {data.overAllStatus}
                  </Typography>
                </TableCell>
                <TableCell>
                  {data.externalBookingRefId}
                </TableCell>
                <TableCell>
                  {data.reservationId}
                </TableCell>
                <TableCell>
                  {data.checkInChannel}
                </TableCell>
                <TableCell>
                  {data.roomNo}
                </TableCell>
                <TableCell>
                  {`${data.salutation}.${data.firstName} ${data.lastName}`}
                </TableCell>
                <TableCell>
                  {formatDDMMMYYYY(data.checkInDate)}
                </TableCell>
                <TableCell>
                  {formatDDMMMYYYY(data.checkOutDate)}
                </TableCell>
                <TableCell>
                  {data.noOfNights}
                </TableCell>
                <TableCell>
                  {data.mobileKeyStatus}
                </TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                      setDetails(data)
                      setShowPopup(true)
                    }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={mobileKeyStatusList.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
      {showPopup && details && <MobileIssuanceSummary
        open={showPopup}
        roomNo={details.roomNo}
        details={details}
        handleClose={() => {
          setShowPopup(false);
          setDetails(null)
        }} />}
    </Box>
  );
};

MobileKeyStatusListResults.propTypes = {
  mobileKeyStatusList: PropTypes.array.isRequired
};
