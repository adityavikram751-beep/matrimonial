import React, { useState } from 'react';
import { Search as SearchIcon, Bell } from 'lucide-react';
import Image from 'next/image';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('Search triggered for:', searchQuery);
    }
  };

  return (
    <div className="border-slate-700 w-full bg-[rgba(242,242,242,1)] p-2">
      <div className="flex justify-between items-center fixed top-0 right-[14px] border-b-2 w-[1272px] bg-[rgba(242,242,242,1)] p-3 shadow z-50">
        <h1 className="text-xl text-black font-semibold">Profile Details</h1>
       <div className='flex gap-5 justify-center  items-center'>
             {/* <div className='flex gap-2 justify-center items-center bg-white border border-gray-300 rounded-md px-2 py-1'>
               <Image src="/search.png"  width={20} height={20} alt='search'/>
               <input type='text'  placeholder='Search...' className='border-none border-gray-300 rounded-md px-2 w-[300px] py-1 focus:outline-none focus:none focus:ring-blue-500'/>  
             </div> */}
             <div><Image className='cursor-pointer' src="/notification.png" width={30} height={30} alt="Notification" /></div>
           </div>
      </div>
    </div>
  );
};

export default Search;
