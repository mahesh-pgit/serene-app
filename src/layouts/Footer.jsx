import { GITHUB_SVG, LINKEDIN_SVG } from "../assets/SVGs";

const Footer = () => {
	const anchorStyles =
		"block w-10 h-10 text-[#3C3C3C] bg-white/30 flex justify-center items-center rounded-full hover:text-white ";

	return (
		<footer className="w-screen h-14 flex items-center justify-end">
			<div className="flex gap-x-2 mr-3">
				<a
					className={anchorStyles + "hover:bg-[#1F2328]"}
					href="https://github.com/mahesh-pgit/serene-app"
					target="_blank">
					{GITHUB_SVG}
				</a>

				<a
					className={anchorStyles + "hover:bg-[#0A66C2]"}
					href="https://www.linkedin.com/in/mahesh-sai-kumar-narava"
					target="_blank">
					{LINKEDIN_SVG}
				</a>
			</div>
		</footer>
	);
};

export default Footer;
