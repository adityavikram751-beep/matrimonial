"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  Tooltip as ReTooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/**
 * Full final analytics page (single-file)
 * - Connects to https://matrimonial-backend-7ahc.onrender.com/admin/getByGender
 * - Left: Sign-in line chart (X ticks: 01,05,10,15,20,25,30; Y ticks: 0..45 step 5)
 * - Right top: Gender 3D-style pie (legend inline) + static labels + hover tooltip
 * - Right bottom: Matchmaking 3D donut + legend box + static labels + hover tooltip
 *
 * Tailwind classes used for layout; replace or add CSS as needed.
 */

export default function AnalyticsPage() {
  const API = "https://matrimonial-backend-7ahc.onrender.com/admin/getByGender";

  const [genderData, setGenderData] = useState([]);
  const [matchData, setMatchData] = useState([]);
  const [signInData, setSignInData] = useState([]);
  const [totalSignIn, setTotalSignIn] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hover, setHover] = useState(null); // {name, value, percent, x, y}

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(API);
        const json = await res.json();
        if (!mounted) return;
        setGenderData(json.genderData || []);
        setMatchData(json.matchData || []);
        setSignInData(
          (json.signInData || []).map((d) => ({
            day: d.day,
            currentMonth: d.currentMonth ?? d.july ?? 0,
            previousMonth: d.previousMonth ?? d.june ?? 0,
          }))
        );
        setTotalSignIn(json.totalCurrentMonthSignIns ?? 0);
      } catch (e) {
        console.error("fetch error", e);
      } finally {
        setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  // Colors
  const genderColors = { Male: "#34D399", Female: "#FDE047", Others: "#F87171" };
  const matchColors = {
    "Still Looking": "#10B981",
    "Successfully Matched": "#FB923C",
    "Newly Registered": "#06B6D4",
    Inactive: "#FBBF24",
  };

  // Build 3D-like pie/donut slices (top and side paths)
  function build3DSlices(data = [], cx = 150, cy = 120, r = 110, h = 26, startAngle = -Math.PI / 2 + 0.18) {
    const total = Math.max(1, data.reduce((s, it) => s + (it.value || 0), 0));
    let start = startAngle;
    return data.map((item) => {
      const angle = (item.value / total) * Math.PI * 2;
      const end = start + angle;
      const x1 = cx + r * Math.cos(start);
      const y1 = cy + r * Math.sin(start);
      const x2 = cx + r * Math.cos(end);
      const y2 = cy + r * Math.sin(end);
      const largeArc = angle > Math.PI ? 1 : 0;

      const topPath = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
      const sidePath = `M ${x1} ${y1} L ${x1} ${y1 + h} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2 + h} L ${x2} ${y2} Z`;

      const mid = start + angle / 2;
      const labelRadius = r + 44;
      const lx = cx + labelRadius * Math.cos(mid);
      const ly = cy + labelRadius * Math.sin(mid);
      const anchorRadius = r - 12;
      const ax = cx + anchorRadius * Math.cos(mid);
      const ay = cy + anchorRadius * Math.sin(mid);
      const percent = Math.round((item.value / total) * 100);

      start = end;
      return {
        name: item.name,
        value: item.value,
        percent,
        topPath,
        sidePath,
        labelPos: { lx, ly, ax, ay, mid },
      };
    });
  }

  const genderSlices = build3DSlices(genderData, 150, 120, 110, 24);
  const matchSlices = build3DSlices(matchData, 150, 150, 110, 30);

  // X and Y ticks as required
  const xTicks = ["01", "05", "10", "15", "20", "25", "30"];
  const yTicks = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45];

  // Custom line tooltip (black rounded bubble)
  const LineTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    const cur = payload.find((p) => p.dataKey === "currentMonth") || payload[0];
    return (
      <div style={{
        background: "#111827", color: "#fff", padding: 10, borderRadius: 8, fontSize: 13, boxShadow: "0 8px 30px rgba(0,0,0,0.25)"
      }}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>{`Day ${label}`}</div>
        <div>{`${cur.name || cur.dataKey}: ${cur.value?.toLocaleString?.() ?? cur.value}`}</div>
      </div>
    );
  };

  // Tooltip follow cursor for pie/donut
  function handleSliceEnter(e, slice) {
    // client coords
    const x = e.clientX;
    const y = e.clientY;
    setHover({ ...slice, x: x + 12, y: y + 8 });
  }
  function handleSliceMove(e, slice) {
    const x = e.clientX;
    const y = e.clientY;
    setHover({ ...slice, x: x + 12, y: y + 8 });
  }
  function handleSliceLeave() {
    setHover(null);
  }

  function LegendSquare({ color }) {
    return <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${color}`, boxSizing: "border-box" }} />;
  }

  if (loading) {
    return <div className="p-8 text-center text-gray-600">Loading analytics...</div>;
  }

 
  return (
    <div className="p-8 min-h-screen">

      {/* 3-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-54">

        {/* LEFT: SIGN-IN ANALYTICS */}
<div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border h-[700px] p-6 w-[140%]">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">Sign-In Analytics</h2>
              <div className="flex items-end gap-4 mt-2">
                <div className="text-4xl font-extrabold">{(totalSignIn || 0).toLocaleString()}.</div>
                <div className="bg-green-100 border border-green-400 px-3 py-1 rounded-lg text-green-700 font-semibold flex items-center gap-2">
                  <span style={{ fontSize: 18 }}>↑</span> 12%
                </div>
                <div className="text-gray-600 font-medium">Vs last Month</div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-lg"><div className="w-3 h-3 rounded-full bg-black"></div> July</div>
              <div className="flex items-center gap-2 text-lg"><div className="w-3 h-3 rounded-full bg-gray-400"></div> June</div>
              <select className="border rounded-xl px-4 py-2">
                <option>Month</option>
              </select>
            </div>
          </div>

          <div className="w-full h-[540px] mt-2">
            <ResponsiveContainer>
              <LineChart data={signInData} margin={{ top: 10, right: 40, left: 10, bottom: 10 }}>
                <CartesianGrid stroke="#e6e6e6" strokeDasharray="4 4" />
                <XAxis
                  dataKey="day"
                  ticks={xTicks}
                  tick={{ fontSize: 12, fill: "#4b5563" }}
                />
                <YAxis
                  ticks={yTicks}
                  tickFormatter={(v) => `${v} M`}
                  tick={{ fontSize: 12, fill: "#4b5563" }}
                />
                <ReTooltip content={<LineTooltip />} />
                <Line type="monotone" dataKey="currentMonth" stroke="#000" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 7 }} />
                <Line type="monotone" dataKey="previousMonth" stroke="#9ca3af" strokeDasharray="6 6" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT column: gender top + matchmaking bottom */}
        <div className="flex flex-col gap-6">

          {/* GENDER ANALYTICS */}
<div className="bg-white rounded-2xl shadow-lg border p-4 relative h-[330px] w-[380%]">
            {hover && (
              <div style={{
                position: "fixed",
                left: hover.x,
                top: hover.y,
                transform: "translate(-6px,-6px)",
                background: "#111827",
                color: "#fff",
                padding: "8px 10px",
                borderRadius: 6,
                fontSize: 11,
                zIndex: 40,
                boxShadow: "0 8px 30px rgba(0,0,0,0.25)"
              }}>
                <div style={{ fontWeight: 700 }}>{hover.name}</div>
                <div style={{ fontSize: 12 }}>{`${hover.percent}% · ${hover.value}`}</div>
              </div>
            )}

            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Gender Analytics</h3>

              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1"><LegendSquare color={genderColors.Male} /><span className=" text-[14px] font-bold">Male</span></div>
                <div className="flex items-center gap-1"><LegendSquare color={genderColors.Female} /><span className="text-[14px] font-bold">Female</span></div>
                <div className="flex items-center gap-1"><LegendSquare color={genderColors.Others} /><span className="text-[14px] font-bold">Ots.</span></div>
              </div>
            </div>

            <svg width="100%" height="280" className="mt-">
              <g transform="translate(30,18)">
                {/* sides first */}
                {genderSlices.map((s, i) => {
                  const color = genderColors[s.name] ?? Object.values(genderColors)[i % 3];
                  return <path key={`gside-${i}`} d={s.sidePath} fill={color} opacity={0.66} />;
                })}

                {/* tops */}
                {genderSlices.map((s, i) => {
                  const color = genderColors[s.name] ?? Object.values(genderColors)[i % 3];
                  return (
                    <g key={`gtop-${i}`}
                      onMouseEnter={(e) => handleSliceEnter(e, { name: s.name, value: s.value, percent: s.percent })}
                      onMouseMove={(e) => handleSliceMove(e, { name: s.name, value: s.value, percent: s.percent })}
                      onMouseLeave={handleSliceLeave}
                      style={{ cursor: "pointer" }}
                    >
                      <path d={s.topPath} fill={color} stroke="#fff" strokeWidth={2} />
                    </g>
                  );
                })}

                {/* static arrow labels */}
                {genderSlices.map((s, i) => {
                  const { lx, ly, ax, ay } = s.labelPos;
                  const align = lx < 150 ? "start" : "end";
                  // Slight nudge to align with screenshot feel:
                  const textX = lx < 150 ? lx - 6 : lx + 6;
                  // return (
                  //   // <g key={`glabel-${i}`}>
                  //   //   <path d={`M ${ax} ${ay} L ${lx} ${ly}`} stroke="#4b5563" strokeWidth={6} strokeLinecap="round" fill="none" />
                  //   //   {/* <text x={textX} y={ly} fontSize="18" fill="#374151" fontWeight="700" textAnchor={align}>
                  //   //     {s.name}
                  //   //   </text> */}
                  //   //   {/* <text x={textX} y={ly + 22} fontSize="14" fill="#6b7280" textAnchor={align}>
                  //   //     {s.percent}%
                  //   //   </text> */}
                  //   // </g>
                  // );
                })}
              </g>
            </svg>
          </div>

        {/* MATCHMAKING STATUS — FINAL CLEAN LABEL VERSION */}
<div className="bg-white rounded-2xl shadow-lg border p-4 relative h-[340px] w-[480px] overflow-hidden">

  {/* Tooltip */}
  {hover && (
    <div
      style={{
        position: "fixed",
        left: hover.x,
        top: hover.y,
        transform: "translate(-6px,-6px)",
        background: "#111827",
        color: "#fff",
        padding: "8px 10px",
        borderRadius: 8,
        fontSize: 13,
        zIndex: 999,
        boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
      }}
    >
      <div style={{ fontWeight: 700 }}>{hover.name}</div>
      <div style={{ fontSize: 12 }}>{hover.percent}%</div>
    </div>
  )}

  {/* heading + legends */}
  <div className="flex justify-between items-start">
    <h3 className="text-2xl font-bold">Matchmaking Status</h3>

    <div className="space-y-1  ">
      {Object.keys(matchColors).map((k) => (
        <div key={k} className="flex items-center gap-1">
          <div
            style={{
              width: 20,
              height: 18,
              borderRadius: 8,
              border: `10px solid ${matchColors[k]}`,
            }}
          />
          <div className="text-[14px] font-semibold">{k}</div>
        </div>
      ))}
    </div>
  </div>

  {/* DONUT CENTER */}
  <div className="absolute left-1/3 top-[48%] -translate-x-1/2 -translate-y-1/2">
    <svg width="520" height="320">
      <g transform="translate(120,10)">

        {/* depth */}
        {matchSlices.map((s, i) => (
          <path
            key={`side-${i}`}
            d={s.sidePath}
            fill={matchColors[s.name]}
            opacity="0.65"
          />
        ))}

        {/* top */}
        {matchSlices.map((s, i) => (
          <g
            key={`top-${i}`}
            onMouseEnter={(e) =>
              handleSliceEnter(e, {
                name: s.name,
                value: s.value,
                percent: s.percent,
              })
            }
            onMouseMove={(e) =>
              handleSliceMove(e, {
                name: s.name,
                value: s.value,
                percent: s.percent,
              })
            }
            onMouseLeave={handleSliceLeave}
            style={{ cursor: "pointer" }}
          >
            <path
              d={s.topPath}
              fill={matchColors[s.name]}
              stroke="#fff"
              strokeWidth={3}
            />
          </g>
        ))}

        {/* inner hole */}
        <circle cx="150" cy="150" r="48" fill="#fff" />

        {/* CLEAN LABELS (only names — NO percent) */}
        {matchSlices.map((s, i) => {
          const { lx, ly, ax, ay } = s.labelPos;

          const isLeft = lx < 150;
          const textX = isLeft ? lx - 14 : lx + 14;

          return (
            <g key={`label-${i}`}>
              {/* label line */}
              <path
                d={`M ${ax} ${ay} L ${lx} ${ly}`}
                // stroke="#4b5563"
                // // strokeWidth={3}
                // strokeLinecap="round"
              />

              {/* ONLY NAME BELOW — NO PERCENT */}
              {/* <text
                // x={textX}
                // y={ly + 6}
                // fontSize="22"
                // fill="#374151"
                // fontWeight="700"
                // textAnchor={isLeft ? "end" : "start"}
              >
                {s.name}
              </text> */}
            </g>
          );
        })}
      </g>
    </svg>
  </div>

  {/* footer */}
  <div className="text-center italic text-gray-600 absolute bottom-1 left-0 right-0 text-lg">
    “Out Of 20M , 5M Is Matched”
  </div>
</div>

        </div>
      </div>
    </div>
  );
}
