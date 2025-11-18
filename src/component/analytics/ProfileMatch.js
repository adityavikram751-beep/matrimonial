'use client';

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
  CartesianGrid,
} from 'recharts';

import { useEffect, useState } from 'react';
import { API_URL } from '../api/apiURL';

const profileColors = ['#22c55e', '#facc15', '#ef4444', '#fb923c'];

export default function ProfileMatches() {
  const [profileData, setProfileData] = useState([]);
  const [matchesData, setMatchesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res1 = await fetch(`${API_URL}/admin/overview`);
        const res2 = await fetch(`${API_URL}/admin/matches-per-month`);

        const overview = await res1.json();
        const matches = await res2.json();

        if (overview.success) setProfileData(overview.data);
        if (matches.success) setMatchesData(matches.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row flex-wrap gap-6 p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 w-full lg:w-[40%]">
        <h3 className="text-lg font-semibold mb-4">Profile Overview</h3>

        <div className="w-full h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={profileData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {profileData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={profileColors[index % profileColors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap gap-4 text-sm mt-4">
          {profileData.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: profileColors[idx] }}
              ></div>
              <span className="text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 w-full lg:w-[55%]">
        <h3 className="text-lg font-semibold mb-4">Matches Per Month</h3>

        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={matchesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 40]} unit="M" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="totalUsers"
                fill="#facc15"
                name="Total no. of Users"
                radius={[4, 4, 0, 0]}
              />
              <Line
                type="monotone"
                dataKey="matches"
                stroke="#ef4444"
                strokeWidth={2.5}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
                name="No. Of Matches"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
