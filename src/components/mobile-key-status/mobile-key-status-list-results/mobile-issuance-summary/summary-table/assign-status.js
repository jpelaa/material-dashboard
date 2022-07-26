import { Button, Stack } from '@mui/material';
import { REQUESTED_STATUS_TYPES } from 'src/static/constants';

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
export default AssignStatus;
