import React, { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { PieChart, Pie, Cell } from "recharts";
import { API_URL } from "../api/apiURL";
import Image from "next/image";

const Donut = ({ value }) => {
  const data = [
    { name: "Completed", value },
    { name: "Remaining", value: 100 - value },
  ];

  return (
    <PieChart width={75} height={75}>
      <Pie
        data={data}
        innerRadius={28}
        outerRadius={36}
        startAngle={90}
        endAngle={-270}
        cornerRadius={8}
        dataKey="value"
      >
        <Cell fill="#e60000" />
        <Cell fill="#fefbe5" />
      </Pie>
    </PieChart>
  );
};

const ChangeIndicator = ({ percent }) => {
  const isUp = percent >= 0;

  return (
    <div className="flex items-start gap-[6px] leading-[15px] mt-[4px]">
      {isUp ? (
        <FaArrowUp size={17} className="text-green-600 mt-[2px]" />
      ) : (
        <FaArrowDown size={17} className="text-red-600 mt-[2px]" />
      )}

      <div className="flex flex-col">
        <span
          className={`text-[16px] font-semibold ${
            isUp ? "text-green-600" : "text-red-600"
          }`}
        >
          {Math.abs(percent)} % Vs
        </span>
        <span
          className={`text-[13px] ${
            isUp ? "text-green-600" : "text-red-600"
          }`}
        >
          last week
        </span>
      </div>
    </div>
  );
};

const StatsSplitCard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_URL}/admin/summary`);
        const data = await response.json();
        setStats(data);
      } catch {
        setStats(null);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="flex justify-center items-center py-8">
        <Image src="/loading2.gif" width={80} height={80} alt="loading" />
      </div>
    );
  }

  const {
    totalUsers,
    newSignups,
    signupChangePercent,
    verifiedProfiles,
    verifiedChangePercent,
    pendingVerifications,
    pendingChangePercent,
    activeUsers,
    activeUsersChangePercent,
    reportedPercent,
    blockedPercent,
  } = stats;

  return (
    <div className="flex w-full gap-4 mt-2">

      {/* ----------------- CARD 1 ----------------- */}
      <div className="bg-white border border-gray-300 rounded-xl shadow px-10 py-4 w-[25%] flex justify-between items-center">

        {/* LEFT */}
        <div>
          <p className="text-[16px] font-bold text-gray-800">Total Users</p>
          <h2 className="text-[30px] leading-[32px] font-semibold">{totalUsers}</h2>
          <ChangeIndicator percent={signupChangePercent} />
        </div>

        {/* Divider */}
        <div className="w-[2px] h-[70px] bg-gray-300" />

        {/* RIGHT */}
        <div>
          <p className="text-[16px] font-bold text-gray-800">New Signups</p>
          <h2 className="text-[30px] leading-[32px] font-semibold">{newSignups}</h2>
          <ChangeIndicator percent={signupChangePercent} />
        </div>
      </div>

      {/* ----------------- CARD 2 (BIG) ----------------- */}
      <div className="bg-white border border-gray-300 rounded-xl shadow px-6 py-4 w-[45%] flex justify-between items-center">

        <div>
          <p className="text-[16px] font-bold text-gray-800">Verified Profile</p>
          <h2 className="text-[30px] leading-[32px] font-semibold">{verifiedProfiles}</h2>
          <ChangeIndicator percent={verifiedChangePercent} />
        </div>

        <div className="w-[2px] h-[70px] bg-gray-300" />

        <div>
          <p className="text-[16px] font-bold text-gray-800">Daily Active Users</p>
          <h2 className="text-[30px] leading-[32px] font-semibold">{activeUsers}</h2>
          <ChangeIndicator percent={activeUsersChangePercent} />
        </div>

        <div className="w-[3px] h-[70px] bg-gray-300" />

        <div>
          <p className="text-[16px] font-bold text-gray-800">Pending Verification</p>
          <h2 className="text-[30px] leading-[32px] font-semibold">{pendingVerifications}</h2>
          <ChangeIndicator percent={pendingChangePercent} />
        </div>
      </div>

      {/* ----------------- CARD 3 ----------------- */}
      <div className="bg-white border border-gray-300 rounded-xl shadow px-6 py-4 w-[26%] flex justify-between items-center">

        {/* Reported */}
        <div className="text-center">
          <p className="text-[16px] font-bold text-gray-800 mb-[2px]">
            Reported Users
          </p>

          <div className="relative">
            <Donut value={reportedPercent} />
            <span className="absolute top-[28px] left-[30px] text-[14px] font-semibold">
              {reportedPercent}%
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-[2px] h-[70px] bg-gray-300" />

        {/* Blocked */}
        <div className="text-center">
          <p className="text-[16px] font-bold text-gray-800 mb-[2px]">
            Blocked Users
          </p>
          <div className="relative">
            <Donut value={blockedPercent} />
            <span className="absolute top-[28px] left-[30px] text-[14px] font-semibold">
              {blockedPercent}%
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StatsSplitCard;
