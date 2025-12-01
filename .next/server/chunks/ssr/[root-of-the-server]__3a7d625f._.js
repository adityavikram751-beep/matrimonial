module.exports = {

"[externals]/socket.io-client [external] (socket.io-client, esm_import)": ((__turbopack_context__) => {
"use strict";

var { a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("socket.io-client");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/src/lib/socket.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "connectSocket": ()=>connectSocket,
    "disconnectSocket": ()=>disconnectSocket,
    "getSocket": ()=>getSocket
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$socket$2e$io$2d$client__$5b$external$5d$__$28$socket$2e$io$2d$client$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/socket.io-client [external] (socket.io-client, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$socket$2e$io$2d$client__$5b$external$5d$__$28$socket$2e$io$2d$client$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$socket$2e$io$2d$client__$5b$external$5d$__$28$socket$2e$io$2d$client$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
let socket = null;
function connectSocket(adminId) {
    if (socket && socket.connected) return socket;
    socket = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$socket$2e$io$2d$client__$5b$external$5d$__$28$socket$2e$io$2d$client$2c$__esm_import$29$__["io"])("https://matrimonial-backend-7ahc.onrender.com", {
        transports: [
            "websocket"
        ],
        secure: true,
        reconnection: true,
        reconnectionAttempts: 10,
        path: "/socket.io",
        query: {
            adminId
        }
    });
    socket.on("connect", ()=>{
        console.log("🔵 SOCKET CONNECTED:", socket.id);
    });
    socket.on("disconnect", ()=>{
        console.log("🔴 SOCKET DISCONNECTED");
    });
    return socket;
}
function disconnectSocket() {
    if (socket) {
        socket.disconnect();
        console.log("🔴 SOCKET MANUALLY DISCONNECTED");
    }
}
function getSocket() {
    return socket;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/component/Profile details/Search.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [ssr] (ecmascript) <export default as Search>");
// ⭐ SOCKET IMPORT
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$socket$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/socket.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$socket$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$socket$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
"use client";
;
;
;
;
const Search = ({ onSearch })=>{
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [unreadCount, setUnreadCount] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const BASE_URL = "https://matrimonial-backend-7ahc.onrender.com";
    /* --------------------------------------------
     1) ADMIN PREF → CONNECT OR DISCONNECT SOCKET
  -------------------------------------------- */ const loadAdminPrefs = async ()=>{
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${BASE_URL}/admin/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const json = await res.json();
            if (json.success) {
                const admin = json.data;
                if (admin.notifications === true) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$socket$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["connectSocket"])(admin._id);
                } else {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$socket$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["disconnectSocket"])();
                }
            }
        } catch (err) {
            console.log("Admin Pref error:", err);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        loadAdminPrefs();
    }, []);
    /* --------------------------------------------
     2) FETCH NOTIFICATIONS (API)
  -------------------------------------------- */ const fetchNotifications = async ()=>{
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${BASE_URL}/api/notification/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (data.success) {
                const list = data.data.reverse();
                setNotifications(list);
                setUnreadCount(list.filter((n)=>!n.read).length);
            }
        } catch (error) {
            console.log("Fetch Notification Error:", error);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        fetchNotifications();
    }, []);
    /* --------------------------------------------
     3) REAL-TIME NOTIFICATION SOCKET LISTENER
  -------------------------------------------- */ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$socket$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getSocket"])();
        if (!socket) return;
        console.log("🟢 Profile Topbar — Real-time listener active");
        socket.on("new-notification", (data)=>{
            console.log("🔔 REAL-TIME NOTIFICATION:", data);
            setNotifications((prev)=>[
                    data,
                    ...prev
                ]);
            setUnreadCount((prev)=>prev + 1);
        });
        return ()=>{
            const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$socket$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getSocket"])();
            if (socket) socket.off("new-notification");
        };
    }, []);
    /* --------------------------------------------
     SEARCH HANDLER
  -------------------------------------------- */ const handleSearch = ()=>onSearch(searchQuery.toLowerCase());
    const handleKeyDown = (e)=>e.key === "Enter" && handleSearch();
    /* --------------------------------------------
     CLICK OUTSIDE → CLOSE DROPDOWN
  -------------------------------------------- */ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const handler = (e)=>{
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return ()=>document.removeEventListener("mousedown", handler);
    }, []);
    /* --------------------------------------------
     AUTO READ ON BELL CLICK
  -------------------------------------------- */ const handleBellClick = ()=>{
        const newOpen = !open;
        setOpen(newOpen);
        if (newOpen) {
            setUnreadCount(0);
            // frontend mark-read
            setNotifications((prev)=>prev.map((n)=>({
                        ...n,
                        read: true
                    })));
        }
    };
    /* --------------------------------------------
     MARK ONE READ
  -------------------------------------------- */ const markAsRead = async (id)=>{
        const token = localStorage.getItem("token");
        await fetch(`${BASE_URL}/api/notification/mark-read/${id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setNotifications((prev)=>prev.map((n)=>n._id === id ? {
                    ...n,
                    read: true
                } : n));
        setUnreadCount((prev)=>prev - 1);
    };
    /* --------------------------------------------
     MARK ALL READ
  -------------------------------------------- */ const markAll = async ()=>{
        const token = localStorage.getItem("token");
        await fetch(`${BASE_URL}/api/notification/mark-all`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setNotifications((prev)=>prev.map((n)=>({
                    ...n,
                    read: true
                })));
        setUnreadCount(0);
    };
    /* --------------------------------------------
     DELETE ONE
  -------------------------------------------- */ const deleteOne = async (id)=>{
        const token = localStorage.getItem("token");
        await fetch(`${BASE_URL}/api/notification/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setNotifications((prev)=>prev.filter((n)=>n._id !== id));
    };
    /* --------------------------------------------
     DELETE ALL
  -------------------------------------------- */ const deleteAll = async ()=>{
        const token = localStorage.getItem("token");
        await Promise.all(notifications.map((n)=>fetch(`${BASE_URL}/api/notification/${n._id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })));
        setNotifications([]);
        setUnreadCount(0);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "border-slate-700 w-full bg-[rgba(242,242,242,1)] p-2",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "flex justify-between items-center fixed top-0 right-[14px] border-b-2 w-[1272px] bg-[rgba(242,242,242,1)] p-3 shadow z-50",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                    className: "text-xl text-black font-semibold",
                    children: "Profile Details"
                }, void 0, false, {
                    fileName: "[project]/src/component/Profile details/Search.js",
                    lineNumber: 206,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "flex gap-5 items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 w-[350px] shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                    className: "text-gray-600 cursor-pointer",
                                    size: 18,
                                    onClick: handleSearch
                                }, void 0, false, {
                                    fileName: "[project]/src/component/Profile details/Search.js",
                                    lineNumber: 212,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Search...",
                                    className: "ml-2 w-full outline-none text-sm bg-transparent",
                                    value: searchQuery,
                                    onChange: (e)=>{
                                        setSearchQuery(e.target.value);
                                        onSearch(e.target.value.toLowerCase());
                                    },
                                    onKeyDown: handleKeyDown
                                }, void 0, false, {
                                    fileName: "[project]/src/component/Profile details/Search.js",
                                    lineNumber: 217,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/Profile details/Search.js",
                            lineNumber: 211,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "relative",
                            ref: dropdownRef,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                    onClick: handleBellClick,
                                    xmlns: "http://www.w3.org/2000/svg",
                                    width: "30",
                                    height: "30",
                                    fill: "#FFC107",
                                    viewBox: "0 0 24 24",
                                    className: "cursor-pointer",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                        d: "M12 24c1.104 0 2-.897 2-2h-4c0 1.103.896 2 2 2zm6.707-5l1.293 1.293V21H4v-1.707L5.293 19H6v-7c0-3.309 2.691-6 6-6s6 2.691 6 6v7h.707zM18 18H6v-7c0-2.757 2.243-5 5-5s5 2.243 5 5v7z"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/Profile details/Search.js",
                                        lineNumber: 241,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/component/Profile details/Search.js",
                                    lineNumber: 232,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                unreadCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "absolute -top-1 -right-1 h-4 w-4 bg-red-600 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white",
                                    children: unreadCount
                                }, void 0, false, {
                                    fileName: "[project]/src/component/Profile details/Search.js",
                                    lineNumber: 245,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "absolute right-0 mt-3 w-[330px] bg-white shadow-lg border rounded-lg p-3 z-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                    className: "font-semibold",
                                                    children: "Notifications"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/component/Profile details/Search.js",
                                                    lineNumber: 255,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    onClick: markAll,
                                                    className: "text-blue-600 text-sm",
                                                    children: "Mark all read"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/component/Profile details/Search.js",
                                                    lineNumber: 256,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/component/Profile details/Search.js",
                                            lineNumber: 254,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "max-h-[300px] overflow-y-auto",
                                            children: notifications.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-center py-3 text-gray-500",
                                                children: "No notifications"
                                            }, void 0, false, {
                                                fileName: "[project]/src/component/Profile details/Search.js",
                                                lineNumber: 263,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)) : notifications.map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: `p-3 border-b flex justify-between items-start ${!n.read ? "bg-yellow-50" : ""}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                                    className: "font-semibold",
                                                                    children: n.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/component/Profile details/Search.js",
                                                                    lineNumber: 275,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-gray-600",
                                                                    children: n.message
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/component/Profile details/Search.js",
                                                                    lineNumber: 276,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-400 mt-1",
                                                                    children: new Date(n.createdAt).toLocaleString()
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/component/Profile details/Search.js",
                                                                    lineNumber: 277,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                !n.read && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>markAsRead(n._id),
                                                                    className: "text-blue-600 text-xs mt-1",
                                                                    children: "Mark as read"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/component/Profile details/Search.js",
                                                                    lineNumber: 282,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/component/Profile details/Search.js",
                                                            lineNumber: 274,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>deleteOne(n._id),
                                                            className: "text-red-500 text-xs",
                                                            children: "Delete"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/component/Profile details/Search.js",
                                                            lineNumber: 291,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, n._id, true, {
                                                    fileName: "[project]/src/component/Profile details/Search.js",
                                                    lineNumber: 268,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/Profile details/Search.js",
                                            lineNumber: 261,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        notifications.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: deleteAll,
                                            className: "w-full mt-2 py-2 text-red-600 text-sm border-t",
                                            children: "Delete All"
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/Profile details/Search.js",
                                            lineNumber: 303,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/component/Profile details/Search.js",
                                    lineNumber: 252,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/Profile details/Search.js",
                            lineNumber: 231,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/Profile details/Search.js",
                    lineNumber: 208,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/component/Profile details/Search.js",
            lineNumber: 204,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/component/Profile details/Search.js",
        lineNumber: 203,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = Search;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/component/api/apiURL.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "API_URL": ()=>API_URL
});
const API_URL = "https://matrimonial-backend-7ahc.onrender.com";
}),
"[project]/src/component/Profile details/ProfileDetails.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// 'use client';
// import React, { useState, useEffect } from 'react';
// import { Pencil, Trash2, Save, X } from 'lucide-react';
// import { API_URL } from '@/src/component/api/apiURL';
// const ProfileCard = ({ title, apiPath }) => {
//   const [textInput, setTextInput] = useState('');
//   const [options, setOptions] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [editText, setEditText] = useState('');
//   const API_URL_DATA = `${API_URL}/api/master/${apiPath}`;
//   useEffect(() => {
//     fetchOptions();
//   }, []);
//   const fetchOptions = async () => {
//     try {
//       const res = await fetch(API_URL_DATA);
//       const data = await res.json();
//       setOptions(data);
//     } catch (err) {
//       console.error('Error fetching options:', err);
//     }
//   };
//   const addOption = async () => {
//     const trimmed = textInput.trim();
//     if (!trimmed) return;
//     try {
//       const res = await fetch(API_URL_DATA, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ value: trimmed }),
//       });
//       const data = await res.json();
//       setOptions((prev) => [...prev, data]);
//       setTextInput('');
//     } catch (err) {
//       console.error('Error adding option:', err);
//     }
//   };
//   const removeOption = async (id) => {
//     try {
//       await fetch(`${API_URL_DATA}/${id}`, { method: 'DELETE' });
//       setOptions((prev) => prev.filter((item) => item._id !== id));
//     } catch (err) {
//       console.error('Error deleting option:', err);
//     }
//   };
//   const startEdit = (id, value) => {
//     setEditingId(id);
//     setEditText(value);
//   };
//   const saveEdit = async (id) => {
//     try {
//       const res = await fetch(`${API_URL_DATA}/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ value: editText }),
//       });
//       const updated = await res.json();
//       setOptions((prev) =>
//         prev.map((item) => (item._id === id ? updated : item))
//       );
//       setEditingId(null);
//       setEditText('');
//     } catch (err) {
//       console.error('Error editing option:', err);
//     }
//   };
//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       addOption();
//     }
//   };
//   return (
//     <div className="border border-gray-200 p-6 rounded-xl shadow-sm bg-white w-full max-w-md mx-auto transition hover:shadow-md">
//       <h1 className="text-xl font-bold text-gray-800 mb-4">{title}</h1>
//       <div className="flex flex-col sm:flex-row gap-3 mb-4">
//         <input
//           type="text"
//           value={textInput}
//           onChange={(e) => setTextInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//           placeholder="Enter new value"
//           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
//         />
//         <button
//           onClick={addOption}
//           className="bg-rose-600 text-white rounded-lg hover:bg-rose-700 px-6 py-2 transition font-medium"
//         >
//           Add
//         </button>
//       </div>
//       {options.length > 0 && (
//         <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
//           {options.map((option) => (
//             <div
//               key={option._id}
//               className="flex items-center justify-between bg-rose-50 border border-rose-200 p-3 rounded-md"
//             >
//               {editingId === option._id ? (
//                 <div className="flex w-full items-center gap-2">
//                   <input
//                     value={editText}
//                     onChange={(e) => setEditText(e.target.value)}
//                     className="flex-1 p-2 border border-gray-300 rounded-md"
//                   />
//                   <button
//                     onClick={() => saveEdit(option._id)}
//                     className="text-green-600 hover:text-green-800"
//                     title="Save"
//                   >
//                     <Save size={18} />
//                   </button>
//                   <button
//                     onClick={() => {
//                       setEditingId(null);
//                       setEditText('');
//                     }}
//                     className="text-gray-500 hover:text-gray-700"
//                     title="Cancel"
//                   >
//                     <X size={18} />
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex justify-between w-full items-center">
//                   <span className="text-gray-800 font-medium">{option.value}</span>
//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => startEdit(option._id, option.value)}
//                       className="text-blue-500 hover:text-blue-700"
//                       title="Edit"
//                     >
//                       <Pencil size={18} />
//                     </button>
//                     <button
//                       onClick={() => removeOption(option._id)}
//                       className="text-rose-500 hover:text-rose-700"
//                       title="Delete"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
// export default ProfileCard;
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$api$2f$apiURL$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/api/apiURL.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$rx$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/rx/index.mjs [ssr] (ecmascript)");
;
;
;
;
;
const ProfileCard = ({ title, apiPath })=>{
    const [textInput, setTextInput] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [selectedState, setSelectedState] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [stateList, setStateList] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [options, setOptions] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [editText, setEditText] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [editState, setEditState] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const API_URL_DATA = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$api$2f$apiURL$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["API_URL"]}/api/master/${apiPath}`;
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        fetchOptions();
        if (apiPath === 'city') {
            fetchStates();
        }
    }, []);
    const fetchOptions = async ()=>{
        try {
            const res = await fetch(API_URL_DATA);
            const data = await res.json();
            setOptions(data);
        } catch (err) {
            console.error('Error fetching options:', err);
        }
    };
    const fetchStates = async ()=>{
        try {
            const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$api$2f$apiURL$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["API_URL"]}/api/master/state`);
            const data = await res.json();
            setStateList(data);
        } catch (err) {
            console.error('Error fetching states:', err);
        }
    };
    const addOption = async ()=>{
        const trimmed = textInput.trim();
        if (!trimmed) return;
        // Check for duplicate (case-insensitive)
        const isDuplicate = options.some((opt)=>opt.value.trim().toLowerCase() === trimmed.toLowerCase());
        if (isDuplicate) {
            setError('This field has already been mentioned');
            return;
        }
        const payload = apiPath === 'city' ? {
            value: trimmed,
            state: selectedState
        } : {
            value: trimmed
        };
        try {
            const res = await fetch(API_URL_DATA, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            setOptions((prev)=>[
                    ...prev,
                    data
                ]);
            setTextInput('');
            setSelectedState('');
            setError(''); // Clear error after successful add
        } catch (err) {
            console.error('Error adding option:', err);
        }
    };
    const removeOption = async (id)=>{
        try {
            await fetch(`${API_URL_DATA}/${id}`, {
                method: 'DELETE'
            });
            setOptions((prev)=>prev.filter((item)=>item._id !== id));
        } catch (err) {
            console.error('Error deleting option:', err);
        }
    };
    const startEdit = (id, value, stateName = '')=>{
        setEditingId(id);
        setEditText(value);
        if (apiPath === 'city') setEditState(stateName);
    };
    const saveEdit = async (id)=>{
        const payload = apiPath === 'city' ? {
            value: editText,
            state: editState
        } : {
            value: editText
        };
        try {
            const res = await fetch(`${API_URL_DATA}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const updated = await res.json();
            setOptions((prev)=>prev.map((item)=>item._id === id ? updated : item));
            setEditingId(null);
            setEditText('');
            setEditState('');
        } catch (err) {
            console.error('Error editing option:', err);
        }
    };
    const handleKeyDown = (e)=>{
        if (e.key === 'Enter' && textInput.trim() !== '') {
            e.preventDefault();
            addOption();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "border-1 border-black mt-[50px] p-3 rounded-xl shadow-sm bg-white w-full max-w-md mx-auto transition hover:shadow-md",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                className: "text-xl font-bold text-gray-800 mb-4",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/component/Profile details/ProfileDetails.js",
                lineNumber: 292,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3 mb-3",
                children: [
                    apiPath === 'city' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                        value: selectedState,
                        onChange: (e)=>setSelectedState(e.target.value),
                        className: "p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Select State"
                            }, void 0, false, {
                                fileName: "[project]/src/component/Profile details/ProfileDetails.js",
                                lineNumber: 300,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            stateList.map((state)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                    value: state.value,
                                    children: state.value
                                }, state._id, false, {
                                    fileName: "[project]/src/component/Profile details/ProfileDetails.js",
                                    lineNumber: 302,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/component/Profile details/ProfileDetails.js",
                        lineNumber: 295,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                        onSubmit: (e)=>{
                            e.preventDefault();
                            addOption();
                        },
                        className: "flex gap-3 flex-row ",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: textInput,
                                onChange: (e)=>{
                                    setTextInput(e.target.value);
                                    setError('');
                                },
                                onKeyDown: handleKeyDown,
                                placeholder: "Enter new value",
                                className: "w-full p-3 border border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                            }, void 0, false, {
                                fileName: "[project]/src/component/Profile details/ProfileDetails.js",
                                lineNumber: 316,
                                columnNumber: 3
                            }, ("TURBOPACK compile-time value", void 0)),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-sm text-red-500 -mt-2",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/src/component/Profile details/ProfileDetails.js",
                                lineNumber: 327,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: addOption,
                                className: "bg-red-800 border-1 border-black   text-white rounded-lg hover:bg-rose-700 px-4 py-2 transition font-medium",
                                children: "Add"
                            }, void 0, false, {
                                fileName: "[project]/src/component/Profile details/ProfileDetails.js",
                                lineNumber: 329,
                                columnNumber: 5
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/component/Profile details/ProfileDetails.js",
                        lineNumber: 309,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/Profile details/ProfileDetails.js",
                lineNumber: 293,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            options.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-2",
                children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "",
                        children: editingId === option._id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    value: editText,
                                    onChange: (e)=>setEditText(e.target.value),
                                    className: "flex-1 p-2 border border-gray-300 rounded-md"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/Profile details/ProfileDetails.js",
                                    lineNumber: 348,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)),
                                apiPath === 'city' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                    value: editState,
                                    onChange: (e)=>setEditState(e.target.value),
                                    className: "p-2 border border-gray-300 rounded-md",
                                    children: stateList.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                            value: s.value,
                                            children: s.value
                                        }, s._id, false, {
                                            fileName: "[project]/src/component/Profile details/ProfileDetails.js",
                                            lineNumber: 361,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/src/component/Profile details/ProfileDetails.js",
                                    lineNumber: 354,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/Profile details/ProfileDetails.js",
                            lineNumber: 347,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "inline-flex bg-[rgba(255,208,208,1)] items-center gap-2 p-1 justify-center shadow rounded border-1 border-green-400 overflow-hidden text-ellipsis whitespace-nowrap",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "text-gray-800   font-medium",
                                    children: [
                                        option.value,
                                        " ",
                                        option.state ? `(${option.state})` : ''
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/component/Profile details/ProfileDetails.js",
                                    lineNumber: 370,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: " flex gap-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>removeOption(option._id),
                                        className: "cursor-pointer text-black flex justify-center items-center bg-transparent ",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$rx$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["RxCross2"], {
                                            className: "bg-transparent"
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/Profile details/ProfileDetails.js",
                                            lineNumber: 378,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/Profile details/ProfileDetails.js",
                                        lineNumber: 374,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/component/Profile details/ProfileDetails.js",
                                    lineNumber: 373,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/Profile details/ProfileDetails.js",
                            lineNumber: 369,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    }, option._id, false, {
                        fileName: "[project]/src/component/Profile details/ProfileDetails.js",
                        lineNumber: 342,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/component/Profile details/ProfileDetails.js",
                lineNumber: 340,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/component/Profile details/ProfileDetails.js",
        lineNumber: 291,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = ProfileCard;
}),
"[project]/pages/profileDetails/index.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "default": ()=>ProfilePage
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$Profile__details$2f$Search$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/Profile details/Search.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$Profile__details$2f$ProfileDetails$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/Profile details/ProfileDetails.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$Profile__details$2f$Search$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$Profile__details$2f$Search$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
"use client";
;
;
;
;
const profileTitles = [
    {
        label: "Profile For",
        api: "profile-for"
    },
    {
        label: "Religion",
        api: "religion"
    },
    {
        label: "Caste",
        api: "caste"
    },
    {
        label: "Communities",
        api: "communities"
    },
    {
        label: "Diet",
        api: "diet"
    },
    {
        label: "Color",
        api: "color"
    },
    {
        label: "Marital Status",
        api: "marital-status"
    },
    {
        label: "Mother Tongue",
        api: "mother-tongue"
    },
    {
        label: "Family Status",
        api: "family-status"
    },
    {
        label: "State",
        api: "state"
    },
    {
        label: "City",
        api: "city"
    },
    {
        label: "Education",
        api: "education"
    },
    {
        label: "Employed In",
        api: "employed-in"
    },
    {
        label: "Designation",
        api: "designation"
    }
];
function ProfilePage() {
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const filtered = profileTitles.filter((item)=>item.label.toLowerCase().includes(searchTerm));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$Profile__details$2f$Search$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                onSearch: setSearchTerm
            }, void 0, false, {
                fileName: "[project]/pages/profileDetails/index.js",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "min-h-screen bg-gray-100 p-8 mt-[10px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                    children: filtered.length > 0 ? filtered.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$Profile__details$2f$ProfileDetails$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            title: item.label,
                            apiPath: item.api
                        }, idx, false, {
                            fileName: "[project]/pages/profileDetails/index.js",
                            lineNumber: 38,
                            columnNumber: 15
                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-center text-gray-500 col-span-3",
                        children: "No matching results..."
                    }, void 0, false, {
                        fileName: "[project]/pages/profileDetails/index.js",
                        lineNumber: 41,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/profileDetails/index.js",
                    lineNumber: 35,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/profileDetails/index.js",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__3a7d625f._.js.map