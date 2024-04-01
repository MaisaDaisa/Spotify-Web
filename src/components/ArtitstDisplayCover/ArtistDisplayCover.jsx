import React from "react";
import Nas from "../../assets/images/nas.jpg";

const ArtistDisplayCover = ({ imgSrc, name, uri }) => {
	return (
		<div className="flex flex-col  items-center gap-2 flex-shrink-0 w-[160px]">
			<img src={imgSrc ? Nas : Nas} alt="" className="w-40 h-40 rounded-full" />

			<h1 className="text-default-font text-md  overflow-x-scroll text-nowrap bottom-player-text">
				{name ? name : "For the mind"}
			</h1>
		</div>
	);
};

export default ArtistDisplayCover;
