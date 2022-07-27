import Head from 'next/head';
import { Box } from '@mui/material';
import MobileKeyStatusComp from '../components/mobile-key-status';
import { DashboardLayout } from '../components/dashboard-layout';
import createToken from 'src/utils/api/create-token';
import retrieveUserData from 'src/utils/api/retrieve-user-data';

const MobileKeyStatus = ({ mobileKeyStatus }) => (
	<>
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
			<MobileKeyStatusComp mobileKeyStatus={mobileKeyStatus} />
		</Box>
	</>
);

MobileKeyStatus.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default MobileKeyStatus;

export async function getServerSideProps() {
	const token = await createToken();
	const mobileKeyStatus = retrieveUserData({ token });

	return {
		props: {
			mobileKeyStatus,
		},
	};
}
