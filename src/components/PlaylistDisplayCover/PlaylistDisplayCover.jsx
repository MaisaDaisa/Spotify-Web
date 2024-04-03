import React, { useState } from "react";
import Nas from "../../assets/images/nas.jpg";
import { useNavigate } from "react-router-dom";

const PlaylistDisplayCover = ({name, imgSrc, id}) => {
	const navigate = useNavigate()
	const [ stateName, setName ] = useState(name);
	const [ stateImgSrc, setImgSrc ] = useState(imgSrc);
	const [ stateId, setId ] = useState(id);

	function handleClick() {
		navigate(`/playlist/${stateId}`)
	}
	return (
		<div className="flex flex-col cursor-pointer items-center gap-2 flex-shrink-0 w-[160px]"
		onClick={handleClick}>
			<img
				src={stateImgSrc ? stateImgSrc : Nas}
				alt=""
				className="w-40 h-40 rounded-lg"
			/>
			<div className="flex flex-col w-[160px] gap-1">
				<h1 className="text-default-font text-md  overflow-x-scroll text-nowrap bottom-player-text">
					By {name}
				</h1>
				<div className="flex flex-row gap-1 overflow-x-scroll text-nowrap bottom-player-text">
				</div>
			</div>
		</div>
	);
};

export default PlaylistDisplayCover;
