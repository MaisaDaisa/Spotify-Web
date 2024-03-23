import React, { useState, useEffect } from "react";
import SidebarNavLinks from "./SidebarNavLinks/SidebarNavLinks";
import { faCompass, faStar } from "@fortawesome/free-regular-svg-icons";
import SideBarPlaylists from "./SideBarPlaylists/SideBarPlaylists";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { fetchUserPlaylists } from "../../../lib/API/getInfo.js";
import './Sidebar.css'

const Sidebar = ({ additionalClass }) => {
	const [albums, setAlbums] = useState([]);

	useEffect(() => {
		fetchUserPlaylists().then((response) => {
			setAlbums(response.items);
		});
	}, []);

	return (
		<div
			className={`flex flex-col h-vh items-start gap-6 bg-overlay-black rounded-2xl p-8 pr-4 ${additionalClass}`}>
			<SidebarNavLinks icon={faBuilding} title={"Home"} />
			<SidebarNavLinks icon={faCompass} title={"Explore"} />
			<SidebarNavLinks icon={faStar} title={"Favorites"} />
			<div className="w-full flex flex-col items-start mt-5 gap-7 ">
				<h1 className="text-default-font text-2xl font-lg">Your library</h1>
				<div className="playlist-sidebar w-full flex flex-col h-96 overflow-y-scroll flex-nowrap items-start gap-5">
					{albums.map((playlist) => {
						return (
							<SideBarPlaylists
                key={playlist.id}
								imgSrc={playlist.images[0].url}
								name={playlist.name}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
