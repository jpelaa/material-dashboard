import Head from 'next/head';
import { Box } from '@mui/material';
import MobileKeyStatusComp from 'src/components/mobile-key-status';
import DashboardLayout from 'src/components/layout';
import { formatDDMMMYYYY } from 'src/utils/date';
import { API_STATUS, ERROR_MESSAGES } from 'src/static/api';
import { getUserData } from 'src/utils/mobile-key-status';
// import {
// 	AuthenticatedTemplate,
// 	UnauthenticatedTemplate,
// } from '@azure/msal-react';
// import SignIn from 'src/components/signin';

const MobileKeyStatus = ({ mobileKeyStatus, loadingStatus, errorMessage }) => {
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
					<MobileKeyStatusComp
						mobileKeyStatus={mobileKeyStatus}
						loadingStatus={loadingStatus}
						errorMessage={errorMessage}
					/>
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

export async function getServerSideProps() {
	let mobileKeyStatus = [];
	let loadingStatus = API_STATUS.initial;
	let errorMessage = ERROR_MESSAGES[500];

	try {
		const currentDate = formatDDMMMYYYY(new Date());
		const response = await getUserData({ currentDate });
		mobileKeyStatus = response;
		loadingStatus = API_STATUS.done;
	} catch (err) {
		loadingStatus = API_STATUS.failed;
		errorMessage = err.message;
	}

	return {
		props: {
			mobileKeyStatus,
			loadingStatus,
			errorMessage,
		},
	};
}
