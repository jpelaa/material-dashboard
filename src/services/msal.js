import { LogLevel } from '@azure/msal-browser';

export const msalConfig = {
	auth: {
		clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID,
		authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,
		redirectUri: process.env.NEXT_PUBLIC_AZURE_REDIRECT_URI,
	},
	cache: {
		cacheLocation: 'sessionStorage',
		storeAuthStateInCookie: false,
	},
	system: {
		loggerOptions: {
			loggerCallback: (level, message, containsPii) => {
				if (containsPii) {
					return;
				}
				switch (level) {
				case LogLevel.Error:
					console.error(message);
					return;
				case LogLevel.Info:
					console.info(message);
					return;
				case LogLevel.Verbose:
					console.debug(message);
					return;
				case LogLevel.Warning:
					console.warn(message);
					return;
				}
			},
		},
	},
};
