import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, ListItem } from '@mui/material';

const NavItem = (props) => {
	const { href, icon, title, ...others } = props;
	const router = useRouter();
	const active = href ? router.pathname === href : false;

	return (
		<ListItem
			disableGutters
			sx={{
				display: 'flex',
				mb: 0.5,
				py: 0,
				px: 1,
			}}
			{...others}
		>
			<NextLink href={href} passHref>
				<Button
					component='a'
					startIcon={icon}
					disableRipple
					sx={{
						backgroundColor: active && 'background.button',
						color: active ? 'primary.light' : 'neutral.300',
						fontWeight: active && 'fontWeightBold',
						justifyContent: 'flex-start',
						px: 3,
						textAlign: 'left',
						textTransform: 'none',
						width: '100%',
						'& .MuiButton-startIcon': {
							color: active ? 'primary.light' : 'neutral.400',
						},
						'&:hover': {
							backgroundColor: 'background.button',
						},
					}}
				>
					<Box sx={{ flexGrow: 1 }}>{title}</Box>
				</Button>
			</NextLink>
		</ListItem>
	);
};

NavItem.propTypes = {
	href: PropTypes.string,
	icon: PropTypes.node,
	title: PropTypes.string,
};

export default NavItem;
