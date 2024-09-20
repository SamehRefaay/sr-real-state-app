'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { Input } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const Search = () => {
	const pathName = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const handleChange = useDebouncedCallback((query: string) => {
		if (query) {
			params.set('query', query);
		} else {
			params.delete('query');
		}
		router.replace(`${pathName}?${params.toString()}`);
	}, 1000);

	return (
		<div className="flex justify-center items-center">
			<Input
				className="w-96"
				endContent={
					<div className="">
						<MagnifyingGlassIcon className="w-8 h-full rounded-md text-color-pallette-ecru" />
					</div>
				}
				defaultValue={searchParams.get('query') ?? ''}
				onChange={e => handleChange(e.target.value)}
			/>
		</div>
	);
};

export default Search;
