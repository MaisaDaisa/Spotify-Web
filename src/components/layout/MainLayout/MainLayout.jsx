
import React, {useState, createContext, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BottomPlayer from '../BottomPlayer/BottomPlayer.jsx'
import TopPartWrapper from '../TopPartWrapper/TopPartWrapper..jsx'
import Sidebar from '../Sidebar/Sidebar.jsx';
import { GetCurrentlyPlayingTrack } from "../../../lib/API/getInfo.js";
import PlaylistSection from '../ROUTING/PlaylistSection/PlaylistSection.jsx';
import DisplaySection from '../ROUTING/DisplaySection/DisplaySection.jsx';
import { fetchUserProfile } from '../../../lib/API/getInfo.js';
import ExploreSection from '../ROUTING/ExploreSection/ExploreSection.jsx';

export const GlobalContext = createContext(null);
export const ProfileContext = createContext(null);

const MainLayout = () => {
  const [currentlyPlaying, setCurrentPlaying] = useState({});
  const [profile, setProfile] = React.useState({});

  function initCurrentTracks() {
		GetCurrentlyPlayingTrack().then((response) => {
			setCurrentPlaying(response);
		});
	}

	useEffect(() => {
		GetCurrentlyPlayingTrack().then((response) => {
			setCurrentPlaying(response);
		});
   
      fetchUserProfile().then((response) => {
        setProfile(response);
      });
	}, []);

  return (
    <Router> {/* Router wraps the entire application */}
      <div className=' p-4 flex h-screen w-svw flex-col gap-4'>
      <GlobalContext.Provider value={{currentlyPlaying, setCurrentPlaying, initCurrentTracks}}>
        <ProfileContext.Provider value={profile}>
        <TopPartWrapper>
          <Sidebar />
          <Routes>
            <Route path="/" element={<DisplaySection />} />
            <Route path="/playlist/:id" element={<PlaylistSection />} />
            <Route path="/explore/*" element={<ExploreSection/>} />
          </Routes>
        </TopPartWrapper>
        <BottomPlayer />
        </ProfileContext.Provider>
      </GlobalContext.Provider>
      </div>
    </Router>
  )
}

export default MainLayout
