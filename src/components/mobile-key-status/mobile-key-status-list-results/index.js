import { useState } from 'react';
import {
	Box,
	Button,
	Chip,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TablePagination,
	TableRow,
} from '@mui/material';
import MobileIssuanceSummary from './mobile-issuance-summary';
import { formatYYYYMMDD } from 'src/utils/date';
import { getColorBasedOnStatus } from 'src/utils';
import { FONT_FAMILIES, OVER_ALL_STATUS_COL_STYLES } from 'src/static/styles';
import {
	filterAll,
	getComparator,
	getGuestName,
	stableSort,
} from 'src/utils/mobile-key-status';
import EnhancedTableHead from './enhanced-table-head';
import FilterRow from './filter-row';

const MobileKeyStatusListResults = ({
	mobileKeyStatusList,
	order,
	orderBy,
	commonFilterValue,
	filters,
	enableFilter,
	handleIndividualFilterChange,
	handleRequestSort,
}) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(25);

	const [showPopup, setShowPopup] = useState(false);
	const [details, setDetails] = useState(null);

	const filteredMobileKeyStatusList = filterAll({
		commonFilterValue,
		filters,
		arr: mobileKeyStatusList,
	});

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 25));
		setPage(0);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Paper elevation={12}>
				<TableContainer component={Paper}>
					<Table
						sx={{ minWidth: 1080 }}
						aria-labelledby='tableTitle'
						size={'small'}
					>
						<EnhancedTableHead
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
						/>
						<TableBody>
							{enableFilter ? (
								<FilterRow
									filters={filters}
									handleIndividualFilterChange={handleIndividualFilterChange}
								/>
							) : null}
							{stableSort(
								filteredMobileKeyStatusList,
								getComparator(order, orderBy)
							)
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((data) => (
									<TableRow hover key={data.id}>
										<TableCell
											align='left'
											sx={{
												width: '8%',
												minWidth: '110px',
											}}
										>
											<Chip
												sx={OVER_ALL_STATUS_COL_STYLES}
												label={data.overAllStatus}
												color={getColorBasedOnStatus(data.overAllStatus)}
											/>
										</TableCell>
										<TableCell
											align='center'
											sx={{
												width: '9%',
												minWidth: '110px',
											}}
										>
											{data.externalBookingRefId}
										</TableCell>
										<TableCell
											align='center'
											sx={{
												width: '9%',
												minWidth: '110px',
											}}
										>
											{data.reservationId}
										</TableCell>
										<TableCell
											align='center'
											sx={{
												width: '11%',
												minWidth: '110px',
											}}
										>
											{data.checkInChannel}
										</TableCell>
										<TableCell
											align='center'
											sx={{
												width: '10%',
												minWidth: '110px',
											}}
										>
											{data.roomNo}
										</TableCell>
										<TableCell
											align='center'
											sx={{
												width: '12%',
												minWidth: '110px',
											}}
										>
											{getGuestName(data)}
										</TableCell>
										<TableCell
											align='center'
											sx={{
												width: '12%',
												minWidth: '110px',
											}}
										>
											{formatYYYYMMDD(data.checkInDate)}
										</TableCell>
										<TableCell
											align='center'
											sx={{
												width: '12%',
												minWidth: '110px',
											}}
										>
											{formatYYYYMMDD(data.checkOutDate)}
										</TableCell>
										<TableCell
											align='center'
											sx={{
												width: '6%',
												minWidth: '110px',
											}}
										>
											{data.noOfNights}
										</TableCell>
										<TableCell
											align='center'
											sx={{
												width: '6%',
											}}
										>
											{data.mobileKeyStatus}
										</TableCell>
										<TableCell
											align='center'
											sx={{
												width: '5%',
											}}
										>
											<Button
												color='primary'
												variant='outlined'
												sx={{
													lineHeight: 0.5,
													padding: '0.279rem 0.5rem',
													minWidth: 40,
													fontFamily: FONT_FAMILIES.gilroy,
													fontSize: '0.7rem',
												}}
												onClick={() => {
													setDetails(data);
													setShowPopup(true);
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
				rowsPerPageOptions={[5, 10, 25]}
				component='div'
				count={mobileKeyStatusList.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
			{showPopup && details && (
				<MobileIssuanceSummary
					open={showPopup}
					roomNo={details.roomNo}
					details={details}
					handleClose={() => {
						setShowPopup(false);
						setDetails(null);
					}}
				/>
			)}
		</Box>
	);
};

export default MobileKeyStatusListResults;
