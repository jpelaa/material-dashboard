const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'https://servicesuat.jumeirah.com/:path*',
			},
		];
	},
});
