import { useState } from 'react';
import {
	Box,
	Button,
	Card,
	CardContent,
	IconButton,
	Link,
	Paper,
	Popover,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextareaAutosize,
	Typography,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import {
	MOBILE_KEY_ISSUANCE_SUMMARY_TABLE_HEADER,
	REQUESTED_STATUS_COLORS_BY_KEY,
	REQUESTED_STATUS_TYPES,
	STATUS_TEXT,
	TRANSITION_LIST_BY_KEY,
} from 'src/static/constants';
import { formatYYYYMMDDWith12hoursAMPM } from 'src/utils/date';
import { useTheme } from '@mui/material/styles';
import { updateStatusById } from 'src/utils/api/summary';
import { API_STATUS } from 'src/static/api';

const checkBoxDesign = ({ selectedStatus, currentStatus }) => ({
	display: 'flex',
	justifyContent: 'space-around',
	cursor: 'pointer',
	alignItems: 'center',
	px: 0.5,
	py: 1,
	m: 1,
	'&:hover': {
		color: `${REQUESTED_STATUS_COLORS_BY_KEY[currentStatus]}.main`,
		backgroundColor: `${REQUESTED_STATUS_COLORS_BY_KEY[currentStatus]}.light`,
	},
	...(selectedStatus
		? {
			color: `${REQUESTED_STATUS_COLORS_BY_KEY[currentStatus]}.main`,
			backgroundColor: `${REQUESTED_STATUS_COLORS_BY_KEY[currentStatus]}.light`,
		}
		: {}),
});

const RequestedStatusCol = ({ id, status, handleSubmitStatus }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [display, setDisplay] = useState(false);

	const [transitionList, setTransitionList] = useState([]);
	const [selectedStatus, setSelectedStatus] = useState('');
	const open = Boolean(anchorEl);

	const theme = useTheme();

	const handleOpen = (event) => {
		setTransitionList(TRANSITION_LIST_BY_KEY[status.toLowerCase()]);
		setAnchorEl(event.currentTarget);
	};

	const handleSelect = (data) => {
		if (data === selectedStatus) {
			setSelectedStatus('');
		} else {
			setSelectedStatus(data);
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleReset = () => {
		setAnchorEl(null);
		setSelectedStatus('');
	};

	const statusInLowerCase = status.toLowerCase();

	return (
		<>
			<Typography variant='body2' sx={{ fontFamily: 'Gilroy' }}>
				{status}
				<Link
					sx={{
						cursor: 'pointer',
					}}
					onClick={(event) => handleOpen(event)}
				>
          (change)
				</Link>
			</Typography>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<Box sx={{ minWidth: 275, p: 1, backgroundColor: 'neutral.100' }}>
					<Typography variant='h5' component='div'>
            Change Status
					</Typography>
					<Card sx={{ mx: 1 }}>
						<CardContent>
							<Typography
								sx={{ fontSize: '1rem' }}
								color='text.secondary'
								gutterBottom
							>
                Current Status
							</Typography>
							<Box sx={{ textAlign: 'center' }}>
								<Typography
									sx={{
										width: '50%',
										px: 0.75,
										py: 0.5,
										color: `${REQUESTED_STATUS_COLORS_BY_KEY[statusInLowerCase]}.main`,
										backgroundColor: `${REQUESTED_STATUS_COLORS_BY_KEY[statusInLowerCase]}.light`,
									}}
								>
									{status}
								</Typography>
							</Box>
						</CardContent>
					</Card>
					{transitionList.map((data) => {
						return (
							<Box
								onClick={() => handleSelect(data)}
								onMouseLeave={() => {
									setDisplay(false);
								}}
								onMouseEnter={() => {
									setDisplay(true);
								}}
								key={data}
								sx={checkBoxDesign({ selectedStatus, currentStatus: data })}
							>
								<Box>{STATUS_TEXT[data]}</Box>
								<IconButton
									sx={{
										border: `1px solid ${theme.palette.neutral[500]}`,
										padding: 0,
									}}
									size='small'
								>
									<CheckCircle
										sx={{
											visibility:
                        display || selectedStatus ? 'inherit' : 'hidden',
											color: `${REQUESTED_STATUS_COLORS_BY_KEY[data]}.main`,
											'&:hover': {},
										}}
									/>
								</IconButton>
							</Box>
						);
					})}
					<Box sx={{ width: '100%', px: 0.5 }}>
						<Button sx={{ width: '50%' }} onClick={handleReset}>
              Cancel
						</Button>
						<Button
							sx={{ width: '50%' }}
							onClick={() => handleSubmitStatus({ status: selectedStatus, id })}
							variant='contained'
						>
              Done
						</Button>
					</Box>
				</Box>
			</Popover>
		</>
	);
};

const AssignStatus = ({ handleSubmitStatus, id }) => {
	return (
		<Stack
			direction='row'
			justifyContent='center'
			spacing={1}
			alignItems='center'
		>
			<Button
				variant='contained'
				onClick={() =>
					handleSubmitStatus({ status: REQUESTED_STATUS_TYPES.approved, id })
				}
				color='success'
				size='small'
			>
        Approve
			</Button>
			<Button
				variant='contained'
				onClick={() =>
					handleSubmitStatus({ status: REQUESTED_STATUS_TYPES.approved, id })
				}
				color='error'
				size='small'
			>
        Reject
			</Button>
		</Stack>
	);
};

const SummaryTable = ({ rows = [] }) => {
	const [loadingStatus, setLoadingStatus] = useState(API_STATUS.initial);

	const handleSubmitStatus = async ({ status, id }) => {
		try {
			const req = {
				status,
				id,
			};
			setLoadingStatus(API_STATUS.loading);
			await updateStatusById(req);
			setLoadingStatus(API_STATUS.done);
		} catch (err) {
			setLoadingStatus(API_STATUS.failed);
		}
	};

	if (loadingStatus === API_STATUS.loading) {
		return 'loading...';
	}
	return (
		<Paper elevation={12} variant='outlined'>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							{MOBILE_KEY_ISSUANCE_SUMMARY_TABLE_HEADER.map(({ label, id }) => {
								return <TableCell key={id}>{label}</TableCell>;
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row, index) => (
							<TableRow key={row.id}>
								<TableCell
									sx={{
										width: '4%',
									}}
								>
									{index + 1}
								</TableCell>
								<TableCell
									align='right'
									sx={{
										width: '16%',
									}}
								>
									{row.email}
								</TableCell>
								<TableCell
									sx={{
										width: '7%',
									}}
								>
									{row.guestType}
								</TableCell>
								<TableCell
									sx={{
										width: '14%',
									}}
								>
									{formatYYYYMMDDWith12hoursAMPM(row.requestedOn)}
								</TableCell>
								<TableCell
									sx={{
										width: '12%',
									}}
								>
									{!row.requestStatus ? (
										<AssignStatus
											id={row.id}
											handleSubmitStatus={handleSubmitStatus}
										/>
									) : (
										<RequestedStatusCol
											status={row.requestStatus}
											id={row.id}
											handleSubmitStatus={handleSubmitStatus}
										/>
									)}
								</TableCell>
								<TableCell
									sx={{
										width: '14%',
									}}
								>
									{formatYYYYMMDDWith12hoursAMPM(row.responseDateTime)}
								</TableCell>
								<TableCell
									sx={{
										width: '9%',
									}}
								>
									{row.responseBy}
								</TableCell>
								<TableCell
									sx={{
										width: '24%',
									}}
								>
									<TextareaAutosize
										aria-label='comment'
										placeholder='comments...'
										value={row.comment}
										style={{ width: 200 }}
										onBlur={() => {
											console.log('Out focus save comments ');
										}}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};

export default SummaryTable;
