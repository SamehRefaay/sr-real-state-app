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
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'plus.unsplash.com',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'media.istockphoto.com',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'www.propertyfinder.eg',
				pathname: '**',
			},
		],
	},
};

export default nextConfig;
