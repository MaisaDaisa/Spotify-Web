import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SearchForItems } from "../../../../../lib/API/getInfo";
import SearchDisplayBox from "./SearchDisplayBox/SearchDisplayBox";

const SearchResults = () => {
  const { query, filters, limit, market, offset } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const limitParam = limit > 50 ? 50 : limit;
    const formattedFilters = encodeURIComponent(filters);
    SearchForItems(query, formattedFilters, limitParam, market, offset).then((res) => {
      setSearchResults(res);
    });
  }, [query, filters, limit, market, offset]);

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  return (
    <div className="p-6 mt-4 rounded-lg overflow-y-scroll spoti-vertial-scrollbar">
      {searchResults.length === 0 ? (
        <div className="search-results">
          <h1>No results found</h1>
        </div>
      ) : (
        Object.keys(searchResults).map((key) => {
          return <SearchDisplayBox key={key} name={key} results={searchResults[key].items} />;
        })
      )}
    </div>
  );
};

export default SearchResults;
