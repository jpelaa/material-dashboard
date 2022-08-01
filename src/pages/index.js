import Head from 'next/head';
import { Box } from '@mui/material';
import MobileKeyStatusComp from 'src/components/mobile-key-status';
import DashboardLayout from 'src/components/layout';
import { formatDDMMMYYYY } from 'src/utils/date';
import { API_STATUS, ERROR_MESSAGES } from 'src/static/api';
import { getUserData } from 'src/utils/mobile-key-status';
import mobile_key_status from 'src/__mocks__/mobile_key_status';
import useNetwork from 'src/components/hooks/useNetwork';
import NoInternet from 'src/components/no-internet-dialog';
// import {
// 	AuthenticatedTemplate,
// 	UnauthenticatedTemplate,
// } from '@azure/msal-react';
// import SignIn from 'src/components/signin';

const MobileKeyStatus = ({ mobileKeyStatus, loadingStatus, errorMessage }) => {
	const isOffline = useNetwork();

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
			<NoInternet isOffline={isOffline} />
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
		if (response.length > 0) {
			mobileKeyStatus = response;
		} else {
			mobileKeyStatus = mobile_key_status;
		}
		loadingStatus = API_STATUS.done;
	} catch (err) {
		mobileKeyStatus = mobile_key_status;
		loadingStatus = API_STATUS.done;
		// loadingStatus = API_STATUS.failed;
		// errorMessage = err.message;
	}

	return {
		props: {
			mobileKeyStatus,
			loadingStatus,
			errorMessage,
		},
	};
}
