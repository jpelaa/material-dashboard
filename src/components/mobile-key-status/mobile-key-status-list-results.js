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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import { MOBILE_KEY_STATUS_TABLE_HEADER } from 'src/static/constants';

export const MobileKeyStatusListResults = ({ mobileKeyStatusList, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

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

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
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
                  <TableCell>
                   {data.overAllStatus}
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
                    {data.roomNumber}
                  </TableCell>
                  <TableCell>
                    {`${data.salutation}.${data.firstName} ${data.lastName}`}
                  </TableCell>
                  <TableCell>
                    {format(data.checkInDate, 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell>
                    {format(data.checkOutDate, 'dd/MM/yyyy')}
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
                    variant="contained"
                  >
                    View
                  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={mobileKeyStatusList.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

MobileKeyStatusListResults.propTypes = {
  mobileKeyStatusList : PropTypes.array.isRequired
};
