import React, { Children } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faUsers, faUser } from "@fortawesome/free-solid-svg-icons";


import { ProfileContext } from "../layout/MainLayout/MainLayout";

const ProfileTop = ({addClass, children}) => {
	const profile = React.useContext(ProfileContext);
   
	return (
		<div className={`flex flex-row ${addClass}`}>
			{children}
			<div className="flex flex-row gap-2">
				<FontAwesomeIcon
					icon={faBell}
					size="lg"
					style={{ color: "#ffffff" }}
					className="bg-background-pitch-black p-3 rounded-full"
				/>
				<FontAwesomeIcon
					icon={faUsers}
					size="lg"
					style={{ color: "#ffffff" }}
					className="bg-background-pitch-black p-3 rounded-full"
				/>
				{profile.images ? (
					<img
						src={profile.images[0].url}
						className="w-10 h-10  border-[1px] border-overlay-black rounded-full"
					/>
				) : (
					<FontAwesomeIcon
						icon={faUser}
						size="lg"
						style={{ color: "#ffffff" }}
						className="bg-background-pitch-black p-3 rounded-full"
					/>
				)}
			</div>
		</div>
	);
};

export default ProfileTop;
