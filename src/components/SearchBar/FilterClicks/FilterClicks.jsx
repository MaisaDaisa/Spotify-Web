import React from "react";

const FilterClicks = ({ name, selected, func }) => {
	return (
		<h2
			className={`search-filters text-lg font-semibold text-white px-5 py-2 hover:cursor-pointer bg-secondary-gray rounded-full border-2 ${
				selected === true ? "border-spoti-green" : "border-secondary-gray"
			}`}
            onClick={() => func(name)}>
			{name}
		</h2>
	);
};

export default FilterClicks;
