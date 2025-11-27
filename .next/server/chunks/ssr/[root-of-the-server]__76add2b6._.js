module.exports = {

"[project]/pages/profileDetails/index.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// pages/api/profile-search.js
__turbopack_context__.s({
    "default": ()=>handler
});
function handler(req, res) {
    // same list as your frontend
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
    const { query = "" } = req.query;
    const q = String(query || "").trim().toLowerCase();
    if (!q) {
        // return all when no query
        res.status(200).json(profileTitles);
        return;
    }
    const filtered = profileTitles.filter((item)=>{
        return item.label.toLowerCase().includes(q) || item.api && item.api.toLowerCase().includes(q);
    });
    res.status(200).json(filtered);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__76add2b6._.js.map