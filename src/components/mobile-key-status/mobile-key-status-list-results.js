import { useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Box,
  Button,
  Card,
  Chip,
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
import { Close } from '@mui/icons-material';

const getGuestName = ({ salutation, firstName, lastName }) => `${salutation}.${firstName} ${lastName}`

const filterAll = ({ arr, filters, commonFilterValue }) => {
  return arr.filter((data) => {
    const filterKeyArr = Object.keys(filters);
    if (commonFilterValue.length > 0 || filterKeyArr.length > 0) {
      if (commonFilterValue.length > 0) {
        const bool = []
        MOBILE_KEY_STATUS_TABLE_HEADER.forEach(({ id }) => {
          const filterInLowerCase = commonFilterValue.toLowerCase().trim();
          if (id !== 'mobileKeys' || id !== 'action') {
            if (id === 'guestName') {
              const guestNameInLowerCase = getGuestName(data).toLowerCase().trim();
              bool.push(guestNameInLowerCase.indexOf(filterInLowerCase) > -1)
            } else if (['checkInDate', 'checkOutDate'].includes(id)) {
              const dateFormatted = formatYYYYMMDD(data[id]);
              bool.push(dateFormatted.indexOf(filterInLowerCase) > -1);
            } else if (data[id]) {
              const dataInLowerCase = data[id].toString().toLowerCase().trim();
              bool.push(dataInLowerCase.indexOf(filterInLowerCase) > -1)
            }
          }
        })
        return bool.some(Boolean)
      }
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
        return bool.every(Boolean)
      }
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

  const renderHeaderContent = ({ id, label, caption }) => {
    if (id === 'mobileKeys') {
      return <Box><Typography sx={{
        fontFamily: 'Gilroy',
        fontSize: '14px',
        fontWeight: 600,
        lineHeight: 1,
        letterSpacing: 0.5,
      }} variant="subtitle2" component="div">{label}</Typography>
        <Typography sx={{
          fontFamily: 'Gilroy',
          fontSize: '10px',
          fontWeight: 500,
          lineHeight: 0.75,
          letterSpacing: 0.4,
        }} variant="body2" component="div">{caption}</Typography></Box>
    }
    return <Typography sx={{
      fontFamily: 'Gilroy',
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: 1,
      letterSpacing: 0.5,
    }} variant="subtitle2" component="div">{label}</Typography>;
  }

  return (
    <TableHead>
      <TableRow>
        {MOBILE_KEY_STATUS_TABLE_HEADER.map((headCell) => (
          <TableCell
            align='center'
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {renderHeaderContent(headCell)}
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


export const MobileKeyStatusListResults = ({ mobileKeyStatusList, order, orderBy, commonFilterValue, filters, enableFilter, handleIndividualFilterChange, handleRequestSort, ...rest }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const [showPopup, setShowPopup] = useState(false);
  const [details, setDetails] = useState(null);

  const filteredMobileKeyStatusList = filterAll({ commonFilterValue, filters, arr: mobileKeyStatusList })

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 25));
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={12}  >
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 1080 }}
            aria-labelledby="tableTitle"
            size={'small'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {enableFilter ? <TableRow>
                {MOBILE_KEY_STATUS_TABLE_HEADER.map((data, index) => {
                  if (data.filterEnabled) {
                    return <TableCell
                      align="center"
                      sx={{
                        padding: '0.75rem'
                      }}
                      key={data.id}>
                      <TextField
                        sx={{
                          height: '1rem',
                        }}
                        placeholder={`search`}
                        id="filled-start-adornment"
                        size="small"
                        value={filters[data.id] || ''}
                        onChange={(event) => handleIndividualFilterChange({ id: data.id, value: event.target.value })}
                        InputProps={{
                          endAdornment: <InputAdornment sx={{ marginRight: 0 }} position="start">
                            <IconButton
                              size='small'
                              aria-label={`search ${data.id}`}
                              onClick={() => handleIndividualFilterChange({ id: data.id, value: undefined })}
                            >
                              <Close sx={{ fontSize: "1rem" }} />
                            </IconButton>
                          </InputAdornment>
                        }}
                        variant="standard"
                      />
                    </TableCell>
                  } else {
                    <TableCell></TableCell>
                  }
                })}
              </TableRow> : null}
              {stableSort(filteredMobileKeyStatusList, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
                  <TableRow
                    hover
                    key={data.id}
                  >
                    <TableCell
                      align="left"
                      sx={{
                        width: "8%",
                        minWidth: "110px"
                      }}>
                      <Chip
                        sx={{
                          width: "100%",
                          margin: '0 2px',
                          fontFamily: 'Gilroy',
                          borderRadius: 0,
                          height: '100%',
                          fontSize: '0.7rem',
                          '.MuiChip-label': {
                            paddingLeft: 0.5,
                            paddingRight: 0.5,
                            paddingTop: 0.25,
                            paddingBottom: 0.25
                          }
                        }}
                        label={data.overAllStatus}
                        color={getColorBasedOnStatus(data.overAllStatus)}
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        width: "9%",
                        minWidth: "110px"
                      }}>
                      {data.externalBookingRefId}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        width: "9%",
                        minWidth: "110px"

                      }}>
                      {data.reservationId}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        width: "11%",
                        minWidth: "110px"

                      }}>
                      {data.checkInChannel}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        width: "10%",
                        minWidth: "110px"

                      }}>
                      {data.roomNo}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        width: "12%",
                        minWidth: "110px"

                      }}>
                      {getGuestName(data)}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        width: "12%",
                        minWidth: "110px"

                      }}>
                      {formatYYYYMMDD(data.checkInDate)}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        width: "12%",
                        minWidth: "110px"

                      }}>
                      {formatYYYYMMDD(data.checkOutDate)}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        width: "6%",
                        minWidth: "110px"

                      }}>
                      {data.noOfNights}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        width: "6%",
                      }}>
                      {data.mobileKeyStatus}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        width: "5%",
                      }}>
                      <Button
                        color="primary"
                        variant="outlined"
                        sx={{
                          lineHeight: 0.5,
                          padding: '0.279rem 0.5rem',
                          minWidth: 40,
                          // borderRadius: "5px",
                          fontFamily: 'Gilroy',
                          fontSize: '0.7rem'
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
      </Paper>
      <TablePagination
        // sx={{
        //   fontFamily: 'Gilroy'
        // }}
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
