import { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import { DRAWER_WIDTH } from 'src/static/styles';
import useSwipe from './hooks/useSwipe';
import { DIRECTIONS } from 'src/static/constants';

const DashboardLayoutRoot = styled('div')(({ open }) => ({
	display: 'flex',
	flex: '1 1 auto',
	maxWidth: '100%',
	paddingTop: 64,
	...(open && {
		paddingLeft: DRAWER_WIDTH,
	}),
}));

export const DashboardLayout = (props) => {
	const { children } = props;
	const [isSidebarOpen, setSidebarOpen] = useState(true);

	const handleSidebarOpen = (swipeDirection) => {
		const bool = swipeDirection === DIRECTIONS.left ? false : true;
		setSidebarOpen(bool);
	};

	useSwipe(handleSidebarOpen);

	return (
		<>
			<DashboardLayoutRoot open={isSidebarOpen}>
				<Box
					sx={{
						display: 'flex',
						flex: '1 1 auto',
						flexDirection: 'column',
						width: '100%',
					}}
				>
					{children}
				</Box>
			</DashboardLayoutRoot>
			<DashboardNavbar
				open={isSidebarOpen}
				onSidebarOpen={() => setSidebarOpen(!isSidebarOpen)}
			/>

			<DashboardSidebar
				onClose={() => setSidebarOpen(!isSidebarOpen)}
				open={isSidebarOpen}
			/>
		</>
	);
};
