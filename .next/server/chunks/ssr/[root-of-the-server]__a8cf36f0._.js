module.exports = {

"[project]/src/component/analytics/TopSection.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>App
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
// FIX: Highcharts and HighchartsReact are loaded globally in the environment,
// so we remove the failed module imports and assume they are accessible.
// --- MOCK DATA TO MATCH SCREENSHOTS ---
// 1. Search To Match (Funnel)
const MOCK_FUNNEL_DATA = [
    {
        stage: "User Searched",
        value: 919980
    },
    {
        stage: "Profile Viewed",
        value: 876700
    },
    {
        stage: "Expressed Interest",
        value: 597120
    },
    {
        stage: "Matched Successfully",
        value: 299220
    }
];
// 2. Running User Trend (Line Chart)
// These small values are used to represent Millions (M) in the chart config.
const MOCK_TREND_DATA = [
    {
        date: "Sun",
        newUsers: 24,
        returning: 10
    },
    {
        date: "Mon",
        newUsers: 22.5,
        returning: 15
    },
    {
        date: "Tue",
        newUsers: 17,
        returning: 13
    },
    {
        date: "Wed",
        newUsers: 18,
        returning: 13.5
    },
    {
        date: "Thu",
        newUsers: 21.5,
        returning: 14
    },
    {
        date: "Fri",
        newUsers: 26,
        returning: 20
    },
    {
        date: "Sat",
        newUsers: 28,
        returning: 25
    }
];
// --- UTILITY FUNCTIONS ---
// format thousands (1 -> "1.00 K")
const formatK = (num)=>(num / 1000).toFixed(2) + " K";
// desired weekday order and mapping to display labels
const WEEK_ORDER = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
];
const WEEK_LABELS = {
    Sun: "Su",
    Mon: "Mo",
    Tue: "Tu",
    Wed: "We",
    Thu: "Th",
    Fri: "Fr",
    Sat: "Sa"
};
// helper to normalize incoming day strings to standard three-letter names
const normalizeDay = (s)=>{
    if (!s) return s;
    const map = {
        sun: "Sun",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat",
        sunday: "Sun",
        monday: "Mon",
        tuesday: "Tue",
        wednesday: "Wed",
        thursday: "Thu",
        friday: "Fri",
        saturday: "Sat",
        Su: "Sun",
        Mo: "Mon",
        Tu: "Tue",
        We: "Wed",
        Th: "Thu",
        Fr: "Fri",
        Sa: "Sat"
    };
    const key = String(s).trim().toLowerCase();
    // Simplified normalization for mock data
    return map[key] || (s.length >= 3 ? s[0].toUpperCase() + s.slice(1, 3).toLowerCase() : s);
};
// Check if Highcharts objects are available globally
const Highcharts = window.Highcharts;
const HighchartsReact = window.HighchartsReact;
function App() {
    const [trendData, setTrendData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]); // array of { day: "Sun", new: number, returning: number }
    const [funnelData, setFunnelData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]); // array from /admin/search-to-match
    const [isChartsReady, setIsChartsReady] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(!!Highcharts && !!HighchartsReact);
    // Load data (mocked)
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        // Check if charts libs are available after initial render
        if (!isChartsReady && window.Highcharts && window.HighchartsReact) {
            setIsChartsReady(true);
        }
        // Simulate API fetch delay for trend data
        setTimeout(()=>{
            const byDay = {};
            MOCK_TREND_DATA.forEach((d)=>{
                const nd = normalizeDay(d.date);
                byDay[nd] = byDay[nd] || {
                    new: 0,
                    returning: 0
                };
                byDay[nd].new = (byDay[nd].new || 0) + (Number(d.newUsers) || 0);
                byDay[nd].returning = (byDay[nd].returning || 0) + (Number(d.returning) || 0);
            });
            const ordered = WEEK_ORDER.map((w)=>{
                const val = byDay[w] || {
                    new: 0,
                    returning: 0
                };
                return {
                    day: w,
                    new: Number(val.new || 0),
                    returning: Number(val.returning || 0)
                };
            });
            setTrendData(ordered);
        }, 500);
        // Simulate API fetch delay for funnel data
        setTimeout(()=>{
            setFunnelData(MOCK_FUNNEL_DATA);
        }, 500);
    }, [
        isChartsReady
    ]);
    // --- HIGHCHARTS CONFIGURATION ---
    // Highcharts series data (using the small values that represent Millions)
    const seriesNew = trendData.map((d)=>Number(d.new) || 0);
    const seriesReturning = trendData.map((d)=>Number(d.returning) || 0);
    const chartOptions = {
        chart: {
            type: "line",
            height: 360,
            backgroundColor: "#ffffff",
            spacingTop: 10,
            spacingLeft: 50
        },
        // Title and inline legend on the same horizontal line (useHTML)
        title: {
            useHTML: true,
            text: `
        <div style="display:flex;justify-content:space-between;align-items:center;width:100%;padding-right:20px;">
          <div style="font-size:28px;font-weight:700;color:#111827;">Running User Trend</div>

          <div style="display:flex;gap:36px;align-items:center;font-size:16px;color:#6b7280; white-space: nowrap;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="
                width:18px;height:18px;border-radius:50%;
                border:4px solid #facc15;background:#fff;display:inline-block;">
              </span>
              <span>New Registered Users</span>
            </div>

            <div style="display:flex;align-items:center;gap:8px;">
              <span style="
                width:18px;height:18px;border-radius:50%;
                border:4px solid #16a34a;background:#fff;display:inline-block;">
              </span>
              <span>Returning Users</span>
            </div>
          </div>
        </div>
      `,
            align: "left",
            x: 0,
            y: 15,
            style: {
                width: '100%'
            }
        },
        legend: {
            enabled: false
        },
        xAxis: {
            categories: trendData.map((d)=>WEEK_LABELS[d.day] || d.day),
            lineWidth: 0,
            tickLength: 0,
            labels: {
                style: {
                    fontSize: "18px",
                    fontWeight: 500,
                    color: "#374151"
                }
            }
        },
        yAxis: {
            title: null,
            gridLineColor: "#e5e7eb",
            // Ticks at 0, 5, 10, ... 30 M 
            tickPositions: [
                0,
                5,
                10,
                15,
                20,
                25,
                30
            ],
            labels: {
                // Format the small value (e.g., 20) to display as 20 M
                formatter () {
                    return `${this.value} M`;
                },
                style: {
                    fontSize: "18px",
                    color: "#6b7280"
                }
            },
            min: 0,
            max: 30
        },
        tooltip: {
            shared: true,
            formatter: function() {
                // Custom tooltip to show M scale
                let tooltip = `<span style="font-size: 10px">${this.x}</span><br/>`;
                this.points.forEach(function(point) {
                    tooltip += `<span style="color:${point.series.color}">\u25CF</span> ${point.series.name}: <b>${point.y.toFixed(2)} M</b><br/>`;
                });
                return tooltip;
            }
        },
        plotOptions: {
            series: {
                lineWidth: 4,
                marker: {
                    radius: 8,
                    lineWidth: 4,
                    lineColor: null,
                    fillColor: "#ffffff"
                },
                states: {
                    hover: {
                        enabled: true
                    }
                },
                // Smooth line
                smoothing: true
            }
        },
        // Two series: New (yellow) and Returning (green)
        series: [
            {
                name: "New Registered Users",
                data: seriesNew,
                color: "#facc15",
                marker: {
                    lineColor: "#facc15"
                }
            },
            {
                name: "Returning Users",
                data: seriesReturning,
                color: "#16a34a",
                marker: {
                    lineColor: "#16a34a"
                }
            }
        ],
        credits: {
            enabled: false
        }
    };
    return(// Main container with dark background for contrast
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "bg-gray-50 min-h-screen p-8 font-sans",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "pt-8 flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 lg:p-10 w-full lg:w-1/2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            className: "text-3xl font-extrabold mb-10 text-gray-900",
                            children: "Search To Match"
                        }, void 0, false, {
                            fileName: "[project]/src/component/analytics/TopSection.js",
                            lineNumber: 217,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "space-y-10",
                            children: funnelData.length === 0 ? // Placeholder rows when no data (shows loading state)
                            [
                                1,
                                2,
                                3,
                                4
                            ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between opacity-50 animate-pulse",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "w-[180px] text-[20px] font-medium text-gray-400",
                                            children: "Loading Stage..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/analytics/TopSection.js",
                                            lineNumber: 224,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex-1 mx-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "w-full h-[25px] bg-gray-200 rounded-full overflow-hidden",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "h-full rounded-full w-[40%]",
                                                    style: {
                                                        background: "linear-gradient(90deg,#93c5fd,#3b82f6)"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/component/analytics/TopSection.js",
                                                    lineNumber: 227,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/component/analytics/TopSection.js",
                                                lineNumber: 226,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/analytics/TopSection.js",
                                            lineNumber: 225,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "w-[120px] text-right text-[20px] font-semibold text-gray-400",
                                            children: "0.00 K"
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/analytics/TopSection.js",
                                            lineNumber: 230,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/src/component/analytics/TopSection.js",
                                    lineNumber: 223,
                                    columnNumber: 17
                                }, this)) : // Render funnel data
                            funnelData.map((item, idx)=>{
                                const maxVal = funnelData[0]?.value || 1;
                                const pct = item.value / maxVal * 100;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "w-[200px] text-[20px] font-medium text-gray-700",
                                            children: item.stage
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/analytics/TopSection.js",
                                            lineNumber: 241,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex-1 mx-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "w-full h-[30px] bg-gray-100 rounded-full overflow-hidden",
                                                style: {
                                                    boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "h-full rounded-full transition-all duration-700 ease-out",
                                                    style: {
                                                        width: `${pct}%`,
                                                        // Gradient and shadow to match the screenshot's distinct blue bar style
                                                        background: "linear-gradient(90deg,#3A47FF,#001BFF)",
                                                        filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.25))"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/component/analytics/TopSection.js",
                                                    lineNumber: 250,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/component/analytics/TopSection.js",
                                                lineNumber: 246,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/analytics/TopSection.js",
                                            lineNumber: 245,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "w-[120px] text-right text-[20px] font-semibold text-gray-800",
                                            children: formatK(item.value)
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/analytics/TopSection.js",
                                            lineNumber: 262,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/src/component/analytics/TopSection.js",
                                    lineNumber: 240,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/component/analytics/TopSection.js",
                            lineNumber: 219,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/analytics/TopSection.js",
                    lineNumber: 216,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 lg:p-10 w-full lg:w-1/2 flex flex-col justify-center",
                    children: isChartsReady && Highcharts && HighchartsReact ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(HighchartsReact, {
                        highcharts: Highcharts,
                        options: chartOptions
                    }, void 0, false, {
                        fileName: "[project]/src/component/analytics/TopSection.js",
                        lineNumber: 276,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "text-center p-16 text-gray-500 text-lg",
                        children: "Loading charting library..."
                    }, void 0, false, {
                        fileName: "[project]/src/component/analytics/TopSection.js",
                        lineNumber: 278,
                        columnNumber: 14
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/component/analytics/TopSection.js",
                    lineNumber: 273,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/component/analytics/TopSection.js",
            lineNumber: 213,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/component/analytics/TopSection.js",
        lineNumber: 212,
        columnNumber: 5
    }, this));
}
}),
"[project]/src/component/analytics/Search.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
;
const Search = ()=>{
    const [topSearch, setTopSearch] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "bg-gray-100 px-10 py-4 shadow-sm border-b fixed top-0 z-50 flex items-center justify-between",
        style: {
            left: "250px",
            width: "calc(100% - 250px)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold text-gray-900",
                children: "Analytics"
            }, void 0, false, {
                fileName: "[project]/src/component/analytics/Search.js",
                lineNumber: 15,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                            width: "30",
                            height: "30",
                            viewBox: "0 0 24 24",
                            fill: "#FFC107",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                d: "M12 24c1.104 0 2-.897 2-2h-4c0 1.103.896 2 2 2zm6.707-5l1.293 1.293V21H4v-1.707L5.293 19H6v-7c0-3.309 2.691-6 6-6s6 2.691 6 6v7h.707zM18 18H6v-7c0-2.757 2.243-5 5-5s5 2.243 5 5v7z"
                            }, void 0, false, {
                                fileName: "[project]/src/component/analytics/Search.js",
                                lineNumber: 41,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/component/analytics/Search.js",
                            lineNumber: 40,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            className: "absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"
                        }, void 0, false, {
                            fileName: "[project]/src/component/analytics/Search.js",
                            lineNumber: 43,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/analytics/Search.js",
                    lineNumber: 39,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/component/analytics/Search.js",
                lineNumber: 19,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/component/analytics/Search.js",
        lineNumber: 8,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = Search;
}),
"[externals]/highcharts [external] (highcharts, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("highcharts", () => require("highcharts"));

