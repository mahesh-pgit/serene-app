const CROSS_SVG = (
	<svg width={16} height={16} viewBox="0 0 15 15">
		<path
			fill="currentColor"
			d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27"></path>
	</svg>
);

const TICK_SVG = (
	<svg className="w-full h-full" viewBox="0 0 15 15">
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M0 7.5a7.5 7.5 0 1 1 15 0a7.5 7.5 0 0 1-15 0m7.072 3.21l4.318-5.398l-.78-.624l-3.682 4.601L4.32 7.116l-.64.768z"
			clipRule="evenodd"></path>
	</svg>
);

const EDIT_SVG = (
	<svg className="w-full h-full" viewBox="0 0 24 24">
		<g
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}>
			<path d="M19.09 14.441v4.44a2.37 2.37 0 0 1-2.369 2.369H5.12a2.37 2.37 0 0 1-2.369-2.383V7.279a2.356 2.356 0 0 1 2.37-2.37H9.56"></path>
			<path d="M6.835 15.803v-2.165c.002-.357.144-.7.395-.953l9.532-9.532a1.36 1.36 0 0 1 1.934 0l2.151 2.151a1.36 1.36 0 0 1 0 1.934l-9.532 9.532a1.36 1.36 0 0 1-.953.395H8.197a1.36 1.36 0 0 1-1.362-1.362M19.09 8.995l-4.085-4.086"></path>
		</g>
	</svg>
);

const DELETE_SVG = (
	<svg className="w-full h-full" viewBox="0 0 24 24">
		<path
			fill="currentColor"
			d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zm-7 11q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17M7 6v13z"></path>
	</svg>
);

const MENU_SVG = (
	<svg className="w-full h-full" viewBox="0 0 24 24">
		<path
			fill="currentColor"
			d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"></path>
	</svg>
);

const BACKGROUND_SVG = (
	<svg className="w-full h-full" viewBox="0 0 24 24">
		<path
			fill="currentColor"
			d="M12.747 22.315h.002q.764 0 1.442-.002a1 1 0 0 0 .121 0c3.393-.02 5.26-.172 6.676-1.378c.24-.2.44-.41.64-.64c1.38-1.62 1.38-3.83 1.38-8.24s0-6.62-1.38-8.24c-.2-.24-.41-.44-.64-.64c-1.62-1.38-3.83-1.38-8.24-1.38s-6.62 0-8.24 1.38c-.24.2-.44.41-.64.64c-1.38 1.62-1.38 3.83-1.38 8.24s0 6.62 1.38 8.24c.2.24.41.44.64.64c1.62 1.38 3.84 1.38 8.24 1.38m.001-1.52c-.796 0-1.513 0-2.162-.008L21.48 9.884q.01.975.008 2.17v1.211l-7.53 7.529zm7.26-1.02c-.805.685-1.986.91-3.894.984l5.338-5.339c-.074 1.909-.299 3.09-.984 3.895c-.14.17-.29.32-.46.46M11.556 3.316l1.192-.001q1.198-.002 2.173.008L4.016 14.236c-.008-.653-.008-1.378-.008-2.181l.001-1.192zm-2.154.034L4.044 8.71c.073-1.92.297-3.106.984-3.914c.14-.17.29-.32.46-.46c.81-.688 1.991-.912 3.914-.985m10.265.736L4.779 18.973c-.402-.645-.594-1.5-.686-2.692L16.965 3.399c1.197.091 2.055.284 2.702.687M5.84 20.03L20.725 5.148c.398.645.588 1.5.68 2.69L8.542 20.713c-1.195-.09-2.054-.282-2.7-.68"
			color="currentColor"></path>
	</svg>
);

