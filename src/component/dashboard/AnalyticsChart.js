import React, { useState, useEffect } from 'react';
import Image from 'next/image';



import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell,
} from 'recharts';
import { API_URL } from '../api/apiURL';  

const GenderGradients = () => (
  <defs>
    <linearGradient id="genderMale" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#38bdf8" />
      <stop offset="100%" stopColor="#6366f1" />
    </linearGradient>
    <linearGradient id="genderFemale" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#f472b6" />
      <stop offset="100%" stopColor="#ec4899" />
    </linearGradient>
    <filter id="genderShadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="rgba(0,0,0,0.1)" />
    </filter>
  </defs>
);

const MatchGradients = () => (
  <defs>
    <linearGradient id="matchLooking" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.9}/>
      <stop offset="95%" stopColor="#16a34a" stopOpacity={1}/>
    </linearGradient>
    <linearGradient id="matchSuccess" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9}/>
      <stop offset="95%" stopColor="#2563eb" stopOpacity={1}/>
    </linearGradient>
    <linearGradient id="matchNewlyReg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#f97316" stopOpacity={0.9}/>
      <stop offset="95%" stopColor="#ea580c" stopOpacity={1}/>
    </linearGradient>
    <linearGradient id="matchInactive" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#e5e7eb" stopOpacity={0.9}/>
      <stop offset="95%" stopColor="#9ca3af" stopOpacity={1}/>
    </linearGradient>
  </defs>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const currentMonthName = payload[0].name;
    const previousMonthName = payload[1] ? payload[1].name : '';
    const currentYear = new Date().getFullYear();

    return (
      <div className="bg-white shadow-lg p-3 rounded-lg text-sm border border-gray-200">
        <p className="font-semibold text-gray-800">{`${currentMonthName.split(' ')[0]} ${label}, ${currentYear}`}</p>
        <p className="text-black">{`${currentMonthName}: ${payload[0].value} sign-ins`}</p>
        {payload[1] && <p className="text-gray-600">{`${previousMonthName}: ${payload[1].value} sign-ins`}</p>}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState({
    signInData: [],
    genderData: [],
    matchData: [],
    totalJulySignIns: 0,
    currentMonthName: 'July',
    previousMonthName: 'June',
    totalPreviousMonthSignIns: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/getByGender`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        const currentMonthTotal = data.signInData.reduce((sum, item) => sum + item.july, 0);
        const previousMonthTotal = data.signInData.reduce((sum, item) => sum + item.june, 0);

        setAnalyticsData({
          ...data,
          totalJulySignIns: currentMonthTotal,
          totalPreviousMonthSignIns: previousMonthTotal,
          currentMonthName: 'July',
          previousMonthName: 'June',
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const signinDifference = analyticsData.totalJulySignIns - analyticsData.totalPreviousMonthSignIns;
  const diffTextClass = signinDifference >= 0 ? 'text-green-600' : 'text-red-600';
  const diffSign = signinDifference >= 0 ? '' : '-';

  if (loading) return <div className="p-8  flex justify-center  text-lg font-medium text-gray-700">
    <Image src="/loading2.gif" width={100} height={100} alt="loading..." />
  </div>;
  if (error) return <div className="p-8 text-center text-red-600 text-lg font-medium">Error: {error}</div>;

  return (
    <div className="flex flex-col lg:flex-row  flex-wrap gap-8 p-5 md:p-8 bg-gray-50 min-h-screen">
      <div className="w-full lg:w-[60%] bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">Sign-In Analytics</h2>
            <p className="text-3xl md:text-4xl flex font-extrabold text-gray-900 mb-2">{analyticsData.totalJulySignIns.toLocaleString()} total sign-ins</p>
            <p className={`${diffTextClass} text-base md:text-lg font-semibold mt-1`}>
              {`${diffSign}${Math.abs(signinDifference).toLocaleString()} users `}
              <span className="text-gray-500 font-normal">vs last Month</span>
            </p>
          </div>
          <div className="flex items-center flex-wrap gap-3">
            <span className="flex items-center gap-1 text-sm font-medium text-black">
              <span className="w-3 h-3 rounded-full bg-black"></span> {analyticsData.currentMonthName}
            </span>
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <span className="w-3 h-3 rounded-full bg-gray-400"></span> {analyticsData.previousMonthName}
            </span>
            {/* <select className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option>Month</option>
              <option>Week</option>
              <option>Day</option>
            </select> */}
          </div>
        </div>

        <div className="w-full h-[320px] sm:h-[380px] md:h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analyticsData.signInData}>
              <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
              <XAxis dataKey="day" tickLine={false} axisLine={{ stroke: '#cccccc' }} style={{ fontSize: '12px', fill: '#555' }} />
              <YAxis domain={[0, 'auto']} unit=" users" tickLine={false} axisLine={{ stroke: '#cccccc' }} style={{ fontSize: '12px', fill: '#555' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Line
                type="monotone"
                dataKey="july"
                name={analyticsData.currentMonthName}
                stroke="#000"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: '#000' }}
                activeDot={{ r: 7, strokeWidth: 3, fill: '#000' }}
              />
              <Line
                type="monotone"
                dataKey="june"
                name={analyticsData.previousMonthName}
                stroke="#999"
                strokeDasharray="6 6"
                strokeWidth={2.5}
                dot={{ r: 3, strokeWidth: 1.5, fill: '#999' }}
                activeDot={{ r: 6, strokeWidth: 2.5, fill: '#999' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="w-full lg:w-[36%] flex flex-col gap-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <h3 className="font-bold text-lg text-gray-800">Gender Analytics</h3>
            <div className="flex gap-4 text-xs font-medium flex-wrap">
              <span className="flex items-center gap-1 text-green-700"><div className="w-3 h-3 bg-green-500 rounded-full border border-gray-200 shadow-sm"></div> Male</span>
              <span className="flex items-center gap-1 text-yellow-700"><div className="w-3 h-3 bg-yellow-500 rounded-full border border-gray-200 shadow-sm"></div> Female</span>
              {/* <span className="flex items-center gap-1 text-pink-700"><div className="w-3 h-3 bg-pink-500 rounded-full border border-gray-200 shadow-sm"></div> Others</span> */}
            </div>
          </div>
          <div className="w-full h-[220px] sm:h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <GenderGradients />  
                <defs>
                  <filter id="genderShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.15" />
                  </filter>
                </defs>
                <Pie
                  data={analyticsData.genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {analyticsData.genderData.map((entry, index) => (
                    <Cell
                      key={`gender-cell-${index}`}
                      fill={`url(#gender${entry.name})`}  
                      filter="url(#genderShadow)"
                      stroke="#fff"
                      strokeWidth={1}
                    />
                  ))}
                </Pie>
                <Tooltip /> 
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <h3 className="font-bold text-lg text-gray-800">Matchmaking Status</h3>
            <div className="flex flex-wrap gap-3 text-xs font-medium">
              <span className="flex items-center gap-1 text-green-700"><div className="w-3 h-3 bg-green-600 rounded-full shadow-sm"></div> Looking</span>
              <span className="flex items-center gap-1 text-blue-700"><div className="w-3 h-3 bg-blue-600 rounded-full shadow-sm"></div> Matched</span>
              <span className="flex items-center gap-1 text-orange-700"><div className="w-3 h-3 bg-orange-600 rounded-full shadow-sm"></div> New Reg.</span>
              <span className="flex items-center gap-1 text-gray-700"><div className="w-3 h-3 bg-gray-500 rounded-full shadow-sm"></div> Inactive</span>
            </div>
          </div>
          <div className="w-full h-[220px] sm:h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <MatchGradients />  
                <defs>
                  <filter id="matchShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.15" />
                  </filter>
                </defs>
                <Pie
                  data={analyticsData.matchData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {analyticsData.matchData.map((entry, index) => (
                    <Cell
                      key={`match-cell-${index}`}
                      fill={`url(#match${entry.name.replace(/\s+/g, '')})`} 
                      filter="url(#matchShadow)"
                      stroke="#fff"
                      strokeWidth={1}
                    />
                  ))}
                </Pie>
                <Tooltip />  
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-sm text-gray-600 mt-3 italic font-medium">
            {`"Out of ${analyticsData.matchData.reduce((sum, item) => sum + item.value, 0).toLocaleString()} users, ${analyticsData.matchData.find(item => item.name === 'Successfully Matched')?.value.toLocaleString() || 0} are Matched"`}
          </p>
        </div>
      </div>
    </div>
  );
}