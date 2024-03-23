import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faBackwardStep, faForwardStep} from "@fortawesome/free-solid-svg-icons";
import  nasPhoto from "../../../assets/images/nas.jpg";
import "./BottomPlayer.css";
 
const BottomPlayer = () => {
	return (
		<div className="w-full flex flex-row flex-nowrap bg-overlay-black p-3 rounded-3xl gap-32 ">
			<div className='flex flex-row gap-4 items-center'>
				<img src={nasPhoto} alt="" className='w-24 h-24 rounded-2xl'/>
                <div >
                    <h1 className="font-bold text-lg">N.Y. State of Mind</h1>
                    <h3 className="text-secondary-font">Nas</h3>
                </div>
			</div>
			<div className="w-4/6 flex flex-row flex-nowrap justify-center items-center gap-32">
                <div className='flex flex-row flex-nowrap gap-8'>
                    <FontAwesomeIcon icon={faBackwardStep} size="2xl" style={{color: "#ffffff",}} />
                    <FontAwesomeIcon icon={faPlay} size="2xl" style={{color: "#ffffff",}} />
                    <FontAwesomeIcon icon={faForwardStep} size="2xl" style={{color: "#ffffff",}} />
                </div>
                <div className='w-full'>
                    <input type="range" name="volume" id="volume" min="0" max="100"
                    className='spoti-slider' />
			    </div>
		    </div>
        </div>
	);
};

export default BottomPlayer;