const GITHUB_SVG = (
	<svg width={24} height={24} viewBox="0 0 24 24">
		<mask id="lineMdGithubLoop0" width={24} height={24} x={0} y={0}>
			<g fill="#fff">
				<ellipse cx={9.5} cy={9} rx={1.5} ry={1}></ellipse>
				<ellipse cx={14.5} cy={9} rx={1.5} ry={1}></ellipse>
			</g>
		</mask>
		<g
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}>
			<path
				strokeDasharray={32}
				strokeDashoffset={32}
				d="M12 4c1.67 0 2.61 0.4 3 0.5c0.53 -0.43 1.94 -1.5 3.5 -1.5c0.34 1 0.29 2.22 0 3c0.75 1 1 2 1 3.5c0 2.19 -0.48 3.58 -1.5 4.5c-1.02 0.92 -2.11 1.37 -3.5 1.5c0.65 0.54 0.5 1.87 0.5 2.5c0 0.73 0 3 0 3M12 4c-1.67 0 -2.61 0.4 -3 0.5c-0.53 -0.43 -1.94 -1.5 -3.5 -1.5c-0.34 1 -0.29 2.22 0 3c-0.75 1 -1 2 -1 3.5c0 2.19 0.48 3.58 1.5 4.5c1.02 0.92 2.11 1.37 3.5 1.5c-0.65 0.54 -0.5 1.87 -0.5 2.5c0 0.73 0 3 0 3">
				<animate
					fill="freeze"
					attributeName="stroke-dashoffset"
					dur="1.225s"
					values="32;0"></animate>
			</path>
			<path
				strokeDasharray={10}
				strokeDashoffset={10}
				d="M9 19c-1.406 0-2.844-.563-3.688-1.188C4.47 17.188 4.22 16.157 3 15.5">
				<animate
					attributeName="d"
					dur="5.25s"
					repeatCount="indefinite"
					values="M9 19c-1.406 0-2.844-.563-3.688-1.188C4.47 17.188 4.22 16.157 3 15.5;M9 19c-1.406 0-3-.5-4-.5-.532 0-1 0-2-.5;M9 19c-1.406 0-2.844-.563-3.688-1.188C4.47 17.188 4.22 16.157 3 15.5"></animate>
				<animate
					fill="freeze"
					attributeName="stroke-dashoffset"
					begin="1.4s"
					dur="0.35s"
					values="10;0"></animate>
			</path>
		</g>
		<rect width={8} height={4} x={8} y={11} fill="currentColor" mask="url(#lineMdGithubLoop0)">
			<animate
				attributeName="y"
				dur="17.5s"
				keyTimes="0;0.45;0.46;0.54;0.55;1"
				repeatCount="indefinite"
				values="11;11;7;7;11;11"></animate>
		</rect>
	</svg>
);

const LINKEDIN_SVG = (
	<svg width={24} height={24} viewBox="0 0 24 24">
		<circle cx={4} cy={4} r={2} fill="currentColor" fillOpacity={0}>
			<animate fill="freeze" attributeName="fill-opacity" dur="0.3s" values="0;1"></animate>
		</circle>
		<g
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={3.5}>
			<path strokeDasharray={12} strokeDashoffset={12} d="M4 10v10">
				<animate
					fill="freeze"
					attributeName="stroke-dashoffset"
					begin="0.3s"
					dur="0.4s"
					values="12;0"></animate>
			</path>
			<path strokeDasharray={12} strokeDashoffset={12} d="M10 10v10">
				<animate
					fill="freeze"
					attributeName="stroke-dashoffset"
					begin="0.9s"
					dur="0.4s"
					values="12;0"></animate>
			</path>
			<path
				strokeDasharray={24}
				strokeDashoffset={24}
				d="M10 15c0 -2.76 2.24 -5 5 -5c2.76 0 5 2.24 5 5v5">
				<animate
					fill="freeze"
					attributeName="stroke-dashoffset"
					begin="1.3s"
					dur="0.4s"
					values="24;0"></animate>
			</path>
		</g>
	</svg>
);

export {
	CROSS_SVG,
	TICK_SVG,
	EDIT_SVG,
	DELETE_SVG,
	MENU_SVG,
	BACKGROUND_SVG,
	GITHUB_SVG,
	LINKEDIN_SVG,
};
