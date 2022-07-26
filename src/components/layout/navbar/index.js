import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { DRAWER_WIDTH } from 'src/static/styles';
import AccountPopover from './account-popover';

const DashboardNavbarRoot = styled(AppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	backgroundColor: open
		? theme.palette.background.paper
		: theme.palette.secondary.main,
	boxShadow: theme.shadows[3],
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${DRAWER_WIDTH}px)`,
		marginLeft: `${DRAWER_WIDTH}px`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const DashboardNavbar = (props) => {
	const { onSidebarOpen, ...other } = props;

	return (
		<>
			<DashboardNavbarRoot {...other}>
				<Toolbar
					disableGutters
					sx={{
						minHeight: 64,
						left: 0,
						px: 2,
					}}
				>
					<IconButton
						onClick={onSidebarOpen}
						sx={{
							display: {
								xs: 'inline-flex',
							},
						}}
					>
						<Menu fontSize='small' />
					</IconButton>
					<Box sx={{ flexGrow: 1 }} />
					<AccountPopover />
				</Toolbar>
			</DashboardNavbarRoot>
		</>
	);
};

DashboardNavbar.propTypes = {
	onSidebarOpen: PropTypes.func,
};

export default DashboardNavbar;
