/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'kmydrmpuqqzsckpvcksy.supabase.co',
				// /storage/v1/object/public/propertyImages/
				pathname: '**',
			},
		],
	},
};

export default nextConfig;
