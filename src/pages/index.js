import Head from 'next/head';
import { Box } from '@mui/material';
import MobileKeyStatusComp from 'src/components/mobile-key-status';
import createToken from 'src/utils/api/create-token';
import retrieveUserData from 'src/utils/api/retrieve-user-data';
import DashboardLayout from 'src/components/layout';

const MobileKeyStatus = ({ mobileKeyStatus, isError, error, noData }) => {
	if (isError) {
		return <p>{JSON.stringify(error)}</p>;
	}

	if (noData) {
		return <p>No Data</p>;
	}

	return (
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
};

MobileKeyStatus.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default MobileKeyStatus;

export async function getServerSideProps() {
	try {
		let token;
		// const access_token = localStorage.getItem('access_token');
		// if (access_token) {
		// token = access_token;
		// } else {
		// await createToken();
		// token = localStorage.getItem('access_token');
		// }
		token = await createToken();
		const response = await retrieveUserData({ token });
		if (response.UserDetailsList && response.UserDetailsList.length > 0) {
			return {
				props: {
					mobileKeyStatus: response.UserDetailsList,
				},
			};
		} else {
			return {
				props: {
					noData: true,
				},
			};
		}
	} catch (err) {
		console.log(err, ' err ');
		return {
			props: {
				isError: true,
				error: err.message,
			},
		};
	}
}
