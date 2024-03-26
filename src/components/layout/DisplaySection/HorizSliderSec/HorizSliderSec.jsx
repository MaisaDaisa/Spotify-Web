import React from "react";

export const HorizSliderSec = ({ children, title }) => {
	return (
		<div className="flex flex-col gap-3">
			<h1 className="text-3xl font-bold ml-3">{title}</h1>
			<div className="p-3 w-full flex flex-row gap-6 overflow-x-auto spoti-scrollbar-horiz">
				{children}
			</div>
		</div>
	);
};
