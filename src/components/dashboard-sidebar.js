import { useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, IconButton, Stack } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled, useTheme } from '@mui/styles';

import { NavItem } from './nav-item';
import { CENTER_STYLES, DRAWER_WIDTH } from 'src/static/styles';
import Image from 'next/image';
import logo from '../../public/static/images/logo.png';
import { MobileFriendly } from '@mui/icons-material';

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));

const items = [
	{
		href: '/',
		icon: <MobileFriendly sx={{ fontSize: 1 }} />,
		title: 'Mobile Key Status',
	},
];

export const DashboardSidebar = (props) => {
	const { open, onClose } = props;
	const router = useRouter();
	const theme = useTheme();

	useEffect(
		() => {
			if (!router.isReady) {
				return;
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[router.asPath]
	);

	const content = (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
				}}
			>
				<div>
					<Box sx={{ px: 2 }}>
						<Box
							sx={{
								backgroundColor: 'background.box',
								cursor: 'pointer',
								...CENTER_STYLES,
							}}
						>
							<Image
								alt='Logo'
								src={logo}
								layout='intrinsic'
								width={130}
								height={40}
							/>
						</Box>
					</Box>
				</div>
				<Divider
					sx={{
						my: 3,
					}}
				/>
				<Box sx={{ flexGrow: 1 }}>
					{items.map((item) => (
						<NavItem
							key={item.title}
							icon={item.icon}
							href={item.href}
							title={item.title}
						/>
					))}
				</Box>
				<Divider />
			</Box>
		</>
	);

	return (
		<Drawer
			anchor='left'
			onClose={onClose}
			open={open}
			PaperProps={{
				sx: {
					backgroundColor: 'secondary.main',
					color: 'secondary.contrastText',
					width: DRAWER_WIDTH,
					'& .MuiDrawer-paper': {
						width: DRAWER_WIDTH,
						boxSizing: 'border-box',
					},
				},
			}}
			sx={{
				zIndex: (theme) => theme.zIndex.appBar + 100,
			}}
			variant='persistent'
		>
			<DrawerHeader>
				<Stack direction='row-reverse'>
					<IconButton onClick={onClose}>
						{theme.direction === 'ltr' ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</Stack>
			</DrawerHeader>
			{content}
		</Drawer>
	);
};

DashboardSidebar.propTypes = {
	onClose: PropTypes.func,
	open: PropTypes.bool,
};
