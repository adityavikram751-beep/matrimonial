'use client';

import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid,
} from 'recharts';
import { API_URL } from '../api/apiURL';

export default function ReportsThisWeek() {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/reports-this-week`);
        const json = await res.json();
        if (json.success) {
          setReportData(json.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow-md border border-gray-300 p-4 w-full">
        <h3 className="text-lg font-semibold mb-4">Reports This Week</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={reportData}
                margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                barCategoryGap={35}
                barGap={5}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="fake" stackId="a" fill="#ff7c7c" name="Fake" />
                <Bar dataKey="inappropriate" stackId="a" fill="#ffcb00" name="Inappropriate" />
                <Bar dataKey="harassment" stackId="a" fill="#47d0ff" name="Harassment" />
                <Bar dataKey="spam" stackId="a" fill="#7ad64d" name="Spam" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}