(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s({
    "connect": ()=>connect,
    "setHooks": ()=>setHooks,
    "subscribeToUpdate": ()=>subscribeToUpdate
});
function connect(param) {
    let { addMessageListener, sendMessage, onUpdateError = console.error } = param;
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: (param)=>{
            let [chunkPath, callback] = param;
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        var _updateA_modules;
        const deletedModules = new Set((_updateA_modules = updateA.modules) !== null && _updateA_modules !== void 0 ? _updateA_modules : []);
        var _updateB_modules;
        const addedModules = new Set((_updateB_modules = updateB.modules) !== null && _updateB_modules !== void 0 ? _updateB_modules : []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        var _updateA_added, _updateB_added;
        const added = new Set([
            ...(_updateA_added = updateA.added) !== null && _updateA_added !== void 0 ? _updateA_added : [],
            ...(_updateB_added = updateB.added) !== null && _updateB_added !== void 0 ? _updateB_added : []
        ]);
        var _updateA_deleted, _updateB_deleted;
        const deleted = new Set([
            ...(_updateA_deleted = updateA.deleted) !== null && _updateA_deleted !== void 0 ? _updateA_deleted : [],
            ...(_updateB_deleted = updateB.deleted) !== null && _updateB_deleted !== void 0 ? _updateB_deleted : []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        var _updateA_modules1, _updateB_added1;
        const modules = new Set([
            ...(_updateA_modules1 = updateA.modules) !== null && _updateA_modules1 !== void 0 ? _updateA_modules1 : [],
            ...(_updateB_added1 = updateB.added) !== null && _updateB_added1 !== void 0 ? _updateB_added1 : []
        ]);
        var _updateB_deleted1;
        for (const moduleId of (_updateB_deleted1 = updateB.deleted) !== null && _updateB_deleted1 !== void 0 ? _updateB_deleted1 : []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        var _updateB_modules1;
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set((_updateB_modules1 = updateB.modules) !== null && _updateB_modules1 !== void 0 ? _updateB_modules1 : []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error("Invariant: ".concat(message));
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/src/component/Profile details/Search.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [client] (ecmascript) <export default as Search>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const Search = (param)=>{
    let { onSearch } = param;
    _s();
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [unreadCount, setUnreadCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const BASE_URL = "https://matrimonial-backend-7ahc.onrender.com";
    // SEARCH HANDLER
    const handleSearch = ()=>onSearch(searchQuery.toLowerCase());
    const handleKeyDown = (e)=>e.key === "Enter" && handleSearch();
    // CLICK OUTSIDE → CLOSE DROPDOWN
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Search.useEffect": ()=>{
            const handler = {
                "Search.useEffect.handler": (e)=>{
                    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                        setOpen(false);
                    }
                }
            }["Search.useEffect.handler"];
            document.addEventListener("mousedown", handler);
            return ({
                "Search.useEffect": ()=>document.removeEventListener("mousedown", handler)
            })["Search.useEffect"];
        }
    }["Search.useEffect"], []);
    // FETCH NOTIFICATIONS (API)
    const fetchNotifications = async ()=>{
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("".concat(BASE_URL, "/api/notification/me"), {
                headers: {
                    Authorization: "Bearer ".concat(token)
                }
            });
            const data = await res.json();
            if (data.success) {
                const list = data.data.reverse();
                setNotifications(list);
                setUnreadCount(list.filter((n)=>!n.read).length);
            }
        } catch (error) {
            console.log("Fetch error:", error);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Search.useEffect": ()=>{
            fetchNotifications();
        }
    }["Search.useEffect"], []);
    // AUTO READ ALL ON OPEN
    const handleBellClick = ()=>{
        const newOpen = !open;
        setOpen(newOpen);
        if (newOpen) {
            // Remove red dot
            setUnreadCount(0);
            // Mark all as read (frontend)
            setNotifications((prev)=>prev.map((n)=>({
                        ...n,
                        read: true
                    })));
        }
    };
    // MARK ONE READ
    const markAsRead = async (id)=>{
        try {
            const token = localStorage.getItem("token");
            await fetch("".concat(BASE_URL, "/api/notification/mark-read/").concat(id), {
                method: "PATCH",
                headers: {
                    Authorization: "Bearer ".concat(token)
                }
            });
            setNotifications((prev)=>prev.map((n)=>n._id === id ? {
                        ...n,
                        read: true
                    } : n));
            setUnreadCount((prev)=>prev - 1);
        } catch (e) {
            console.log(e);
        }
    };
    // MARK ALL READ
    const markAll = async ()=>{
        try {
            const token = localStorage.getItem("token");
            await fetch("".concat(BASE_URL, "/api/notification/mark-all"), {
                method: "PATCH",
                headers: {
                    Authorization: "Bearer ".concat(token)
                }
            });
            setNotifications((prev)=>prev.map((n)=>({
                        ...n,
                        read: true
                    })));
            setUnreadCount(0);
        } catch (e) {
            console.log(e);
        }
    };
    // DELETE ONE
    const deleteOne = async (id)=>{
        try {
            const token = localStorage.getItem("token");
            await fetch("".concat(BASE_URL, "/api/notification/").concat(id), {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer ".concat(token)
                }
            });
            setNotifications((prev)=>prev.filter((n)=>n._id !== id));
        } catch (e) {
            console.log(e);
        }
    };
    // DELETE ALL
    const deleteAll = async ()=>{
        try {
            const token = localStorage.getItem("token");
            await Promise.all(notifications.map((n)=>fetch("".concat(BASE_URL, "/api/notification/").concat(n._id), {
                    method: "DELETE",
                    headers: {
                        Authorization: "Bearer ".concat(token)
                    }
                })));
            setNotifications([]);
            setUnreadCount(0);
        } catch (e) {
            console.log(e);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border-slate-700 w-full bg-[rgba(242,242,242,1)] p-2",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-between items-center fixed top-0 right-[14px] border-b-2 w-[1272px] bg-[rgba(242,242,242,1)] p-3 shadow z-50",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-xl text-black font-semibold",
                    children: "Profile Details"
                }, void 0, false, {
                    fileName: "[project]/src/component/Profile details/Search.js",
                    lineNumber: 148,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-5 items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 w-[350px] shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                    className: "text-gray-600 cursor-pointer",
                                    size: 18,
                                    onClick: handleSearch
                                }, void 0, false, {
                                    fileName: "[project]/src/component/Profile details/Search.js",
                                    lineNumber: 154,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                    lineNumber: 159,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/Profile details/Search.js",
                            lineNumber: 153,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            ref: dropdownRef,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    onClick: handleBellClick,
                                    xmlns: "http://www.w3.org/2000/svg",
                                    width: "30",
                                    height: "30",
                                    fill: "#FFC107",
                                    viewBox: "0 0 24 24",
                                    className: "cursor-pointer",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M12 24c1.104 0 2-.897 2-2h-4c0 1.103.896 2 2 2zm6.707-5l1.293 1.293V21H4v-1.707L5.293 19H6v-7c0-3.309 2.691-6 6-6s6 2.691 6 6v7h.707zM18 18H6v-7c0-2.757 2.243-5 5-5s5 2.243 5 5v7z"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/Profile details/Search.js",
                                        lineNumber: 185,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/component/Profile details/Search.js",
                                    lineNumber: 176,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                unreadCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "absolute -top-1 -right-1 h-4 w-4 bg-red-600 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white",
                                    children: unreadCount
                                }, void 0, false, {
                                    fileName: "[project]/src/component/Profile details/Search.js",
                                    lineNumber: 190,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute right-0 mt-3 w-[330px] bg-white shadow-lg border rounded-lg p-3 z-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "font-semibold",
                                                    children: "Notifications"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/component/Profile details/Search.js",
                                                    lineNumber: 200,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: markAll,
                                                    className: "text-blue-600 text-sm",
                                                    children: "Mark all read"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/component/Profile details/Search.js",
                                                    lineNumber: 201,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/component/Profile details/Search.js",
                                            lineNumber: 199,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "max-h-[300px] overflow-y-auto",
                                            children: notifications.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-center py-3 text-gray-500",
                                                children: "No notifications"
                                            }, void 0, false, {
                                                fileName: "[project]/src/component/Profile details/Search.js",
                                                lineNumber: 208,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)) : notifications.map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-3 border-b flex justify-between items-start ".concat(!n.read ? "bg-yellow-50" : ""),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "font-semibold",
                                                                    children: n.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/component/Profile details/Search.js",
                                                                    lineNumber: 220,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-gray-600",
                                                                    children: n.message
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/component/Profile details/Search.js",
                                                                    lineNumber: 221,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-400 mt-1",
                                                                    children: new Date(n.createdAt).toLocaleString()
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/component/Profile details/Search.js",
                                                                    lineNumber: 222,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                !n.read && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>markAsRead(n._id),
                                                                    className: "text-blue-600 text-xs mt-1",
                                                                    children: "Mark as read"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/component/Profile details/Search.js",
                                                                    lineNumber: 227,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/component/Profile details/Search.js",
                                                            lineNumber: 219,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>deleteOne(n._id),
                                                            className: "text-red-500 text-xs",
                                                            children: "Delete"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/component/Profile details/Search.js",
                                                            lineNumber: 236,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, n._id, true, {
                                                    fileName: "[project]/src/component/Profile details/Search.js",
                                                    lineNumber: 213,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/Profile details/Search.js",
                                            lineNumber: 206,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        notifications.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: deleteAll,
                                            className: "w-full mt-2 py-2 text-red-600 text-sm border-t",
                                            children: "Delete All"
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/Profile details/Search.js",
                                            lineNumber: 248,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/component/Profile details/Search.js",
                                    lineNumber: 197,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/Profile details/Search.js",
                            lineNumber: 173,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/Profile details/Search.js",
                    lineNumber: 150,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/component/Profile details/Search.js",
            lineNumber: 146,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/component/Profile details/Search.js",
        lineNumber: 145,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Search, "djTI24vzeiAoaJjvT8Pq9t4tEvE=");
_c = Search;
const __TURBOPACK__default__export__ = Search;
var _c;
__turbopack_context__.k.register(_c, "Search");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/component/api/apiURL.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "API_URL": ()=>API_URL
});
const API_URL = "https://matrimonial-backend-7ahc.onrender.com";
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/component/Profile details/ProfileDetails.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$api$2f$apiURL$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/api/apiURL.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$rx$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/rx/index.mjs [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const ProfileCard = (param)=>{
    let { title, apiPath } = param;
    _s();
    const [textInput, setTextInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedState, setSelectedState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [stateList, setStateList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [options, setOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editText, setEditText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [editState, setEditState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const API_URL_DATA = "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$api$2f$apiURL$2e$js__$5b$client$5d$__$28$ecmascript$29$__["API_URL"], "/api/master/").concat(apiPath);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProfileCard.useEffect": ()=>{
            fetchOptions();
            if (apiPath === 'city') {
                fetchStates();
            }
        }
    }["ProfileCard.useEffect"], []);
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
            const res = await fetch("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$api$2f$apiURL$2e$js__$5b$client$5d$__$28$ecmascript$29$__["API_URL"], "/api/master/state"));
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
            await fetch("".concat(API_URL_DATA, "/").concat(id), {
                method: 'DELETE'
            });
            setOptions((prev)=>prev.filter((item)=>item._id !== id));
        } catch (err) {
            console.error('Error deleting option:', err);
        }
    };
    const startEdit = function(id, value) {
        let stateName = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : '';
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
            const res = await fetch("".concat(API_URL_DATA, "/").concat(id), {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border-1 border-black mt-[50px] p-3 rounded-xl shadow-sm bg-white w-full max-w-md mx-auto transition hover:shadow-md",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-xl font-bold text-gray-800 mb-4",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/component/Profile details/ProfileDetails.js",
                lineNumber: 292,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3 mb-3",
                children: [
                    apiPath === 'city' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: selectedState,
                        onChange: (e)=>setSelectedState(e.target.value),
                        className: "p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Select State"
                            }, void 0, false, {
                                fileName: "[project]/src/component/Profile details/ProfileDetails.js",
                                lineNumber: 300,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            stateList.map((state)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: (e)=>{
                            e.preventDefault();
                            addOption();
                        },
                        className: "flex gap-3 flex-row ",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-red-500 -mt-2",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/src/component/Profile details/ProfileDetails.js",
                                lineNumber: 327,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
            options.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-2",
                children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "",
                        children: editingId === option._id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: editText,
                                    onChange: (e)=>setEditText(e.target.value),
                                    className: "flex-1 p-2 border border-gray-300 rounded-md"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/Profile details/ProfileDetails.js",
                                    lineNumber: 348,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)),
                                apiPath === 'city' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: editState,
                                    onChange: (e)=>setEditState(e.target.value),
                                    className: "p-2 border border-gray-300 rounded-md",
                                    children: stateList.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
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
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-flex bg-[rgba(255,208,208,1)] items-center gap-2 p-1 justify-center shadow rounded border-1 border-green-400 overflow-hidden text-ellipsis whitespace-nowrap",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-800   font-medium",
                                    children: [
                                        option.value,
                                        " ",
                                        option.state ? "(".concat(option.state, ")") : ''
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/component/Profile details/ProfileDetails.js",
                                    lineNumber: 370,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: " flex gap-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>removeOption(option._id),
                                        className: "cursor-pointer text-black flex justify-center items-center bg-transparent ",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$rx$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["RxCross2"], {
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
_s(ProfileCard, "IgodnEXJRoL+Pv+ynL1Fglog8XY=");
_c = ProfileCard;
const __TURBOPACK__default__export__ = ProfileCard;
var _c;
__turbopack_context__.k.register(_c, "ProfileCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/pages/profileDetails/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>ProfilePage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$Profile__details$2f$Search$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/Profile details/Search.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$Profile__details$2f$ProfileDetails$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/Profile details/ProfileDetails.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
    _s();
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const filtered = profileTitles.filter((item)=>item.label.toLowerCase().includes(searchTerm));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$Profile__details$2f$Search$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                onSearch: setSearchTerm
            }, void 0, false, {
                fileName: "[project]/pages/profileDetails/index.js",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen bg-gray-100 p-8 mt-[10px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                    children: filtered.length > 0 ? filtered.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$Profile__details$2f$ProfileDetails$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                            title: item.label,
                            apiPath: item.api
                        }, idx, false, {
                            fileName: "[project]/pages/profileDetails/index.js",
                            lineNumber: 38,
                            columnNumber: 15
                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
_s(ProfilePage, "+YdqPTpSlp4r5CWiFEQiF/UjThM=");
_c = ProfilePage;
var _c;
__turbopack_context__.k.register(_c, "ProfilePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/profileDetails/index.js [client] (ecmascript)\" } [client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const PAGE_PATH = "/profileDetails";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/profileDetails/index.js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/profileDetails/index.js\" }": ((__turbopack_context__) => {
"use strict";

var { m: module } = __turbopack_context__;
{
__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/profileDetails/index.js [client] (ecmascript)\" } [client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__44635cd6._.js.map