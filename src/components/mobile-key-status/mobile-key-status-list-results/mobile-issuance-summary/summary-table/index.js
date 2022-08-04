import { useState } from 'react';
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextareaAutosize,
} from '@mui/material';
import { formatYYYYMMDDWith12hoursAMPM } from 'src/utils/date';
import { API_STATUS } from 'src/static/api';
import AssignStatus from './assign-status';
import RequestedStatusCol from './requested-status-col';
import {
	MOBILE_KEY_ISSUANCE_SUMMARY_TABLE_HEADER,
	REQUESTED_STATUS_TYPES,
} from 'src/static/mobile-key-status';
import { updateStatus } from 'src/utils/issuance-summary';

const SummaryTable = ({
	rows = [],
	mobileKeyStatusIndex,
	handleStatusChange,
}) => {
	const [loadingStatus, setLoadingStatus] = useState(API_STATUS.initial);

	const handleSubmitStatus = async ({ status, id, row, summaryIndex }) => {
		try {
			setLoadingStatus(API_STATUS.loading);
			console.log({ status, id, row, summaryIndex }, '  handleSubmitStatus ');
			await updateStatus({ status, id, row, rows });
			console.log({ status, id, row, summaryIndex }, ' submitStatus ');
			handleStatusChange({ mobileKeyStatusIndex, summaryIndex, status });
			setLoadingStatus(API_STATUS.done);
		} catch (err) {
			setLoadingStatus(API_STATUS.failed);
		}
	};

	if (loadingStatus === API_STATUS.loading) {
		return 'loading...';
	}
	return (
		<Paper elevation={12}>
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
							<TableRow key={row.emailId}>
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
									{row.emailId}
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
									{row.approvalStatus ===
                  REQUESTED_STATUS_TYPES.approvalPending ? (
											<AssignStatus
												id={row.emailId}
												row={row}
												summaryIndex={index}
												handleSubmitStatus={handleSubmitStatus}
											/>
										) : (
											<RequestedStatusCol
												status={row.approvalStatus}
												id={row.emailId}
												row={row}
												summaryIndex={index}
												handleSubmitStatus={handleSubmitStatus}
											/>
										)}
								</TableCell>
								<TableCell
									sx={{
										width: '14%',
									}}
								>
									{formatYYYYMMDDWith12hoursAMPM(row.approvedTime)}
								</TableCell>
								<TableCell
									sx={{
										width: '9%',
									}}
								>
									{row.approvedBy}
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
