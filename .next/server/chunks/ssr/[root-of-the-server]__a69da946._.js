module.exports = {

"[externals]/highcharts [external] (highcharts, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("highcharts", () => require("highcharts"));

module.exports = mod;
}}),
"[externals]/highcharts/highcharts-3d.js [external] (highcharts/highcharts-3d.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("highcharts/highcharts-3d.js", () => require("highcharts/highcharts-3d.js"));

module.exports = mod;
}}),
"[externals]/highcharts-react-official [external] (highcharts-react-official, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("highcharts-react-official", () => require("highcharts-react-official"));

module.exports = mod;
}}),
"[project]/src/component/api/apiURL.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "API_URL": ()=>API_URL
});
const API_URL = "https://matrimonial-backend-7ahc.onrender.com";
}),
"[project]/src/component/analytics/TopSection.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>UserTrends
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$highcharts__$5b$external$5d$__$28$highcharts$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/highcharts [external] (highcharts, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$highcharts$2f$highcharts$2d$3d$2e$js__$5b$external$5d$__$28$highcharts$2f$highcharts$2d$3d$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/highcharts/highcharts-3d.js [external] (highcharts/highcharts-3d.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$highcharts$2d$react$2d$official__$5b$external$5d$__$28$highcharts$2d$react$2d$official$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/highcharts-react-official [external] (highcharts-react-official, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$api$2f$apiURL$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/api/apiURL.js [ssr] (ecmascript)");
'use client';
;
;
;
;
(0, __TURBOPACK__imported__module__$5b$externals$5d2f$highcharts$2f$highcharts$2d$3d$2e$js__$5b$external$5d$__$28$highcharts$2f$highcharts$2d$3d$2e$js$2c$__cjs$29$__["default"])(__TURBOPACK__imported__module__$5b$externals$5d2f$highcharts__$5b$external$5d$__$28$highcharts$2c$__cjs$29$__["default"]); // ⭐ TURBOPACK SAFE
;
;
function UserTrends() {
    const [trendData, setTrendData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [funnelData, setFunnelData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const formatK = (num)=>(num / 1000).toFixed(2) + " K";
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const loadTrend = async ()=>{
            try {
                const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$api$2f$apiURL$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["API_URL"]}/admin/user-signup-trends`);
                const json = await res.json();
                if (json.success) {
                    setTrendData(json.data.map((d)=>({
                            day: d.date,
                            new: d.newUsers,
                            returning: Math.floor(d.newUsers * 0.55)
                        })));
                }
            } catch (e) {
                console.log(e);
            }
        };
        loadTrend();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const loadFunnel = async ()=>{
            try {
                const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$api$2f$apiURL$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["API_URL"]}/admin/search-to-match`);
                const json = await res.json();
                if (json.success) setFunnelData(json.data);
            } catch (e) {
                console.log(e);
            }
        };
        loadFunnel();
    }, []);
    const chartOptions = {
        chart: {
            type: "line",
            height: 330,
            backgroundColor: "#fff",
            spacingTop: 50,
            spacingLeft: 60
        },
        title: {
            text: "Running User Trend",
            align: "left",
            style: {
                fontSize: "30px",
                fontWeight: 700
            }
        },
        legend: {
            align: "center",
            verticalAlign: "top",
            layout: "horizontal",
            y: 10,
            symbolRadius: 50,
            itemStyle: {
                fontSize: "16px",
                fontWeight: 500
            }
        },
        xAxis: {
            categories: trendData.map((d)=>d.day),
            tickLength: 0,
            labels: {
                style: {
                    fontSize: "18px"
                }
            },
            lineWidth: 0
        },
        yAxis: {
            title: {
                text: null
            },
            gridLineColor: "#e5e7eb",
            tickPositions: [
                0,
                5e6,
                10e6,
                15e6,
                20e6,
                25e6,
                30e6
            ],
            labels: {
                formatter () {
                    return `${this.value / 1e6} M`;
                },
                style: {
                    fontSize: "18px"
                }
            }
        },
        tooltip: {
            shared: true
        },
        series: [
            {
                name: "New Registered Users",
                data: trendData.map((d)=>d.new),
                color: "#facc15",
                lineWidth: 4,
                marker: {
                    radius: 9,
                    lineWidth: 4,
                    lineColor: "#facc15",
                    fillColor: "#fff"
                }
            },
            {
                name: "Returning Users",
                data: trendData.map((d)=>d.returning),
                color: "#16a34a",
                lineWidth: 4,
                marker: {
                    radius: 9,
                    lineWidth: 4,
                    lineColor: "#16a34a",
                    fillColor: "#fff"
                }
            }
        ]
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "mt-24 px-6 flex flex-col md:flex-row gap-10 w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl shadow-xl border border-gray-300 p-10 w-full md:w-1/2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        className: "text-3xl font-bold mb-10",
                        children: "Search To Match"
                    }, void 0, false, {
                        fileName: "[project]/src/component/analytics/TopSection.js",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "space-y-12",
                        children: funnelData.map((item, i)=>{
                            const max = funnelData[0]?.value || 1;
                            const percent = item.value / max * 100;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "w-[220px] text-[20px] font-medium text-gray-700",
                                        children: item.stage
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/analytics/TopSection.js",
                                        lineNumber: 138,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex-1 mx-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "h-[28px] bg-gray-200 rounded-full shadow-inner overflow-hidden",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "h-full rounded-full",
                                                style: {
                                                    width: percent + "%",
                                                    background: "linear-gradient(90deg,#3A47FF,#001BFF)",
                                                    boxShadow: "0px 4px 12px rgba(0,0,0,0.35)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/component/analytics/TopSection.js",
                                                lineNumber: 144,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/analytics/TopSection.js",
                                            lineNumber: 143,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/analytics/TopSection.js",
                                        lineNumber: 142,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "w-[150px] text-right text-[20px] font-semibold text-gray-800",
                                        children: formatK(item.value)
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/analytics/TopSection.js",
                                        lineNumber: 155,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/src/component/analytics/TopSection.js",
                                lineNumber: 136,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/component/analytics/TopSection.js",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/analytics/TopSection.js",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl shadow-xl border border-gray-300 p-10 w-full md:w-1/2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$highcharts$2d$react$2d$official__$5b$external$5d$__$28$highcharts$2d$react$2d$official$2c$__cjs$29$__["default"], {
                    highcharts: __TURBOPACK__imported__module__$5b$externals$5d2f$highcharts__$5b$external$5d$__$28$highcharts$2c$__cjs$29$__["default"],
                    options: chartOptions
                }, void 0, false, {
                    fileName: "[project]/src/component/analytics/TopSection.js",
                    lineNumber: 168,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/component/analytics/TopSection.js",
                lineNumber: 167,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/component/analytics/TopSection.js",
        lineNumber: 123,
        columnNumber: 5
    }, this);
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
"[project]/src/component/analytics/ProfileMatch.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>ProfileMatchHighcharts
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
/**
 * ProfileMatchHighcharts.js
 *
 * Highcharts (3D) client-only component that:
 * - shows a 3D pie on the left (with percentage labels)
 * - shows a gold bar chart + red line on the right (Y axis 0..35)
 * - fetches data from API_URL with fallback demo data
 * - uses dynamic import so Highcharts is only loaded on client (avoids SSR errors)
 *
 * IMPORTANT:
 * - Ensure src/component/api/apiURL.js exists and exports API_URL (string)
 * - Ensure you've installed highcharts and highcharts-react-official
 *
 * The uploaded screenshot path (will be converted by your environment to a usable URL):
 * '/mnt/data/Screenshot 2025-11-24 153921.png'
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dynamic.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$api$2f$apiURL$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/api/apiURL.js [ssr] (ecmascript)");
;
'use client';
;
;
;
;
// Use dynamic import for HighchartsReact (no SSR)
const HighchartsReact = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.r("[externals]/highcharts-react-official [external] (highcharts-react-official, cjs, async loader)")(__turbopack_context__.i), {
    loadableGenerated: {
        modules: [
            "[externals]/highcharts-react-official [external] (highcharts-react-official, cjs)"
        ]
    },
    ssr: false
});
// local screenshot path (developer-provided)
const SAMPLE_IMAGE_PATH = '/mnt/data/Screenshot 2025-11-24 153921.png';
// Demo fallback data (so component renders even if API unreachable)
const DEMO_OVERVIEW = {
    completed: 45,
    low: 20,
    incomplete: 15,
    moderate: 20
};
const DEMO_MATCHES = [
    {
        month: 'Jan',
        totalUsers: 20,
        matches: 10
    },
    {
        month: 'Feb',
        totalUsers: 24,
        matches: 13
    },
    {
        month: 'Mar',
        totalUsers: 28,
        matches: 19
    },
    {
        month: 'Apr',
        totalUsers: 23,
        matches: 17
    },
    {
        month: 'May',
        totalUsers: 19,
        matches: 13
    },
    {
        month: 'Jun',
        totalUsers: 14,
        matches: 8
    },
    {
        month: 'Jly',
        totalUsers: 12,
        matches: 7
    },
    {
        month: 'Aug',
        totalUsers: 16,
        matches: 9
    },
    {
        month: 'Sep',
        totalUsers: 18,
        matches: 10
    },
    {
        month: 'Oct',
        totalUsers: 22,
        matches: 12
    },
    {
        month: 'Nov',
        totalUsers: 27,
        matches: 16
    },
    {
        month: 'Dec',
        totalUsers: 33,
        matches: 27
    }
];
function ProfileMatchHighcharts() {
    const [Highcharts, setHighcharts] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [hc3dLoaded, setHc3dLoaded] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [overview, setOverview] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(DEMO_OVERVIEW);
    const [matches, setMatches] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(DEMO_MATCHES);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    // Load highcharts and 3d module dynamically on client
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        let cancelled = false;
        (async ()=>{
            try {
                const HC = (await __turbopack_context__.r("[externals]/highcharts [external] (highcharts, cjs, async loader)")(__turbopack_context__.i)).default ?? await __turbopack_context__.r("[externals]/highcharts [external] (highcharts, cjs, async loader)")(__turbopack_context__.i);
                // load modules
                // highcharts-3d enhances Highcharts global
                await __turbopack_context__.r("[externals]/highcharts/highcharts-3d.js [external] (highcharts/highcharts-3d.js, cjs, async loader)")(__turbopack_context__.i).then((mod)=>{
                // module attaches itself to Highcharts when imported — no further action required
                });
                // set reference
                if (!cancelled) setHighcharts(HC);
                setHc3dLoaded(true);
            } catch (e) {
                console.error('Failed to load Highcharts dynamically:', e);
            }
        })();
        return ()=>{
            cancelled = true;
        };
    }, []);
    // Fetch data from API (attempt common endpoints, normalize)
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        let mounted = true;
        const tryFetch = async (url)=>{
            try {
                const res = await fetch(url, {
                    cache: 'no-store'
                });
                if (!res.ok) return null;
                const json = await res.json();
                return json;
            } catch  {
                return null;
            }
        };
        const normalizeOverview = (json)=>{
            if (!json) return null;
            if (json.completed !== undefined) return json;
            if (json.data && typeof json.data === 'object') {
                // some APIs wrap: { success: true, data: { completed, ... } }
                return json.data;
            }
            return null;
        };
        const normalizeMatches = (json)=>{
            if (!json) return null;
            if (Array.isArray(json)) return json;
            if (json.data && Array.isArray(json.data)) return json.data;
            return null;
        };
        (async ()=>{
            setLoading(true);
            // candidate endpoints (adjust if your APIs are different)
            const overviewUrls = [
                `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$api$2f$apiURL$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["API_URL"]}/admin/overview`,
                `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$api$2f$apiURL$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["API_URL"]}/analytics/profile-overview`,
                `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$api$2f$apiURL$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["API_URL"]}/profile/overview`,
                `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$api$2f$apiURL$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["API_URL"]}/overview`
            ];
            const matchesUrls = [
                `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$api$2f$apiURL$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["API_URL"]}/admin/matches-per-month`,
                `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$api$2f$apiURL$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["API_URL"]}/analytics/matches-per-month`,
                `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$api$2f$apiURL$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["API_URL"]}/matches-per-month`,
                `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$api$2f$apiURL$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["API_URL"]}/data/matches-per-month`
            ];
            // try overview
            let gotOverview = null;
            for (const u of overviewUrls){
                const r = await tryFetch(u);
                const n = normalizeOverview(r);
                if (n) {
                    gotOverview = n;
                    break;
                }
            }
            // try matches
            let gotMatches = null;
            for (const u of matchesUrls){
                const r = await tryFetch(u);
                const n = normalizeMatches(r);
                if (n) {
                    gotMatches = n;
                    break;
                }
            }
            if (mounted) {
                if (gotOverview) setOverview(gotOverview);
                if (gotMatches) {
                    // normalize match objects to { month, totalUsers, matches }
                    const normalized = gotMatches.map((row)=>({
                            month: row.month || row.month_name || row.label || row.m || 'N/A',
                            totalUsers: Number(row.totalUsers ?? row.user_count ?? row.users ?? row.userCount ?? 0),
                            matches: Number(row.matches ?? row.match_count ?? row.matchCount ?? 0)
                        }));
                    setMatches(normalized);
                }
                setLoading(false);
            }
        })();
        return ()=>{
            mounted = false;
        };
    }, []);
    // Build Highcharts options once Highcharts is available
    const pieSeries = [
        {
            type: 'pie',
            name: 'Profiles',
            data: [
                {
                    name: 'Completed',
                    y: Number(overview.completed ?? 0),
                    color: '#0f8618'
                },
                {
                    name: 'Low',
                    y: Number(overview.low ?? 0),
                    color: '#f39a1e'
                },
                {
                    name: 'Incomplete',
                    y: Number(overview.incomplete ?? 0),
                    color: '#e02020'
                },
                {
                    name: 'Moderate',
                    y: Number(overview.moderate ?? 0),
                    color: '#f6d21a'
                }
            ],
            innerSize: 0,
            depth: 45,
            showInLegend: false,
            size: '70%'
        }
    ];
    const barCategories = matches.map((m)=>m.month);
    const barValues = matches.map((m)=>m.totalUsers);
    const lineValues = matches.map((m)=>m.matches);
    // Highcharts chart options for chart on RIGHT (combined column+line but we render two charts side-by-side: we will create a single combined chart)
    const combinedOptions = Highcharts ? {
        chart: {
            type: 'column',
            backgroundColor: 'transparent',
            margin: [
                40,
                20,
                50,
                60
            ]
        },
        title: {
            text: null
        },
        xAxis: {
            categories: barCategories,
            crosshair: false,
            labels: {
                style: {
                    color: '#555',
                    fontSize: '13px'
                }
            }
        },
        yAxis: [
            {
                title: {
                    text: null
                },
                min: 0,
                max: 35,
                tickInterval: 5,
                labels: {
                    formatter: function() {
                        return this.value + ' M';
                    },
                    style: {
                        color: '#666',
                        fontSize: '13px'
                    }
                },
                gridLineColor: '#d8d8d8'
            }
        ],
        legend: {
            enabled: false
        },
        plotOptions: {
            column: {
                borderRadiusTopLeft: 12,
                borderRadiusTopRight: 12,
                borderWidth: 0,
                pointPadding: 0.15,
                groupPadding: 0.08,
                pointPlacement: 0,
                shadow: {
                    color: 'rgba(0,0,0,0.12)',
                    offsetX: 0,
                    offsetY: 4,
                    width: 6
                }
            },
            series: {
                states: {
                    hover: {
                        enabled: false
                    }
                }
            }
        },
        tooltip: {
            shared: false,
            useHTML: true,
            headerFormat: '<b>{point.key}</b><br/>',
            pointFormatter: function() {
                // differentiate between column and line
                if (this.series.type === 'column') {
                    return `<span style="color:${this.color}">\u25CF</span> ${this.series.name}: <b>${this.y} M</b>`;
                }
                return `<span style="color:${this.color}">\u25CF</span> ${this.series.name}: <b>${this.y} M</b>`;
            }
        },
        series: [
            {
                name: 'Total no. of Users',
                type: 'column',
                data: barValues,
                color: {
                    linearGradient: {
                        x1: 0,
                        x2: 0,
                        y1: 0,
                        y2: 1
                    },
                    stops: [
                        [
                            0,
                            '#fde47f'
                        ],
                        [
                            1,
                            '#f4c116'
                        ]
                    ]
                },
                borderRadius: 6,
                pointWidth: 28,
                zIndex: 1
            },
            {
                name: 'No. Of Matches',
                type: 'line',
                data: lineValues,
                color: '#ef4444',
                lineWidth: 3,
                marker: {
                    radius: 6,
                    fillColor: '#fde47f',
                    lineColor: '#ef4444',
                    lineWidth: 2
                },
                zIndex: 2,
                yAxis: 0
            }
        ],
        credits: {
            enabled: false
        }
    } : null;
    // Pie 3D options
    const pieOptions = Highcharts ? {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 50,
                beta: 0,
                depth: 60,
                viewDistance: 50
            },
            backgroundColor: 'transparent',
            margin: [
                40,
                20,
                50,
                60
            ]
        },
        title: {
            text: null
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 45,
                innerSize: 0,
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        const total = this.series.data.reduce((s, p)=>s + p.y, 0) || 1;
                        return Math.round(this.y / total * 100) + '%';
                    },
                    distance: 0,
                    style: {
                        color: '#111',
                        fontWeight: '700',
                        fontSize: '13px'
                    }
                },
                showInLegend: false
            }
        },
        tooltip: {
            pointFormat: '{point.name}: <b>{point.y}</b>'
        },
        series: pieSeries,
        credits: {
            enabled: false
        }
    } : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "p-6 max-w-[1220px] mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex flex-col lg:flex-row gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl shadow-xl border border-gray-300 p-6 w-full lg:w-[45%]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-start mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-semibold text-gray-800",
                                        children: "Profile Overview"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                        lineNumber: 347,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-4 text-sm font-medium",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "w-5 h-5 rounded-sm border",
                                                        style: {
                                                            backgroundColor: '#0f8618',
                                                            borderColor: '#6b6b6b'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                                        lineNumber: 351,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-700",
                                                        children: "Completed"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                                        lineNumber: 352,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                                lineNumber: 350,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "w-5 h-5 rounded-sm border",
                                                        style: {
                                                            backgroundColor: '#f39a1e',
                                                            borderColor: '#6b6b6b'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                                        lineNumber: 355,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-700",
                                                        children: "Low"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                                        lineNumber: 356,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                                lineNumber: 354,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "w-5 h-5 rounded-sm border",
                                                        style: {
                                                            backgroundColor: '#e02020',
                                                            borderColor: '#6b6b6b'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                                        lineNumber: 359,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-700",
                                                        children: "Incomplete"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                                        lineNumber: 360,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                                lineNumber: 358,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "w-5 h-5 rounded-sm border",
                                                        style: {
                                                            backgroundColor: '#f6d21a',
                                                            borderColor: '#6b6b6b'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                                        lineNumber: 363,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-700",
                                                        children: "Moderate"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                                        lineNumber: 364,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                                lineNumber: 362,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                        lineNumber: 349,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                lineNumber: 346,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "w-full h-[320px] mt-2",
                                children: Highcharts && hc3dLoaded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(HighchartsReact, {
                                    highcharts: Highcharts,
                                    options: pieOptions,
                                    immutable: false
                                }, void 0, false, {
                                    fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                    lineNumber: 372,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "w-full h-full flex items-center justify-center text-gray-500",
                                    children: "Loading chart…"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                    lineNumber: 374,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                lineNumber: 369,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/component/analytics/ProfileMatch.js",
                        lineNumber: 345,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl shadow-xl border border-gray-300 p-6 w-full lg:w-[55%]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-start mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-semibold text-gray-800",
                                        children: "Matches Per Month"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                        lineNumber: 382,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex gap-6 items-center text-sm font-medium",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "w-4 h-4 rounded-sm border border-yellow-600",
                                                        style: {
                                                            backgroundColor: '#f6d21a'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                                        lineNumber: 386,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        children: "Total no. of Users"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                                        lineNumber: 387,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                                lineNumber: 385,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "w-4 h-4 rounded-sm border border-red-500",
                                                        style: {
                                                            backgroundColor: '#ef4444'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                                        lineNumber: 390,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        children: "No. Of Matches"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                                        lineNumber: 391,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                                lineNumber: 389,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                        lineNumber: 384,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                lineNumber: 381,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "w-full h-[360px] mt-3",
                                children: Highcharts && combinedOptions ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(HighchartsReact, {
                                    highcharts: Highcharts,
                                    options: combinedOptions,
                                    immutable: false
                                }, void 0, false, {
                                    fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                    lineNumber: 398,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "w-full h-full flex items-center justify-center text-gray-500",
                                    children: "Loading chart…"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                    lineNumber: 400,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/component/analytics/ProfileMatch.js",
                                lineNumber: 396,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/component/analytics/ProfileMatch.js",
                        lineNumber: 380,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/analytics/ProfileMatch.js",
                lineNumber: 343,
                columnNumber: 7
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mt-3 text-sm text-gray-600",
                children: "Loading data…"
            }, void 0, false, {
                fileName: "[project]/src/component/analytics/ProfileMatch.js",
                lineNumber: 406,
                columnNumber: 19
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    display: 'none'
                },
                "data-screenshot-path": SAMPLE_IMAGE_PATH
            }, void 0, false, {
                fileName: "[project]/src/component/analytics/ProfileMatch.js",
                lineNumber: 409,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/component/analytics/ProfileMatch.js",
        lineNumber: 342,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__a69da946._.js.map