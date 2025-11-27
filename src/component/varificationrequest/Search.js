import React, { useState } from "react";
import { Search as SearchIcon } from "lucide-react";

const Search = ({ setSearch, topSearch, setTopSearch }) => {
  return (
    <div
      className="bg-gray-100 px-6 py-4 shadow-sm border-b fixed top-0 z-50 flex items-center justify-between"
      style={{
        left: "250px",
        width: "calc(100% - 250px)",
      }}
    >
      <h1 className="text-2xl font-bold text-gray-900">
        Verification Request
      </h1>

      <div className="flex items-center gap-5">

        {/* TOP SEARCH BAR */}
        <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 w-[350px] shadow-md">
          <SearchIcon className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search By User ID"
            className="ml-2 w-full outline-none text-gray-700"
            value={topSearch}
            onChange={(e) => {
              setTopSearch(e.target.value);  // Only top search box updates
              setSearch(e.target.value);     // Global filter
            }}
          />
        </div>

        {/* Notification Icon */}
        <div className="relative">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="#FFC107">
            <path d="M12 24c1.104 0 2-.897 2-2h-4c0 1.103.896 2 2 2zm6.707-5l1.293 1.293V21H4v-1.707L5.293 19H6v-7c0-3.309 2.691-6 6-6s6 2.691 6 6v7h.707zM18 18H6v-7c0-2.757 2.243-5 5-5s5 2.243 5 5v7z"/>
          </svg>
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
        </div>

      </div>
    </div>
  );
};

export default Search;
