import { Close } from '@mui/icons-material';
import {
	IconButton,
	InputAdornment,
	TableCell,
	TableRow,
	TextField,
} from '@mui/material';
import { MOBILE_KEY_STATUS_TABLE_HEADER } from 'src/static/mobile-key-status';

const FilterRow = ({ filters, handleIndividualFilterChange }) => {
	return (
		<TableRow>
			{MOBILE_KEY_STATUS_TABLE_HEADER.map((data) => {
				if (data.filterEnabled) {
					return (
						<TableCell
							align='center'
							sx={{
								padding: '0.75rem',
							}}
							key={data.id}
						>
							<TextField
								sx={{
									height: '1rem',
								}}
								placeholder={'search'}
								id='filled-start-adornment'
								size='small'
								value={filters[data.id] || ''}
								onChange={(event) =>
									handleIndividualFilterChange({
										id: data.id,
										value: event.target.value,
									})
								}
								InputProps={{
									endAdornment: (
										<InputAdornment sx={{ marginRight: 0 }} position='start'>
											<IconButton
												size='small'
												aria-label={`search ${data.id}`}
												onClick={() =>
													handleIndividualFilterChange({
														id: data.id,
														value: undefined,
													})
												}
											>
												<Close sx={{ fontSize: '1rem' }} />
											</IconButton>
										</InputAdornment>
									),
								}}
								variant='standard'
							/>
						</TableCell>
					);
				} else {
					<TableCell></TableCell>;
				}
			})}
		</TableRow>
	);
};
export default FilterRow;
