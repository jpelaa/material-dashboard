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
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { MOBILE_KEY_STATUS_TABLE_HEADER } from 'src/static/constants';
import MobileIssuanceSummary from './mobile-issuance-summary';
import { formatYYYYMMDD } from 'src/utils/date';
import { getColorBasedOnStatus } from 'src/utils';
import { Close, Search } from '@mui/icons-material';

const getGuestName = ({ salutation, firstName, lastName }) => `${salutation}.${firstName} ${lastName}`

const filterAll = ({ arr, filters, commonFilterValue }) => {
  return arr.filter((data, index) => {
    const filterKeyArr = Object.keys(filters);
    if (filterKeyArr.length > 0) {
      const bool = []
      filterKeyArr.forEach((filterKey) => {
        if (filters[filterKey]) {
          const filterInLowerCase = filters[filterKey].toLowerCase().trim();
          if (filterKey === 'guestName') {
            const guestNameInLowerCase = getGuestName(data).toLowerCase().trim();
            bool.push(guestNameInLowerCase.indexOf(filterInLowerCase) > -1)
          } else if (['checkInDate', 'checkOutDate'].includes(filterKey)) {
            const dateFormatted = formatYYYYMMDD(data[filterKey]);
            bool.push(dateFormatted.indexOf(filterInLowerCase) > -1);
          } else if (data[filterKey]) {
            const dataInLowerCase = data[filterKey].toString().toLowerCase().trim();
            bool.push(dataInLowerCase.indexOf(filterInLowerCase) > -1)
          }
        }
      })
      console.log(bool, index, " bool ")
      return bool.every(Boolean)
    } else {
      return true;
    }

  });
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}




function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{
      backgroundColor: 'primary.light',
    }}>
      <TableRow>
        {MOBILE_KEY_STATUS_TABLE_HEADER.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              sx={{
                color: 'primary.dark'
              }}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


export const MobileKeyStatusListResults = ({ mobileKeyStatusList, commonFilterValue, filters, enableFilter, ...rest }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [showPopup, setShowPopup] = useState(false);
  const [details, setDetails] = useState(null);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const filteredMobileKeyStatusList = filterAll({ commonFilterValue, filters, arr: mobileKeyStatusList })


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={'small'}
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(filteredMobileKeyStatusList, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
                <TableRow
                  hover
                  key={data.id}
                >
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
                    {getGuestName(data)}
                  </TableCell>
                  <TableCell>
                    {formatYYYYMMDD(data.checkInDate)}
                  </TableCell>
                  <TableCell>
                    {formatYYYYMMDD(data.checkOutDate)}
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
                      sx={{
                        lineHeight: 0.5,

                      }}
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
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={mobileKeyStatusList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
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
