import { useRef, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import {
	Box,
	Divider,
	Typography,
	MenuItem,
	Avatar,
	IconButton,
} from '@mui/material';
// components
import MenuPopover from './menu-popover';
import { useMsal } from '@azure/msal-react';

export default function AccountPopover() {
	const anchorRef = useRef(null);
	const { instance } = useMsal();

	const [open, setOpen] = useState(null);

	const handleOpen = (event) => {
		setOpen(event.currentTarget);
	};

	const handleClose = () => {
		setOpen(null);
	};

	return (
		<>
			<IconButton
				ref={anchorRef}
				onClick={handleOpen}
				sx={{
					p: 0,
					...(open && {
						'&:before': {
							zIndex: 1,
							content: '\'\'',
							width: '100%',
							height: '100%',
							borderRadius: '50%',
							position: 'absolute',
							bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
						},
					}),
				}}
			>
				<Avatar src='/static/images/avatars/avatar_1.png' alt='photoURL' />
			</IconButton>

			<MenuPopover
				open={Boolean(open)}
				anchorEl={open}
				onClose={handleClose}
				sx={{
					p: 0,
					mt: 1.5,
					ml: 0.75,
					'& .MuiMenuItem-root': {
						typography: 'body2',
					},
				}}
			>
				<Box sx={{ my: 1.5, px: 2.5 }}>
					<Typography variant='subtitle2' noWrap sx={{ fontWeight: 'bold' }}>
						{'Jayaprakash E'}
					</Typography>
					<Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
						{'asd@asd,com'}
					</Typography>
				</Box>

				<Divider sx={{ borderStyle: 'dashed' }} />
				<MenuItem
					onClick={() => {
						instance.logoutRedirect({
							postLogoutRedirectUri: 'http://localhost:3000/',
						});
					}}
					sx={{ m: 1 }}
				>
          Logout
				</MenuItem>
			</MenuPopover>
		</>
	);
}
