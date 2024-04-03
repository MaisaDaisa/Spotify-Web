import React from "react";
import defaultProfile from "../../assets/images/defaultProfile.jpg"

const ArtistDisplayCover = ({ imgSrc, name, uri }) => {
	console.log(imgSrc);
	return (
		<div className="flex flex-col  items-center gap-2 flex-shrink-0 w-[160px]">
			<img src={imgSrc[0] ? imgSrc[0].url : defaultProfile} alt="" className="w-40 h-40 rounded-full" />

			<h1 className="text-default-font text-md  overflow-x-scroll text-nowrap bottom-player-text">
				{name ? name : "For the mind"}
			</h1>
		</div>
	);
};

export default ArtistDisplayCover;
