import React, { useState } from "react";
import Nas from "../../assets/images/nas.jpg";

const PlaylistDisplayCover = (name, imgSrc, uri) => {
	const [ stateName, setName ] = useState(name);
	const [ stateImgSrc, setImgSrc ] = useState(imgSrc);
	const [ stateUri, setUri ] = useState(uri);
	return (
		<div className="flex flex-col  items-center gap-2 flex-shrink-0 w-[160px]">
			<img
				src={stateImgSrc ? stateImgSrc : Nas}
				alt=""
				className="w-40 h-40 rounded-lg"
			/>
			<div className="flex flex-col w-[160px] gap-1">
				<h1 className="text-default-font text-md  overflow-x-scroll text-nowrap bottom-player-text">
					By {stateName ? "for The Mind" : "For the mind"}
				</h1>
				<div className="flex flex-row gap-1 overflow-x-scroll text-nowrap bottom-player-text">
				</div>
			</div>
		</div>
	);
};

export default PlaylistDisplayCover;
