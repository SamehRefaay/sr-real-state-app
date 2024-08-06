interface Props {
	title: string;
}

const SectionTitle = (props: Props) => {
	return (
		<div className="">
			<h1 className="text-xl text-slate-500 font-bold">{props.title}</h1>
			<hr className="my-2 border-solid border-slate-400" />
		</div>
	);
};

export default SectionTitle;
