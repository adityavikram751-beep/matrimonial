import React, { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import Image from "next/image";

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery.toLowerCase());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="border-slate-700 w-full bg-[rgba(242,242,242,1)] p-2">
      <div className="flex justify-between items-center fixed top-0 right-[14px] border-b-2 w-[1272px] bg-[rgba(242,242,242,1)] p-3 shadow z-50">
        <h1 className="text-xl text-black font-semibold">Profile Details</h1>

        <div className="flex gap-5 items-center">
          <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 w-[350px] shadow-sm">
            <SearchIcon
              className="text-gray-600 cursor-pointer"
              size={18}
              onClick={handleSearch}
            />

            <input
              type="text"
              placeholder="Search..."
              className="ml-2 w-full outline-none text-sm bg-transparent"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onSearch(e.target.value.toLowerCase());
              }}
              onKeyDown={handleKeyDown}
            />
          </div>

          <Image
            className="cursor-pointer"
            src="/notification.png"
            width={30}
            height={30}
            alt="Notification"
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
