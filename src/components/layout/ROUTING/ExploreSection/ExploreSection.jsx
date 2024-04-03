import React, { useEffect } from "react";
import ProfileTop from "../../../ProfileTop/ProfileTop";
import SearchBar from "../../../SearchBar/SearchBar";
import { Routes, Route, useNavigate } from "react-router-dom";
import MainExplore from "./MainExplore/MainExplore";
import SearchResults from "./SearchResults/SearchResults";

const ExploreSection = ({ additionalClass }) => {
  const navigate = useNavigate();

  function initSearch(query, filters) {
    if (query === "") {
      navigate("/explore"); 
    } else {
      let filtersQuery = "";
      if (Array.isArray(filters)) {
        filtersQuery = filters.join("%2C");
      } else 
      if (filters === "album" || filters === "artist" || filters === "playlist" || filters === "track") {
        filtersQuery = filters;
      } 
      navigate(`/explore/${query}/${filtersQuery}`);
    }
  }

  return (
    <div className={`w-full flex p-4 flex-col rounded-2xl overflow-hidden bg-overlay-black ${additionalClass}`}>
      <ProfileTop addClass={"justify-between"}>
        <SearchBar addClass={"w-1/2"} searchQueryFunc={initSearch} />
      </ProfileTop>
      <Routes>
        <Route path="/:query/:filters/:limit?/:market?/:offset?" element={<SearchResults />} />
        <Route path="/" element={<MainExplore />} />
      </Routes>
    </div>
  );
};

export default ExploreSection;
