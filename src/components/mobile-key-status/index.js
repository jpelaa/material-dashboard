import { Description } from '@mui/icons-material';
import {
	Box,
	Card,
	CardContent,
	CircularProgress,
	Container,
	Typography,
} from '@mui/material';
// useEffect,
import { useState } from 'react';
// ERROR_MESSAGES
import { API_STATUS, ERROR_MESSAGES } from 'src/static/api';
import { CENTER_STYLES } from 'src/static/styles';
// import { formatDDMMMYYYY } from 'src/utils/date';
// import { getUserData } from 'src/utils/mobile-key-status';
import { CustomerListToolbar } from './customer-list-toolbar';
import MobileKeyStatusListResults from './mobile-key-status-list-results';

const MobileKeyStatus = ({ mobileKeyStatus, loadingStatus, errorMessage }) => {
	// const [mobileKeyStatus, setMobileKeyStatus] = useState([]);
	// const [loadingStatus, setLoadingStatus] = useState(API_STATUS.loading);
	// const [errorMessage, setErrorMessage] = useState(ERROR_MESSAGES[500]);

	const [enableFilter, setEnableFilter] = useState(false);

	const [commonFilterValue, setCommonFilterValue] = useState('');
	const [filters, setFilters] = useState({});

	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('');

	// const handleAPICall = async () => {
	// 	try {
	// 		setLoadingStatus(API_STATUS.loading);
	// 		const currentDate = formatDDMMMYYYY(new Date());
	// 		const response = await getUserData({ currentDate });
	// 		setMobileKeyStatus(response);
	// 		setLoadingStatus(API_STATUS.done);
	// 	} catch (err) {
	// 		setLoadingStatus(API_STATUS.failed);
	// 		setErrorMessage(err.message);
	// 	}
	// };

	// useEffect(() => {
	// 	handleAPICall();
	// }, []);

	const handleFilterChange = (event) => {
		setEnableFilter(event.target.checked);
		if (event.target.checked === false) {
			setFilters({});
		} else {
			setCommonFilterValue('');
		}
	};

	const handleCommonFilterValueChange = (event) => {
		setCommonFilterValue(event.target.value);
	};

	const handleIndividualFilterChange = ({ id, value }) => {
		const filtersCopy = { ...filters };
		if (value) {
			filtersCopy[id] = value;
		} else {
			delete filtersCopy[id];
		}
		setFilters(filtersCopy);
	};

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleReset = () => {
		setOrder('asc');
		setOrderBy('');
		setFilters({});
		setCommonFilterValue('');
	};

	if (loadingStatus === API_STATUS.failed && errorMessage) {
		return <p>{JSON.stringify(errorMessage)}</p>;
	}

	if (loadingStatus === API_STATUS.loading) {
		return (
			<Box sx={CENTER_STYLES}>
				<CircularProgress />
			</Box>
		);
	}

	if (loadingStatus === API_STATUS.done && mobileKeyStatus.length === 0) {
		return (
			<Box sx={CENTER_STYLES}>
				<Description />
				<Typography variant='body1'>{ERROR_MESSAGES.empty} </Typography>
			</Box>
		);
	}

	return (
		<Container maxWidth={false}>
			<Card>
				<CardContent>
					<CustomerListToolbar
						enableFilter={enableFilter}
						handleFilterChange={handleFilterChange}
						commonFilterValue={commonFilterValue}
						handleCommonFilterValueChange={handleCommonFilterValueChange}
						filters={filters}
						handleIndividualFilterChange={handleIndividualFilterChange}
						handleReset={handleReset}
					/>
					<Box sx={{ mt: 3 }}>
						{loadingStatus === API_STATUS.done &&
              mobileKeyStatus.length > 0 && (
							<MobileKeyStatusListResults
								enableFilter={enableFilter}
								mobileKeyStatusList={mobileKeyStatus}
								commonFilterValue={commonFilterValue}
								filters={filters}
								handleIndividualFilterChange={handleIndividualFilterChange}
								handleRequestSort={handleRequestSort}
								order={order}
								orderBy={orderBy}
							/>
						)}
					</Box>
				</CardContent>
			</Card>
		</Container>
	);
};

export default MobileKeyStatus;
