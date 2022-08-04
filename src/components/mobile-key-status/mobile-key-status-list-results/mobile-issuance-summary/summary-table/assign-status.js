import { Button, Stack } from '@mui/material';
import { REQUESTED_STATUS_TYPES } from 'src/static/mobile-key-status';

const AssignStatus = ({ handleSubmitStatus, id, row, summaryIndex }) => {
	const handleClick = (status) => {
		handleSubmitStatus({ status, id, row, summaryIndex });
	};

	return (
		<Stack
			direction='row'
			justifyContent='center'
			spacing={1}
			alignItems='center'
		>
			<Button
				variant='contained'
				onClick={() => handleClick(REQUESTED_STATUS_TYPES.approved)}
				color='success'
				size='small'
			>
        Approve
			</Button>
			<Button
				variant='contained'
				onClick={() => handleClick(REQUESTED_STATUS_TYPES.rejected)}
				color='error'
				size='small'
			>
        Reject
			</Button>
		</Stack>
	);
};
export default AssignStatus;
