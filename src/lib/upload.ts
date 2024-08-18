import { createClient } from '@supabase/supabase-js';

export async function uploadUserAvatar(image: File) {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
	const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

	const supabase = createClient(supabaseUrl, supabaseKey);

	const data = await supabase.storage
		.from('avatars')
		.upload(`${image.name}_${Date.now()}`, image);

	const dataUrl = await supabase.storage
		.from('avatars')
		.getPublicUrl(data.data?.path!);

	return dataUrl.data.publicUrl;
}

export async function uploadPropertyImages(images: File[]) {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
	const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

	const supabase = createClient(supabaseUrl, supabaseKey);

	const data = await Promise.all(
		images.map(img =>
			supabase.storage
				.from('propertyImages')
				.upload(`${img.name}_${Date.now()}`, img)
		)
	);

	const urls = data.map(
		item =>
			supabase.storage
				.from('propertyImages')
				.getPublicUrl(item.data?.path ?? '').data.publicUrl
	);
	return urls;
}
