import React, { useState } from 'react';
import { Search as SearchIcon, Bell } from 'lucide-react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full bg-[#f5f5f5] py-3 px-4 border-b flex items-center justify-between">

      {/* LEFT SIDE TITLE */}
      <h1 className="text-2xl font-bold text-black whitespace-nowrap">
        Reported Content
      </h1>

      {/* RIGHT SIDE: SEARCH BAR + BELL */}
      <div className="flex items-center gap-4">


        {/* BELL ICON */}
        <div className="relative cursor-pointer">
          <Bell className="h-7 w-7 text-yellow-500" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white" />
        </div>

      </div>
    </div>
  );
};

export default Search;
