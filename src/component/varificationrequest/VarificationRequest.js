"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Search as SearchIcon, Eye, Loader2 } from "lucide-react";
import Search from "@/src/component/varificationrequest/Search";
import { API_URL } from "../api/apiURL";

/* USER AVATAR COMPONENT */
const UserAvatar = ({ user }) => {
  const initials =
    (user.firstName?.[0] || "").toUpperCase() +
    (user.lastName?.[0] || "").toUpperCase();

  return (
    <div className="flex items-center gap-3">
      {user.profileImage ? (
        <img
          src={user.profileImage}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold">
          {initials}
        </div>
      )}

      <div>
        <p className="font-semibold text-gray-900 text-sm">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-xs text-gray-500">
          #{user.id || user._id?.slice(-6)} / {user.gender || "Not Mentioned"}
        </p>
      </div>
    </div>
  );
};

/* STATUS COLORS */
const getStatusDot = (status) =>
  ({
    approved: "bg-green-500",
    pending: "bg-yellow-500",
    reject: "bg-red-500",
  }[status] || "bg-gray-400");

const getStatusText = (status) =>
  ({
    approved: "text-green-600",
    pending: "text-yellow-600",
    reject: "text-red-600",
  }[status] || "text-gray-600");

/* DOCUMENT POPUP */
const DocumentPopup = ({ user, onClose }) => {
  if (!user) return null;

  const closeBg = (e) => {
    if (e.target.id === "popup-bg") onClose();
  };

  return (
    <div
      id="popup-bg"
      onClick={closeBg}
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-[900]"
    >
      <div className="bg-white w-[260px] rounded-xl shadow-xl p-4 animate-fadeIn">
        <h3 className="text-center font-semibold text-sm mb-3">
          Documents Uploaded
        </h3>

        <div className="max-h-[300px] overflow-y-auto space-y-3">
          {user.adhaarCard?.frontImage && (
            <div className="border rounded-xl shadow p-2">
              <img
                src={user.adhaarCard.frontImage}
                className="w-full rounded-md"
              />
              <p className="text-center text-xs mt-1 font-medium">
                Aadhar Front
              </p>
            </div>
          )}

          {user.adhaarCard?.backImage && (
            <div className="border rounded-xl shadow p-2">
              <img
                src={user.adhaarCard.backImage}
                className="w-full rounded-md"
              />
              <p className="text-center text-xs mt-1 font-medium">
                Aadhar Back
              </p>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-black text-white rounded-md py-1.5 mt-3 text-xs"
        >
          Close
        </button>
      </div>
    </div>
  );
};

/* MAIN COMPONENT */
export default function UserModerationDashboard() {
  const [users, setUsers] = useState([]);
  const [popupUser, setPopupUser] = useState(null);

  const [search, setSearch] = useState("");
  const [topSearch, setTopSearch] = useState("");
  const [tableSearch, setTableSearch] = useState("");

  const [status, setStatus] = useState("Status");
  const [gender, setGender] = useState("Gender");

  const [loading, setLoading] = useState(true);

  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5; // ⭐ per page 5

  const [stats, setStats] = useState({
    totalRequestsThisWeek: 0,
    pendingVerification: 0,
    approvedThisWeek: 0,
    rejectedDueToMismatch: 0,
  });

  /* FETCH USERS & STATS */
  useEffect(() => {
    const load = async () => {
      try {
        // USERS
        const res = await fetch(`${API_URL}/admin/user-verify`);
        const json = await res.json();
        setUsers(json.data);

        // TOP 4 BOX STATS
        const statsRes = await fetch(
          "https://matrimonial-backend-7ahc.onrender.com/admin/WeeklyRequestStats"
        );
        const statsJson = await statsRes.json();
        setStats(statsJson.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  /* SORTING */
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  /* FILTER + SORT */
  const filtered = useMemo(() => {
    let data = [...users];

    if (search) {
      data = data.filter(
        (u) =>
          u.firstName?.toLowerCase().includes(search.toLowerCase()) ||
          u.lastName?.toLowerCase().includes(search.toLowerCase()) ||
          u._id?.includes(search)
      );
    }

    if (status !== "Status") {
      data = data.filter((u) => u.adminApprovel === status);
    }

    if (gender !== "Gender") {
      data = data.filter((u) => u.gender === gender);
    }

    if (sortField === "name") {
      data.sort((a, b) =>
        sortDirection === "asc"
          ? `${a.firstName} ${a.lastName}`.localeCompare(
              `${b.firstName} ${b.lastName}`
            )
          : `${b.firstName} ${b.lastName}`.localeCompare(
              `${a.firstName} ${a.lastName}`
            )
      );
    }

    if (sortField === "date") {
      data.sort((a, b) =>
        sortDirection === "asc"
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    return data;
  }, [users, search, status, gender, sortField, sortDirection]);

  /* PAGINATION SLIDING WINDOW */
  const totalPages = Math.ceil(filtered.length / perPage);

  const pageWindow = 5;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = startPage + pageWindow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - pageWindow + 1);
  }

  const visiblePages = [];
  for (let i = startPage; i <= endPage; i++) visiblePages.push(i);

  const pageData = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="px-6 py-6">
      {/* TOP SEARCH */}
      <Search
        setSearch={setSearch}
        topSearch={topSearch}
        setTopSearch={setTopSearch}
      />

      <div className="pt-[px]">
        {/* TOP 4 CARDS WITH LIVE API */}
        <div className="flex justify-center gap-20 mb-10">
          {[
            ["Total Request This Week", stats.totalRequestsThisWeek],
            ["Pending Verification", stats.pendingVerification],
            ["Approved This Week", stats.approvedThisWeek],
            ["Rejected Due To Mismatch", stats.rejectedDueToMismatch],
          ].map(([label, val]) => (
            <div
              key={label}
              className="w-[200px] bg-white border p-6 rounded-2xl shadow"
            >
              <p className="text-base font-semibold text-center">{label}</p>
              <h2 className="text-3xl font-black text-center mt-2">{val}</h2>
            </div>
          ))}
        </div>

        {/* MAIN TABLE */}
        <div className="max-w-7xl mx-auto p-5 border rounded-2xl bg-white shadow">
          {/* FILTER BAR */}
          <div className="bg-gray-100 border rounded-xl p-3 flex justify-between items-center">
            <div className="relative bg-white w-[300px]">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
              <input
                placeholder="Search By User ID"
                value={tableSearch}
                onChange={(e) => {
                  setTableSearch(e.target.value);
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm"
              />
            </div>

            <div className="flex gap-3">
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="border px-3 py-2 bg-gray-200 rounded-md"
              >
                <option>Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="reject">Rejected</option>
              </select>

              <select
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                  setCurrentPage(1);
                }}
                className="border px-3 py-2 bg-gray-200 rounded-md"
              >
                <option>Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto mt-5 rounded-xl border">
            {loading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="animate-spin w-6 h-6" />
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F7F7F7] text-gray-700">
                    <th className="px-4 py-3 text-left font-semibold border-b">
                      <button
                        onClick={() => handleSort("name")}
                        className="flex items-center gap-1"
                      >
                        Reported User
                        {sortField === "name"
                          ? sortDirection === "asc"
                            ? "▲"
                            : "▼"
                          : "▲"}
                      </button>
                    </th>

                    <th className="px-4 py-3 text-left font-semibold border-b">
                      <button
                        onClick={() => handleSort("date")}
                        className="flex items-center gap-1"
                      >
                        Report Date
                        {sortField === "date"
                          ? sortDirection === "asc"
                            ? "▲"
                            : "▼"
                          : "▲"}
                      </button>
                    </th>

                    <th className="px-4 py-3 text-left font-semibold border-b">
                      Documents Submitted
                    </th>

                    <th className="px-4 py-3 text-left font-semibold border-b">
                      Status
                    </th>

                    <th className="px-4 py-3 text-left font-semibold border-b">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {pageData.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <UserAvatar user={user} />
                      </td>

                      <td className="px-4 py-3">
                        {new Date(user.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </td>

                      <td className="px-4 py-3">
                        {user.adhaarCard?.frontImage || user.adhaarCard?.backImage
                          ? "Aadhar Card"
                          : "No Document Submitted"}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-3 h-3 rounded-full ${getStatusDot(
                              user.adminApprovel
                            )}`}
                          ></span>
                          <span className={getStatusText(user.adminApprovel)}>
                            {user.adminApprovel}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <button
                          onClick={() => setPopupUser(user)}
                          className="flex items-center gap-1 text-blue-700"
                        >
                          <Eye size={14} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center mt-4 items-center gap-3">
            {/* PREV */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="text-gray-700 disabled:opacity-40"
            >
              ‹ Prev
            </button>

            {/* SLIDING PAGE NUMBERS */}
            <div className="flex items-center gap-2 text-sm">
              {visiblePages.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`${
                    currentPage === page
                      ? "font-bold text-black underline"
                      : "text-gray-600"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* NEXT */}
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
              className="text-gray-700 disabled:opacity-40"
            >
              Next ›
            </button>
          </div>
        </div>

        {/* POPUP */}
        {popupUser && (
          <DocumentPopup user={popupUser} onClose={() => setPopupUser(null)} />
        )}
      </div>
    </div>
  );
}
