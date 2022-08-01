import Head from 'next/head';
import {
	Box,
	Button,
	CircularProgress,
	Container,
	Typography,
} from '@mui/material';
import Image from 'next/image';
import logo from 'public/static/images/logo.png';
import { useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import { CENTER_STYLES } from 'src/static/styles';

const SignIn = () => {
	const [loading, setLoadingStatus] = useState(true);
	const { instance } = useMsal();

	useEffect(() => {
		setTimeout(() => {
			setLoadingStatus(false);
		}, 2000);
	}, []);

	const handleSignIn = async () => {
		await instance.handleRedirectPromise();
		const accounts = instance.getAllAccounts();
		if (accounts.length === 0) {
			// No user signed in
			instance.loginRedirect('redirect').catch((e) => {
				console.error(e);
			});
		}
	};

	if (loading) {
		return (
			<Box sx={{ ...CENTER_STYLES, width: '100%', height: '100vh' }}>
				<CircularProgress />
			</Box>
		);
	}
	return (
		<>
			<Head>
				<title>Sign In</title>
			</Head>
			<Box
				sx={{
					alignItems: 'center',
					display: 'flex',
					flexGrow: 1,
					overflow: 'hidden',
					position: 'relative',
				}}
			>
				<Box
					component='main'
					sx={{
						backgroundImage: 'url(/static/images/background-signin.jpg)',
						backgroundRepeat: 'no-repeat',
						backgroundColor: '#000',
						backgroundSize: 'cover',
						position: 'absolute',
						height: '100vh',
						left: 0,
						right: 0,
						top: 0,
						width: '100%',
					}}
				>
					<Box
						sx={{
							background:
                'radial-gradient(ellipse at center,rgba(5,1,0,0) 0,#0d0b0b 70%,#000 95%)',
							height: '100%',
							left: '0',
							position: 'absolute',
							top: '0',
							width: '100%',
							zIndex: '0',
						}}
					></Box>
					<Box
						sx={{
							background:
                'linear-gradient(180deg,rgba(0,0,0,.33),rgba(0,0,0,.25) 86%,rgba(0,0,0,.25) 0,rgba(0,0,0,.25) 0,#000)',
							left: '0',
							position: 'absolute',
							top: '0',
							width: '100%',
							zIndex: '0',
							height: '100%',
						}}
					></Box>
				</Box>

				<Container maxWidth='md' sx={{ zIndex: 1 }}>
					<Box
						sx={{
							alignItems: 'center',
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<Typography align='center' color='text.tertiary' variant='h3'>
              Account Login
						</Typography>
						<Box
							sx={{
								textAlign: 'center',
								backgroundColor: 'neutral.900',
								px: 8,
								py: 10,
							}}
						>
							<Box sx={{ mb: 3 }}>
								<Image
									alt='Logo'
									src={logo}
									layout='intrinsic'
									width={200}
									height={60}
								/>
							</Box>
							<Button
								variant='outlined'
								sx={{
									fontSize: '1.25rem',
									color: 'primary.contrastText',
									borderWidth: 2,
									'&:hover': {
										backgroundColor: 'primary.main',
										borderWidth: 2,
									},
									px: 3,
								}}
								onClick={handleSignIn}
							>
                Sign with microsoft
							</Button>
						</Box>
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default SignIn;
