import React, { useState, useEffect } from "react";
import SidebarNavLinks from "./SidebarNavLinks/SidebarNavLinks";
import { faCompass, faStar } from "@fortawesome/free-regular-svg-icons";
import SideBarPlaylists from "./SideBarPlaylists/SideBarPlaylists";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { fetchUserPlaylists } from "../../../lib/API/getInfo.js";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = ({ additionalClass }) => {
	const [albums, setAlbums] = useState([]);

	useEffect(() => {
		fetchUserPlaylists().then((response) => {
			setAlbums(response.items);
		});
	}, []);

	return (
		<div
			className={`object-contain h-full flex-shrink-0 flex flex-col w-1/6 items-start gap-6 bg-overlay-black rounded-2xl p-6 pr-4 ${additionalClass}`}>
			<div className="flex flex-col items-start gap-3">
			<Link to={"/"}>
				<SidebarNavLinks icon={faBuilding} title={"Home"} />
			</Link>
				<SidebarNavLinks icon={faCompass} title={"Explore"} />
				<SidebarNavLinks icon={faStar} title={"Favorites"} />
			</div>
			<div className="w-full flex h-full flex-col items-start mt-5 gap-7 ">
				<h1 className="text-default-font text-xl font-lg">Your library</h1>
				<div className="playlist-sidebar flex flex-col w-full gap-3 items-start flex-nowrap overflow-y-scroll mt-4">
					{albums.map((playlist) => {
						return (
							<Link to={`/playlist/${playlist.id}`} key={playlist.id}>
								<SideBarPlaylists
									playlistKey={playlist.id} // Use playlistKey instead of key
									imgSrc={playlist.images[0].url}
									name={playlist.name}
									id={playlist.id}
								/>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
