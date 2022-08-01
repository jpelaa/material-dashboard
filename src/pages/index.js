import Head from 'next/head';
import { Box } from '@mui/material';
import MobileKeyStatusComp from 'src/components/mobile-key-status';
import DashboardLayout from 'src/components/layout';
// import {
// 	AuthenticatedTemplate,
// 	UnauthenticatedTemplate,
// } from '@azure/msal-react';
// import SignIn from 'src/components/signin';

const MobileKeyStatus = () => {
	return (
		<>
			{/* <AuthenticatedTemplate> */}
			<DashboardLayout>
				<Head>
					<title>Mobile Key Status</title>
				</Head>
				<Box
					component='main'
					sx={{
						flexGrow: 1,
						py: 8,
					}}
				>
					<MobileKeyStatusComp />
				</Box>
			</DashboardLayout>
			{/* </AuthenticatedTemplate> */}
			{/* <UnauthenticatedTemplate> */}
			{/* <SignIn /> */}
			{/* </UnauthenticatedTemplate> */}
		</>
	);
};

export default MobileKeyStatus;
