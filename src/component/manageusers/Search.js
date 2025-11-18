import React, { useState } from 'react';
import { Search as SearchIcon, Bell } from 'lucide-react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('Search triggered for:', searchQuery);
      // You can add actual search logic here
    }
  };

  return (
    <div className="border-slate-700 w-full align-item-center ">
      <div className="flex justify-between border-b-2 pb-2 gray-400">
        <h1 className="text-xl text-gray-700 font-semibold">Manage Users</h1>

        <div className="flex  items-center gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search By User ID"
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
            />
            <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <Bell className="h-6 w-6 text-yellow-500" />
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
