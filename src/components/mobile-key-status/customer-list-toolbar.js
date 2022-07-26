import {
	Button,
	TextField,
	InputAdornment,
	SvgIcon,
	Typography,
	Grid,
	FormGroup,
	FormControlLabel,
	Switch,
	Stack,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { FONT_FAMILIES } from 'src/static/styles';

export const CustomerListToolbar = (props) => {
	const {
		enableFilter,
		handleFilterChange,
		commonFilterValue,
		handleCommonFilterValueChange,
		handleReset,
	} = props;

	return (
		<>
			<Grid container spacing={2} alignItems='center'>
				<Grid item xs={5}>
					<Typography sx={{ m: 1 }} variant='h5'>
            Mobile Key Status List
					</Typography>
				</Grid>
				<Grid item xs={4}>
					<TextField
						sx={{
							fontFamily: FONT_FAMILIES.gilroy,
						}}
						fullWidth
						size='small'
						disabled={enableFilter}
						value={commonFilterValue}
						onChange={handleCommonFilterValueChange}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<SvgIcon color='action' fontSize='small'>
										<Search />
									</SvgIcon>
								</InputAdornment>
							),
						}}
						placeholder='Search'
						variant='outlined'
					/>
				</Grid>
				<Grid item xs={3}>
					<Stack direction='row' justifyContent='center' alignItems='center'>
						<FormGroup>
							<FormControlLabel
								control={
									<Switch
										size='small'
										inputProps={{ 'aria-label': 'controlled' }}
										value={enableFilter}
										onChange={handleFilterChange}
									/>
								}
								label='Enable Filter'
							/>
						</FormGroup>
						<Button
							sx={{
								fontFamily: FONT_FAMILIES.gilroy,
							}}
							variant='contained'
							size='small'
							onClick={handleReset}
						>
              reset
						</Button>
					</Stack>
				</Grid>
			</Grid>
		</>
	);
};