module.exports = mod;
}}),
"[project]/src/component/api/apiURL.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "API_URL": ()=>API_URL
});
const API_URL = "https://matrimonial-backend-7ahc.onrender.com";
}),
"[project]/src/component/analytics/ProfileMatch.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// src/component/analytics/ProfileMatch.jsx
__turbopack_context__.s({
    "default": ()=>ProfileMatch
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dynamic.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$highcharts__$5b$external$5d$__$28$highcharts$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/highcharts [external] (highcharts, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$api$2f$apiURL$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/api/apiURL.js [ssr] (ecmascript)");
;
"use client";
;
;
;
;
;
// Reference screenshots (local paths you uploaded)
// These local paths will be transformed to URLs by your toolchain if needed.
const REF_PIE = "/mnt/data/Screenshot 2025-11-25 151215.png";
const REF_MATCH = "/mnt/data/Screenshot 2025-11-25 151230.png";
const REF_FULL = "/mnt/data/Screenshot 2025-11-25 151241.png";
// dynamic import to avoid SSR issues
const HighchartsReact = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.r("[externals]/highcharts-react-official [external] (highcharts-react-official, cjs, async loader)")(__turbopack_context__.i), {
    loadableGenerated: {
        modules: [
            "[externals]/highcharts-react-official [external] (highcharts-react-official, cjs)"
        ]
    },
    ssr: false
});
function ProfileMatch() {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    const [pieData, setPieData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [totalUsers, setTotalUsers] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(new Array(12).fill(0));
    const [matches, setMatches] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(new Array(12).fill(0));
    // --- Load Profile Overview ---
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        (async ()=>{
            try {
                const res = await fetch(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$api$2f$apiURL$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["API_URL"] + "/admin/overview");
                const api = await res.json();
                if (!api.success) return;
                const order = [
                    "Completed",
                    "Low",
                    "Incomplete",
                    "Moderate"
                ];
                const colorMap = {
                    Completed: "#0c7c1b",
                    Low: "#f6931d",
                    Incomplete: "#e21d1d",
                    Moderate: "#f6c927"
                };
                setPieData(order.map((label)=>{
                    const found = api.data.find((x)=>x.name === label);
                    return {
                        name: label,
                        y: found ? found.value : 0,
                        color: colorMap[label]
                    };
                }));
            } catch (err) {
                console.error("Profile overview fetch error:", err);
            }
        })();
    }, []);
    // --- Load Matches per Month ---
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        (async ()=>{
            try {
                const res = await fetch(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$api$2f$apiURL$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["API_URL"] + "/admin/matches-per-month");
                const api = await res.json();
                if (!api.success) return;
                setTotalUsers(months.map((m)=>api.data.find((x)=>x.month === m)?.totalUsers || 0));
                setMatches(months.map((m)=>api.data.find((x)=>x.month === m)?.matches || 0));
            } catch (err) {
                console.error("matches-per-month fetch error:", err);
            }
        })();
    }, []);
    // --- PIE options (fake-3D via border + shadow + startAngle) ---
    const pieOptions = {
        chart: {
            type: "pie",
            backgroundColor: "transparent",
            height: 340
        },
        title: {
            text: ""
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            pie: {
                borderWidth: 8,
                borderColor: "#ffffff",
                dataLabels: {
                    enabled: false
                },
                shadow: {
                    color: "rgba(0,0,0,0.28)",
                    offsetX: 0,
                    offsetY: 12,
                    width: 22,
                    opacity: 0.8
                },
                slicedOffset: 8,
                startAngle: -30
            }
        },
        tooltip: {
            useHTML: true,
            formatter () {
                const total = this.series.data.reduce((s, p)=>s + (p.y || 0), 0) || 1;
                const pct = (this.point.y / total * 100).toFixed(1);
                return `<div style="font-weight:700;color:#222">${this.point.name}</div>
                <div style="margin-top:4px">${this.point.y} Users &nbsp; (<span style="font-weight:700">${pct}%</span>)</div>`;
            },
            backgroundColor: "rgba(255,255,255,0.98)",
            borderColor: "#e6e6e6",
            style: {
                color: "#222"
            }
        },
        series: [
            {
                type: "pie",
                data: pieData
            }
        ],
        credits: {
            enabled: false
        }
    };
    // --- MATCH options (rounded golden bars + red line) ---
    const matchOptions = {
        chart: {
            backgroundColor: "transparent",
            height: 420
        },
        title: {
            text: ""
        },
        legend: {
            enabled: false
        },
        xAxis: {
            categories: months,
            labels: {
                style: {
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#444"
                }
            },
            lineColor: "#eee"
        },
        yAxis: {
            min: 0,
            max: 35,
            tickInterval: 5,
            gridLineColor: "#e6e6e6",
            labels: {
                formatter () {
                    return this.value + " M";
                },
                style: {
                    fontWeight: 600,
                    color: "#666"
                }
            },
            title: {
                text: ""
            }
        },
        plotOptions: {
            column: {
                borderRadius: 24,
                pointPadding: 0.12,
                borderWidth: 0,
                grouping: true,
                shadow: {
                    color: "rgba(0,0,0,0.28)",
                    offsetX: 0,
                    offsetY: 5,
                    width: 12
                }
            },
            series: {
                states: {
                    hover: {
                        enabled: true,
                        brightness: 0.03
                    }
                }
            }
        },
        tooltip: {
            shared: true,
            useHTML: true,
            formatter () {
                let html = `<div style="font-weight:700;margin-bottom:6px">${this.x}</div>`;
                this.points.forEach((pt)=>{
                    html += `<div style="margin:4px 0">
                    <span style="display:inline-block;width:10px;height:10px;background:${pt.color};border-radius:2px;margin-right:8px;vertical-align:middle"></span>
                    <strong style="font-weight:600">${pt.series.name}:</strong>
                    &nbsp; ${pt.y}
                   </div>`;
                });
                return html;
            },
            backgroundColor: "rgba(255,255,255,0.98)",
            borderColor: "#e6e6e6",
            style: {
                color: "#222"
            }
        },
        series: [
            {
                type: "column",
                name: "Total no. of Users",
                color: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [
                            0,
                            "#f7d34a"
                        ],
                        [
                            1,
                            "#d7a304"
                        ]
                    ]
                },
                data: totalUsers
            },
            {
                type: "line",
                name: "No. Of Matches",
                color: "#e52b2b",
                lineWidth: 4,
                marker: {
                    enabled: true,
                    radius: 7,
                    fillColor: "#ffffff",
                    lineColor: "#e52b2b",
                    lineWidth: 2
                },
                data: matches
            }
        ],
        credits: {
            enabled: false
        }
    };
    // legend icon style per your confirmation:
    // size: 16px, border: 2.5px, radius: 4px
    const legendBoxStyle = {
        width: 16,
        height: 16,
        borderRadius: 4,
        background: "#fff",
        boxSizing: "border-box"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "w-full p-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 xl:grid-cols-2 gap-6 items-start",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl shadow-xl p-6 relative",
                    style: {
                        border: "2px solid rgba(0,0,0,0.08)",
                        minHeight: 360
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex items-start justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                    style: {
                                        fontSize: 26,
                                        fontWeight: 700,
                                        color: "#222"
                                    },
                                    children: "Profile Overview"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                    lineNumber: 210,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 1
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                    lineNumber: 211,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/analytics/ProfileMatch.js",
                            lineNumber: 209,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                position: "absolute",
                                right: 28,
                                top: 22,
                                display: "flex",
                                flexDirection: "column",
                                gap: 12,
                                fontSize: 17,
                                fontWeight: 600,
                                color: "#333"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                ...legendBoxStyle,
                                                border: "2.5px solid #0c7c1b"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                            lineNumber: 217,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            children: "Completed"
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                            lineNumber: 218,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                    lineNumber: 216,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                ...legendBoxStyle,
                                                border: "2.5px solid #f6931d"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                            lineNumber: 222,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            children: "Low"
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                            lineNumber: 223,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                    lineNumber: 221,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                ...legendBoxStyle,
                                                border: "2.5px solid #e21d1d"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                            lineNumber: 227,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            children: "Incomplete"
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                            lineNumber: 228,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                    lineNumber: 226,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                ...legendBoxStyle,
                                                border: "2.5px solid #f6c927"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                            lineNumber: 232,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            children: "Moderate"
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                            lineNumber: 233,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                    lineNumber: 231,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/analytics/ProfileMatch.js",
                            lineNumber: 215,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                marginTop: 36
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(HighchartsReact, {
                                highcharts: __TURBOPACK__imported__module__$5b$externals$5d2f$highcharts__$5b$external$5d$__$28$highcharts$2c$__cjs$29$__["default"],
                                options: pieOptions
                            }, void 0, false, {
                                fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                lineNumber: 239,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/component/analytics/ProfileMatch.js",
                            lineNumber: 238,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/analytics/ProfileMatch.js",
                    lineNumber: 207,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl shadow-xl p-6 relative",
                    style: {
                        border: "2px solid rgba(0,0,0,0.08)",
                        minHeight: 520
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                    style: {
                                        fontSize: 26,
                                        fontWeight: 700,
                                        color: "#222"
                                    },
                                    children: "Matches Per Month"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                    lineNumber: 247,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        gap: 48,
                                        alignItems: "center",
                                        fontSize: 16,
                                        fontWeight: 600,
                                        color: "#333"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 10
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        ...legendBoxStyle,
                                                        border: "2.5px solid #d7a304"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                                    lineNumber: 251,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    children: "Total no. of Users"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                                    lineNumber: 252,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                            lineNumber: 250,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 10
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        ...legendBoxStyle,
                                                        border: "2.5px solid #e52b2b"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                                    lineNumber: 256,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    children: "No. Of Matches"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                                    lineNumber: 257,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                            lineNumber: 255,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                    lineNumber: 249,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/analytics/ProfileMatch.js",
                            lineNumber: 246,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                marginTop: 28
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(HighchartsReact, {
                                highcharts: __TURBOPACK__imported__module__$5b$externals$5d2f$highcharts__$5b$external$5d$__$28$highcharts$2c$__cjs$29$__["default"],
                                options: matchOptions
                            }, void 0, false, {
                                fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                lineNumber: 264,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/component/analytics/ProfileMatch.js",
                            lineNumber: 263,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/analytics/ProfileMatch.js",
                    lineNumber: 244,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/component/analytics/ProfileMatch.js",
            lineNumber: 205,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/component/analytics/ProfileMatch.js",
        lineNumber: 204,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/component/analytics/ReportThisWeek.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>ReportsThisWeek
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$api$2f$apiURL$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/api/apiURL.js [ssr] (ecmascript)");
'use client';
;
;
;
;
function ReportsThisWeek() {
    const [reportData, setReportData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        (async ()=>{
            try {
                const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$api$2f$apiURL$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["API_URL"]}/admin/reports-this-week`);
                const json = await res.json();
                if (json.success) setReportData(json.data);
            } finally{
                setLoading(false);
            }
        })();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "p-4 sm:p-6 max-w-6xl mx-auto",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "rounded-[24px] p-8",
            style: {
                background: "#FFFFFF",
                border: "1px solid #D6D6D6",
                boxShadow: "0px 6px 18px rgba(0,0,0,0.12)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                            className: "text-[26px] font-semibold text-gray-900",
                            children: "Reports This Week"
                        }, void 0, false, {
                            fileName: "[project]/src/component/analytics/ReportThisWeek.js",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-7 text-[16px] font-medium text-gray-800",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            style: {
                                                width: "16px",
                                                height: "16px",
                                                borderRadius: "6px",
                                                background: "#FF7C7C",
                                                border: "2px solid #FF7C7C"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/analytics/ReportThisWeek.js",
                                            lineNumber: 54,
                                            columnNumber: 15
                                        }, this),
                                        "Fake"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/component/analytics/ReportThisWeek.js",
                                    lineNumber: 53,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            style: {
                                                width: "16px",
                                                height: "16px",
                                                borderRadius: "6px",
                                                background: "#FFC400",
                                                border: "2px solid #FFC400"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/analytics/ReportThisWeek.js",
                                            lineNumber: 68,
                                            columnNumber: 15
                                        }, this),
                                        "Inappropriate profile"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/component/analytics/ReportThisWeek.js",
                                    lineNumber: 67,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            style: {
                                                width: "16px",
                                                height: "16px",
                                                borderRadius: "6px",
                                                background: "#76D64C",
                                                border: "2px solid #76D64C"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/analytics/ReportThisWeek.js",
                                            lineNumber: 82,
                                            columnNumber: 15
                                        }, this),
                                        "Spam"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/component/analytics/ReportThisWeek.js",
                                    lineNumber: 81,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            style: {
                                                width: "16px",
                                                height: "16px",
                                                borderRadius: "6px",
                                                background: "#47D0FF",
                                                border: "2px solid #47D0FF"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/analytics/ReportThisWeek.js",
                                            lineNumber: 96,
                                            columnNumber: 15
                                        }, this),
                                        "Harassment"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/component/analytics/ReportThisWeek.js",
                                    lineNumber: 95,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/analytics/ReportThisWeek.js",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/analytics/ReportThisWeek.js",
                    lineNumber: 45,
                    columnNumber: 9
                }, this),
                loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    children: "Loading..."
                }, void 0, false, {
                    fileName: "[project]/src/component/analytics/ReportThisWeek.js",
                    lineNumber: 113,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "w-full h-[400px]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                        width: "100%",
                        height: "100%",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["BarChart"], {
                            data: reportData,
                            margin: {
                                top: 10,
                                right: 20,
                                left: 0,
                                bottom: 5
                            },
                            barCategoryGap: 28,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                    stroke: "#D8D8D8",
                                    strokeWidth: 1.2,
                                    vertical: false
                                }, void 0, false, {
                                    fileName: "[project]/src/component/analytics/ReportThisWeek.js",
                                    lineNumber: 123,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                    dataKey: "day",
                                    tick: {
                                        fill: "#4B4B4B",
                                        fontSize: 16
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/component/analytics/ReportThisWeek.js",
                                    lineNumber: 129,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                                    domain: [
                                        0,
                                        70
                                    ],
                                    ticks: [
                                        0,
                                        10,
                                        20,
                                        30,
                                        40,
                                        50,
                                        60,
                                        70
                                    ],
                                    tickFormatter: (v)=>`${v} %`,
                                    tick: {
                                        fill: "#4B4B4B",
                                        fontSize: 16
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/component/analytics/ReportThisWeek.js",
                                    lineNumber: 134,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                    formatter: (v)=>`${v}%`,
                                    contentStyle: {
                                        borderRadius: "12px",
                                        border: "1px solid #ccc",
                                        background: "#ffffff",
                                        fontSize: "14px",
                                        boxShadow: "0 2px 10px rgba(0,0,0,0.18)"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/component/analytics/ReportThisWeek.js",
                                    lineNumber: 141,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Bar"], {
                                    dataKey: "fake",
                                    stackId: "a",
                                    fill: "#FF7C7C",
                                    radius: [
                                        5,
                                        5,
                                        0,
                                        0
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/src/component/analytics/ReportThisWeek.js",
                                    lineNumber: 153,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Bar"], {
                                    dataKey: "inappropriate",
                                    stackId: "a",
                                    fill: "#FFC400"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/analytics/ReportThisWeek.js",
                                    lineNumber: 154,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Bar"], {
                                    dataKey: "spam",
                                    stackId: "a",
                                    fill: "#76D64C"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/analytics/ReportThisWeek.js",
                                    lineNumber: 155,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Bar"], {
                                    dataKey: "harassment",
                                    stackId: "a",
                                    fill: "#47D0FF"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/analytics/ReportThisWeek.js",
                                    lineNumber: 156,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/analytics/ReportThisWeek.js",
                            lineNumber: 117,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/component/analytics/ReportThisWeek.js",
                        lineNumber: 116,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/component/analytics/ReportThisWeek.js",
                    lineNumber: 115,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/component/analytics/ReportThisWeek.js",
            lineNumber: 35,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/component/analytics/ReportThisWeek.js",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
}),
"[project]/pages/analytics/index.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$analytics$2f$TopSection$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/analytics/TopSection.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$analytics$2f$Search$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/analytics/Search.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$analytics$2f$ProfileMatch$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/analytics/ProfileMatch.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$analytics$2f$ReportThisWeek$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/analytics/ReportThisWeek.js [ssr] (ecmascript)");
;
;
;
;
;
;
const index = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$analytics$2f$Search$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/analytics/index.js",
                lineNumber: 12,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$analytics$2f$TopSection$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/analytics/index.js",
                lineNumber: 13,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$analytics$2f$ProfileMatch$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/analytics/index.js",
                lineNumber: 14,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$analytics$2f$ReportThisWeek$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/analytics/index.js",
                lineNumber: 15,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
const __TURBOPACK__default__export__ = index;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__a8cf36f0._.js.map