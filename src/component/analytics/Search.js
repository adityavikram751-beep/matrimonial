import React, { useState } from 'react';
import { Search as SearchIcon, Bell } from 'lucide-react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('Search triggered for:', searchQuery);
    }
  };

  return (
    <div className="border-slate-700 w-full p-2 m-2">
      <div className="flex justify-between border-b-2 pb-2 gray-400">
        <h1 className="text-xl text-gray-700 font-semibold">Analytics</h1>

        <div className="flex items-center gap-4">
         
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
