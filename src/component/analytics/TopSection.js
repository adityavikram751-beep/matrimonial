'use client';

import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const API_URL = "https://matrimonial-backend-7ahc.onrender.com";

const WEEK_ORDER = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEK_LABELS = { Sun:"Su", Mon:"Mo", Tue:"Tu", Wed:"We", Thu:"Th", Fri:"Fr", Sat:"Sa" };

export default function DashboardFinal() {

  const [yellowTrend, setYellowTrend] = useState([]);
  const [greenTrend, setGreenTrend] = useState([]);
  const [funnelData, setFunnel] = useState([]);

  /* -----------------------------------
       FETCH RUNNING USER TREND API
  ------------------------------------*/
  useEffect(() => {
    (async () => {
      const res = await fetch(`${API_URL}/admin/user-signup-trends`);
      const json = await res.json();

      if (!json.success) return;

      const yellowBucket = {};
      const greenBucket = {};

      json.data.forEach((d) => {
        yellowBucket[d.date] = Number(d.newUsers || 0);
        greenBucket[d.date] = Number(d.returningUsers || 0);
      });

      const orderedYellow = WEEK_ORDER.map((day) => yellowBucket[day] || 0);
      const orderedGreen  = WEEK_ORDER.map((day) => greenBucket[day] || 0);

      setYellowTrend(orderedYellow);
      setGreenTrend(orderedGreen);
    })();
  }, []);

  /* -----------------------------------
        FETCH SEARCH TO MATCH
  ------------------------------------*/
  useEffect(() => {
    (async () => {
      const res = await fetch(`${API_URL}/admin/search-to-match`);
      const json = await res.json();
      if (json.success) setFunnel(json.data);
    })();
  }, []);

  /* -----------------------------------
        REAL API DATA → DIRECT CHART
  ------------------------------------*/

  const yellowData = yellowTrend;      // NO MULTIPLIER
  const greenData  = greenTrend;       // NO MULTIPLIER

  /* -----------------------------------
        HIGHCHART UI SAME
  ------------------------------------*/
  const chartOptions = {
    chart: {
      type: "line",
      height: 310,
      backgroundColor: "#ffffff",
      spacingLeft: 10,
      spacingRight: 10,
      spacingTop: 15,
      spacingBottom: 25,
    },

    credits: { enabled: false },
    title: { text: "" },
    legend: { enabled: false },

    xAxis: {
      categories: WEEK_ORDER.map((d) => WEEK_LABELS[d]),
      tickLength: 0,
      labels: {
        style: { fontSize: "16px", fontWeight: 600, color: "#4b5563" },
        y: 20,
      },
    },

    yAxis: {
      title: null,
      min: 0,
      max: Math.max(...yellowData, ...greenData, 5),
      tickPositions: [0, 5, 10, 15, 20, 25,30],
      labels: {
        formatter() { return this.value; },
        style: { fontSize: "15px", fontWeight: 500, color: "#6b7280" },
      },
    },

    plotOptions: {
      series: {
        lineWidth: 3,
        marker: {
          radius: 6,
          fillColor: "#fff",
          lineWidth: 3,
        },
      },
    },

    tooltip: {
      shared: true,
      backgroundColor: "#fff",
      borderRadius: 10,
      borderWidth: 1,
      style: { fontSize: "15px" },
    },

    series: [
      {
        name: "New Registered Users",
        data: yellowData,
        color: "#facc15",
        marker: { lineColor: "#facc15" },
      },
      {
        name: "Returning Users",
        data: greenData,
        color: "#16a34a",
        marker: { lineColor: "#16a34a" },
      },
    ],
  };

  /* -----------------------------------
       UI SAME — NOT TOUCHING THIS PART
  ------------------------------------*/
  return (
    <div className="mt-24 px-6 flex flex-col md:flex-row gap-10 w-full items-stretch">

      {/* LEFT — SEARCH TO MATCH */}
      <div className="bg-white rounded-[32px] shadow-xl border border-gray-300 p-6 w-full md:w-[45%] h-full">
        <h2 className="text-2xl font-bold mb-10">Search To Match</h2>

        <div className="space-y-6">
          {funnelData.map((item, index) => {
            const max = funnelData[0]?.value || 1;
            const pct = (item.value / max) * 100;

            return (
              <div key={index} className="flex items-center justify-between">

                <div className="w-[200px] text-[17px] font-semibold text-gray-800">
                  {item.stage}
                </div>

                <div className="w-[430px] mx-4">
                  <div
                    className="w-full h-[32px] bg-gray-200 rounded-full overflow-hidden"
                    style={{
                      boxShadow:
                        "inset 0 2px 4px rgba(0,0,0,0.18), inset 0 -2px 4px rgba(255,255,255,0.4)",
                    }}
                  >
                    <div
                      className="h-full"
                      style={{
                        width: `${pct}%`,
                        background: "linear-gradient(90deg,#3A47FF,#001BFF)",
                        borderRadius: 18,
                        filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.35))",
                      }}
                    ></div>
                  </div>
                </div>

                <div className="w-[100px] text-right text-[18px] font-semibold text-gray-900">
                  {item.value}
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT — RUNNING USER TREND */}
      <div className="bg-white rounded-[32px] shadow-xl border border-gray-300 p-10 w-full md:w-1/2 h-full">

        {/* Header + Legends */}
        <div className="flex items-center gap-4 mb-6">

          <h2 className="text-[22px] font-semibold text-gray-900 whitespace-nowrap">
            Running User Trend
          </h2>

          <div className="flex items-center gap-8 text-gray-700 text-[12px] font-semibold whitespace-nowrap">

            <div className="flex items-center gap-1">
              <span style={{ width: 8, height: 4, background: "#facc15", borderRadius: 4 }}></span>
              <span style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                border: "3px solid #facc15",
                background: "#fff"
              }}></span>
              <span style={{ width: 8, height: 4, background: "#facc15", borderRadius: 4 }}></span>
              <span>New Registered Users</span>
            </div>

            <div className="flex items-center gap-1">
              <span style={{ width: 8, height: 4, background: "#16a34a", borderRadius: 4 }}></span>
              <span style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                border: "3px solid #16a34a",
                background: "#fff"
              }}></span>
              <span style={{ width: 8, height: 4, background: "#16a34a", borderRadius: 4 }}></span>
              <span>Returning Users</span>
            </div>

          </div>

        </div>

        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>

    </div>
  );
}
