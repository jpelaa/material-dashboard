import Head from 'next/head';
import '../styles/globals.css';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from '../services/msal';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';

const clientSideEmotionCache = createEmotionCache();
const msalInstance = new PublicClientApplication(msalConfig);

const App = (props) => {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

	return (
		<MsalProvider instance={msalInstance}>
			<CacheProvider value={emotionCache}>
				<Head>
					<title>Dashboard</title>
					<meta name='viewport' content='initial-scale=1, width=device-width' />
				</Head>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<Component {...pageProps} />
					</ThemeProvider>
				</LocalizationProvider>
			</CacheProvider>
		</MsalProvider>
	);
};

export default App;
