'use client';
import Image from 'next/image';
// import React, { useState } from 'react';


import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useEffect, useState } from 'react';
import { API_URL } from '../api/apiURL';

export default function UserTrends() {
  const [userTrendData, setUserTrendData] = useState([]);
  const [funnelData, setFunnelData] = useState([]);




  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/user-signup-trends`);
        const result = await res.json();
        if (result.success) {
          const processed = result.data.map(item => ({
            ...item,
            returningUsers: Math.floor(item.newUsers * 0.5),
          }));
          setUserTrendData(processed);
        }
      } catch (err) {
        console.error('Error loading trends:', err);
      }
    };
    fetchTrends();
  }, []);

  useEffect(() => {
    const fetchFunnel = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/search-to-match`);
        const result = await res.json();
        if (result.success) {
          setFunnelData(result.data);
        }
      } catch (err) {
        console.error('Error loading funnel data:', err);
      }
    };
    fetchFunnel();
  }, []);

  // if (loading) return (
  //   <div className="p-8 flex justify-center text-lg font-medium text-gray-700">
  //     <img src="/loading2.gif" width={200} height={200} alt="loading..." />
  //   </div>
  // );
  // if (error) return <div className="p-8 text-center text-red-600 text-lg font-medium">Error: {error}</div>;



  return (

    <div className="flex flex-col mt-[70px] md:flex-row md:flex-wrap gap-6 p-4 sm:p-6 max-w-7xl mx-auto w-full">

      <header className='flex justify-between top-0 fixed bg-gray-50 z-50 w-[1274px] shadow-xl items-center p-4 ml-[-23px]'>
        <div>
          <h1 className='font-bold  text-black'>Analytics</h1>
        </div>
        <div>
          <Image src='/notification.png' width={36} height={36} alt='notification' />
        </div>
      </header>


      <div className="bg-white  rounded-xl shadow-md border border-gray-300 p-4 w-full md:w-[48%] min-w-0">
        <h3 className="text-lg font-semibold mb-4">Search to Match Funnel</h3>
        <div className="space-y-5">
          {funnelData.map((item, idx) => {
            const max = funnelData[0]?.value || 1;
            const percent = ((item.value / max) * 100).toFixed(1);
            return (
              <div key={idx} className="flex justify-between items-center">
                <div className="w-full mr-4">
                  <div className="text-sm mb-1">{item.stage}</div>
                  <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className="h-4 bg-blue-600 rounded-full transition-all duration-300"
                      style={{
                        width: `${percent}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="min-w-[80px] text-sm font-medium text-gray-700">
                  {item.value.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white rounded-xl shadow-md border border-gray-300 p-4 w-full md:w-[48%] min-w-0">
        <h3 className="text-lg font-semibold mb-4">User Signup Trends</h3>
        <div className="w-full h-[240px] sm:h-[240px] md:h-[280px] lg:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={userTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="newUsers"
                stroke="#facc15"
                strokeWidth={2.5}
                name="New Users"
                activeDot={{ r: 6 }}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="returningUsers"
                stroke="#22c55e"
                strokeWidth={2.5}
                name="Returning Users"
                activeDot={{ r: 6 }}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
