'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { API_URL } from '../api/apiURL';

export default function ReportsThisWeek() {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/admin/reports-this-week`);
        const json = await res.json();
        if (json.success) setReportData(json.data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">

      {/* CARD CONTAINER UI EXACT */}
      <div
        className="rounded-[24px] p-8"
        style={{
          background: "#FFFFFF",
          border: "1px solid #D6D6D6",
          boxShadow: "0px 6px 18px rgba(0,0,0,0.12)",
        }}
      >

        {/* TITLE & LEGEND */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[26px] font-semibold text-gray-900">
            Reports This Week
          </h3>

          <div className="flex items-center gap-7 text-[16px] font-medium text-gray-800">
            
            {/* Fake */}
            <LegendBox label="Fake" color="#FF7C7C" />

            {/* Inappropriate */}
            <LegendBox label="Inappropriate profile" color="#FFC400" />

            {/* Spam */}
            <LegendBox label="Spam" color="#76D64C" />

            {/* Harassment */}
            <LegendBox label="Harassment" color="#47D0FF" />
          </div>
        </div>

        {/* CHART */}
        {loading ? (
          <p className="text-gray-600 text-lg">Loading...</p>
        ) : (
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={reportData}
                margin={{ top: 10, right: 20, left: 0, bottom: 25 }}
                barCategoryGap={32}
              >
                {/* GRID EXACT */}
                <CartesianGrid
                  stroke="#D8D8D8"
                  strokeWidth={1.2}
                  vertical={false}
                />

                <XAxis
                  dataKey="day"
                  tick={{ fill: "#4B4B4B", fontSize: 16 }}
                />

                <YAxis
                  domain={[0, 70]}
                  ticks={[0, 10, 20, 30, 40, 50, 60, 70]}
                  tickFormatter={(v) => `${v} %`}
                  tick={{ fill: "#4B4B4B", fontSize: 16 }}
                />

                {/* Tooltip Styled */}
                <Tooltip
                  formatter={(v) => `${v}%`}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #ccc",
                    background: "#ffffff",
                    fontSize: "14px",
                    padding: "12px",
                    boxShadow: "0 2px 14px rgba(0,0,0,0.15)",
                  }}
                />

                {/* STACK BARS EXACT SAME LOOK */}
                <Bar dataKey="fake" stackId="a" fill="#FF7C7C" radius={[6, 6, 0, 0]} />
                <Bar dataKey="inappropriate" stackId="a" fill="#FFC400" />
                <Bar dataKey="spam" stackId="a" fill="#76D64C" />
                <Bar dataKey="harassment" stackId="a" fill="#47D0FF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

/* Legend component */
function LegendBox({ label, color }) {
  return (
    <div className="flex items-center gap-2">
      <span
        style={{
          width: "16px",
          height: "16px",
          borderRadius: "6px",
          background: color,
          border: `2px solid ${color}`,
        }}
      />
      {label}
    </div>
  );
}
