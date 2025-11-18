import React, { useEffect, useState } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { PieChart, Pie, Cell } from 'recharts';
import { API_URL } from '../api/apiURL';
import Image from 'next/image';

const Donut = ({ value }) => {
  const data = [
    { name: 'Completed', value },
    { name: 'Remaining', value: 100 - value },
  ];
  const COLORS = ['#ff0000', '#fefce8'];

  return (
    <PieChart width={80} height={80}>
      <Pie
        data={data}
        innerRadius={25}
        outerRadius={35}
        startAngle={90}
        endAngle={-270}
        paddingAngle={0}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
            cornerRadius={10}
          />
        ))}
      </Pie>
    </PieChart>
  );
};

const StatsSplitCard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_URL}/admin/summary`);

        if (!response.ok) {
          const errorDetail = await response.text();
          throw new Error(`HTTP error! Status: ${response.status} - ${errorDetail}`);
        }

        const data = await response.json();
        setStats(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch stats:', err.message);
        setError('Failed to load statistics. Please try again later.');
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return <div className="text-center py-8 text-red-600 font-semibold">{error}</div>;
  }

  if (!stats) {
    return <div className="flex justify-center items-center py-8 text-gray-600">
      <Image src="/loading2.gif" width={100} height={100} alt="Loader.." />
    </div>;
  }

  const {
    totalUsers = 0,
    newSignups = 0,
    signupChangePercent = 0,
    verifiedProfiles = 0,
    verifiedChangePercent = 0,
    pendingVerifications = 0,
    pendingChangePercent = 0,
    activeUsers = 0,
    activeUsersChangePercent = 0,
    reportedPercent = 0,
    blockedPercent = 0,
  } = stats;

  const renderChangeIndicator = (changePercent) => {
    const isPositive = changePercent >= 0;
    const arrow = isPositive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />;
    const textColor = isPositive ? 'text-green-600' : 'text-red-600';

    return (
      <div className={`flex items-center text-sm mt-1 ${textColor}`}>
        {arrow}
        <span>{Math.abs(changePercent)}%</span>
        <span className="text-red-600 ml-1">Vs last week</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-3 w-full">
      <div className="border border-gray-300 rounded-lg shadow p-4 bg-white flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <h2 className="text-2xl font-bold">{totalUsers}</h2>
          </div>

          <div className="hidden md:block w-px min-h-[4rem] bg-gray-300 mx-2" />

          <div>
            <p className="text-sm text-gray-500">New Signups</p>
            <h2 className="text-2xl font-bold">{newSignups}</h2>
            {renderChangeIndicator(signupChangePercent)}
          </div>
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg shadow p-4 bg-white flex-[2] min-w-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-4">
          <div className="flex-1">
            <p className="text-sm text-gray-500">Verified Profiles</p>
            <h2 className="text-2xl font-bold">{verifiedProfiles}</h2>
            {renderChangeIndicator(verifiedChangePercent)}
          </div>

          <div className="hidden md:block w-px min-h-[4rem] bg-gray-300 mx-2" />

          <div className="flex-1">
            <p className="text-sm text-gray-500">Daily Active Users</p>
            <h2 className="text-2xl font-bold">{activeUsers}</h2>
            {renderChangeIndicator(activeUsersChangePercent)}
          </div>

          <div className="hidden md:block w-px min-h-[4rem] bg-gray-300 mx-2" />

          <div className="flex-1">
            <p className="text-sm text-gray-500">Pending Verification</p>
            <h2 className="text-2xl font-bold">{pendingVerifications}</h2>
            {renderChangeIndicator(pendingChangePercent)}
          </div>
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg shadow p-4 bg-white flex-1 min-w-0">
        <div className="flex justify-around items-center gap-4 sm:gap-6 flex-col sm:flex-row">
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-500 mb-1">Reported Users</p>
            <div className="relative flex items-center justify-center">
              <Donut value={reportedPercent} />
              <span className="absolute text-sm font-semibold">{reportedPercent}%</span>
            </div>
          </div>

          <div className="hidden sm:block w-px bg-gray-300 h-16 mx-2" />

          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-500 mb-1">Blocked Users</p>
            <div className="relative flex items-center justify-center">
              <Donut value={blockedPercent} />
              <span className="absolute text-sm font-semibold">{blockedPercent}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSplitCard;
