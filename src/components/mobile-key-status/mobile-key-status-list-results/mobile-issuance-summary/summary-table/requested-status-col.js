import { useTheme } from '@emotion/react';
import { CheckCircle } from '@mui/icons-material';
import {
	Button,
	Card,
	CardContent,
	IconButton,
	Link,
	Popover,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import {
	REQUESTED_STATUS_COLORS_BY_KEY,
	STATUS_TEXT,
	TRANSITION_LIST_BY_KEY,
} from 'src/static/constants';
import { FONT_FAMILIES } from 'src/static/styles';

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
			<Typography variant='body2' sx={{ fontFamily: FONT_FAMILIES.gilroy }}>
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

export default RequestedStatusCol;
