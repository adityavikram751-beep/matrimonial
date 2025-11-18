import AnalyticsChart from '@/src/component/dashboard/AnalyticsChart'
import Search from '@/src/component/dashboard/Search'
import TopSection from '@/src/component/dashboard/TopSection'
import UserTable from '@/src/component/dashboard/UserTable'
import useAuthGuard from '@/utils/withAuth'
import React, { useState , useEffect} from 'react'
import Image from 'next/image'
// import { API_URL } from '../api/apiURL';  


const Index = () => {
  useAuthGuard();

  const placeholders = [
    'Search by User Name',
    'Search by User Id',
    'Search by User No',
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 1000); 

    return () => clearInterval(interval);
  }, []);



  return (
   <>
   {/* <Search/> */}
   <div className=' pl-5 pr-5 p-2 flex justify-between items-center mb-6'>
    <div><h1 className='text-2xl font-bold mb-6 text-gray-700'>Dashboard</h1></div>
    <div className='flex gap-5 justify-center items-center'>
      {/* <div className='flex gap-2 justify-center items-center border border-gray-300 rounded-md px-2 py-1'>
        <Image src="/search.png"  width={20} height={20} alt='search'/>
        <input type='text'  placeholder={placeholders[index]} className='border-none border-gray-300 rounded-md px-2 w-[300px] py-1 focus:outline-none focus:none focus:ring-blue-500'/>  
      </div> */}
      <div><Image className='cursor-pointer' src="/notification.png" width={35} height={35} alt="Notification" /></div>
    </div>
    </div>
 <TopSection/>
 <AnalyticsChart/>
  <UserTable/>
   </>
  )
}

export default Index;