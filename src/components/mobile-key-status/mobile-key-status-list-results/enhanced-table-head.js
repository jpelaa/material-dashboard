import {
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { visuallyHidden } from '@mui/utils';
import { MOBILE_KEY_STATUS_TABLE_HEADER } from 'src/static/constants';
import { FONT_FAMILIES } from 'src/static/styles';

function EnhancedTableHead(props) {
	const { order, orderBy, onRequestSort } = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	const renderHeaderContent = ({ id, label, caption }) => {
		if (id === 'mobileKeys') {
			return (
				<Box>
					<Typography
						sx={{
							fontFamily: FONT_FAMILIES.gilroy,
							fontSize: '14px',
							fontWeight: 600,
							lineHeight: 1,
							letterSpacing: 0.5,
						}}
						variant='subtitle2'
						component='div'
					>
						{label}
					</Typography>
					<Typography
						sx={{
							fontFamily: FONT_FAMILIES.gilroy,
							fontSize: '10px',
							fontWeight: 500,
							lineHeight: 0.75,
							letterSpacing: 0.4,
						}}
						variant='body2'
						component='div'
					>
						{caption}
					</Typography>
				</Box>
			);
		}
		return (
			<Typography
				sx={{
					fontFamily: FONT_FAMILIES.gilroy,
					fontSize: '14px',
					fontWeight: 600,
					lineHeight: 1,
					letterSpacing: 0.5,
				}}
				variant='subtitle2'
				component='div'
			>
				{label}
			</Typography>
		);
	};

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
								<Box component='span' sx={visuallyHidden}>
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

export default EnhancedTableHead;
