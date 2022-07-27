import { createTheme } from '@mui/material';
import { FONT_FAMILIES } from 'src/static/styles';

const PRIMARY_COLOR = '#7C6F55';
const SECONDARY_COLOR = '#000000';
const WHITE_COLOR = '#FFFFFF';

export const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 1000,
			lg: 1200,
			xl: 1920,
		},
	},
	components: {
		MuiButton: {
			defaultProps: {
				disableElevation: true,
			},
			styleOverrides: {
				root: {
					textTransform: 'none',
				},
			},
		},
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			},
		},
		MuiCardContent: {
			styleOverrides: {
				root: {
					padding: '32px 24px',
					'&:last-child': {
						paddingBottom: '32px',
					},
				},
			},
		},
		MuiCardHeader: {
			defaultProps: {
				titleTypographyProps: {
					variant: 'h6',
				},
				subheaderTypographyProps: {
					variant: 'body2',
				},
			},
			styleOverrides: {
				root: {
					padding: '32px 24px',
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				root: {
					paddingLeft: 0,
					paddingRight: 0,
					fontFamily: FONT_FAMILIES.gilroy,
					fontSize: '0.87rem',
				},
			},
		},
		MuiCssBaseline: {
			styleOverrides: {
				'*': {
					boxSizing: 'border-box',
					margin: 0,
					padding: 0,
				},
				html: {
					MozOsxFontSmoothing: 'grayscale',
					WebkitFontSmoothing: 'antialiased',
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100%',
					width: '100%',
				},
				body: {
					display: 'flex',
					flex: '1 1 auto',
					flexDirection: 'column',
					minHeight: '100%',
					width: '100%',
				},
				'#__next': {
					display: 'flex',
					flex: '1 1 auto',
					flexDirection: 'column',
					height: '100%',
					width: '100%',
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				notchedOutline: {
					borderColor: '#E6E8F0',
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					fontFamily: FONT_FAMILIES.gilroy,
					lineHeight: 'normal',
					padding: '5px 12px',
				},
			},
		},
		MuiTableHead: {
			styleOverrides: {
				root: {
					backgroundColor: PRIMARY_COLOR,
					borderBottom: 'none',
					'& .MuiTableCell-root': {
						color: WHITE_COLOR,
						borderBottom: 'none',
						fontSize: '14px',
						fontWeight: 600,
						lineHeight: 1,
						letterSpacing: 0.5,
						padding: '0.75rem 0.5rem',
					},
					'& .MuiTableCell-paddingCheckbox': {
						paddingTop: 4,
						paddingBottom: 4,
					},
				},
			},
		},
		MuiTableBody: {
			styleOverrides: {
				root: {
					backgroundColor: WHITE_COLOR,
					'.MuiTableCell-root': {
						color: SECONDARY_COLOR,
					},
				},
			},
		},
		MuiTableSortLabel: {
			styleOverrides: {
				root: {
					color: WHITE_COLOR,
					'&:hover': {
						color: SECONDARY_COLOR,
					},
					'&$active': {
						color: SECONDARY_COLOR,
					},
				},
				icon: {
					color: 'inherit !important',
				},
			},
		},
		MuiTablePagination: {
			styleOverrides: {
				root: {
					'.MuiTablePagination-selectLabel,.MuiTablePagination-displayedRows': {
						fontFamily: FONT_FAMILIES.gilroy,
					},
				},
			},
		},
		MuiDialogTitle: {
			styleOverrides: {
				root: {
					backgroundColor: SECONDARY_COLOR,
					color: WHITE_COLOR,
				},
			},
		},
		MuiFormControlLabel: {
			styleOverrides: {
				root: {
					'.MuiFormControlLabel-label': {
						fontFamily: FONT_FAMILIES.gilroy,
						fontSize: '1rem',
					},
				},
			},
		},
	},
	palette: {
		neutral: {
			100: '#fafafa',
			200: '#f1f1f1',
			300: '#e7e7e7',
			400: '#d4d4d4',
			500: '#adadad',
			600: '#7f7f7f',
			700: '#545454',
			800: '#373737',
			900: '#202020',
		},
		action: {
			active: '#6B7280',
			focus: 'rgba(55, 65, 81, 0.12)',
			hover: 'rgba(55, 65, 81, 0.04)',
			selected: 'rgba(55, 65, 81, 0.08)',
			disabledBackground: 'rgba(55, 65, 81, 0.12)',
			disabled: 'rgba(55, 65, 81, 0.26)',
			borderColor: '#2D3748',
		},
		background: {
			default: '#EEEEEE',
			paper: WHITE_COLOR,
			box: 'rgba(255, 255, 255, 0.04)',
			button: 'rgba(255,255,255, 0.08)',
		},
		divider: '#2D3748',
		primary: {
			main: PRIMARY_COLOR,
		},
		secondary: {
			main: SECONDARY_COLOR,
		},
		success: {
			main: '#14B8A6',
			light: '#C8F9F3',
			dark: '#0C6E63',
			contrastText: WHITE_COLOR,
		},
		info: {
			main: '#2196F3',
			light: '#D3EAFD',
			dark: '#08599B',
			contrastText: WHITE_COLOR,
		},
		warning: {
			main: '#FFB020',
			light: '#FFEFD1',
			dark: '#AD7100',
			contrastText: WHITE_COLOR,
		},
		error: {
			main: '#D14343',
			light: '#F6DADA',
			dark: '#832020',
			contrastText: WHITE_COLOR,
		},
		text: {
			primary: '#2c2c2c',
			secondary: '#65748B',
			disabled: 'rgba(55, 65, 81, 0.48)',
		},
	},
	shape: {
		borderRadius: 0,
	},
	shadows: [
		'none',
		'0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)',
		'0px 1px 2px rgba(100, 116, 139, 0.12)',
		'0px 1px 4px rgba(100, 116, 139, 0.12)',
		'0px 1px 5px rgba(100, 116, 139, 0.12)',
		'0px 1px 6px rgba(100, 116, 139, 0.12)',
		'0px 2px 6px rgba(100, 116, 139, 0.12)',
		'0px 3px 6px rgba(100, 116, 139, 0.12)',
		'0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)',
		'0px 5px 12px rgba(100, 116, 139, 0.12)',
		'0px 5px 14px rgba(100, 116, 139, 0.12)',
		'0px 5px 15px rgba(100, 116, 139, 0.12)',
		'0px 6px 15px rgba(100, 116, 139, 0.12)',
		'0px 7px 15px rgba(100, 116, 139, 0.12)',
		'0px 8px 15px rgba(100, 116, 139, 0.12)',
		'0px 9px 15px rgba(100, 116, 139, 0.12)',
		'0px 10px 15px rgba(100, 116, 139, 0.12)',
		'0px 12px 22px -8px rgba(100, 116, 139, 0.25)',
		'0px 13px 22px -8px rgba(100, 116, 139, 0.25)',
		'0px 14px 24px -8px rgba(100, 116, 139, 0.25)',
		'0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)',
		'0px 25px 50px rgba(100, 116, 139, 0.25)',
		'0px 25px 50px rgba(100, 116, 139, 0.25)',
		'0px 25px 50px rgba(100, 116, 139, 0.25)',
		'0px 25px 50px rgba(100, 116, 139, 0.25)',
	],
	typography: {
		button: {
			fontWeight: 600,
		},
		fontFamily: 'TfArrow',
	},
});
