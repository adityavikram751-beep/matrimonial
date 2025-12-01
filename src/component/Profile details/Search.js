"use client";

import React, { useEffect, useRef, useState } from "react";
import { Search as SearchIcon } from "lucide-react";

// ⭐ SOCKET IMPORT
import { connectSocket, disconnectSocket, getSocket } from "@/src/lib/socket";

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const BASE_URL = "https://matrimonial-backend-7ahc.onrender.com";

  /* --------------------------------------------
     1) ADMIN PREF → CONNECT OR DISCONNECT SOCKET
  -------------------------------------------- */
  const loadAdminPrefs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/admin/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();

      if (json.success) {
        const admin = json.data;

        if (admin.notifications === true) {
          connectSocket(admin._id);
        } else {
          disconnectSocket();
        }
      }
    } catch (err) {
      console.log("Admin Pref error:", err);
    }
  };

  useEffect(() => {
    loadAdminPrefs();
  }, []);

  /* --------------------------------------------
     2) FETCH NOTIFICATIONS (API)
  -------------------------------------------- */
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/api/notification/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (data.success) {
        const list = data.data.reverse();
        setNotifications(list);
        setUnreadCount(list.filter((n) => !n.read).length);
      }
    } catch (error) {
      console.log("Fetch Notification Error:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  /* --------------------------------------------
     3) REAL-TIME NOTIFICATION SOCKET LISTENER
  -------------------------------------------- */
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    console.log("🟢 Profile Topbar — Real-time listener active");

    socket.on("new-notification", (data) => {
      console.log("🔔 REAL-TIME NOTIFICATION:", data);

      setNotifications((prev) => [data, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      const socket = getSocket();
      if (socket) socket.off("new-notification");
    };
  }, []);

  /* --------------------------------------------
     SEARCH HANDLER
  -------------------------------------------- */
  const handleSearch = () => onSearch(searchQuery.toLowerCase());
  const handleKeyDown = (e) => e.key === "Enter" && handleSearch();

  /* --------------------------------------------
     CLICK OUTSIDE → CLOSE DROPDOWN
  -------------------------------------------- */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* --------------------------------------------
     AUTO READ ON BELL CLICK
  -------------------------------------------- */
  const handleBellClick = () => {
    const newOpen = !open;
    setOpen(newOpen);

    if (newOpen) {
      setUnreadCount(0);

      // frontend mark-read
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read: true }))
      );
    }
  };

  /* --------------------------------------------
     MARK ONE READ
  -------------------------------------------- */
  const markAsRead = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`${BASE_URL}/api/notification/mark-read/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });

    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, read: true } : n))
    );

    setUnreadCount((prev) => prev - 1);
  };

  /* --------------------------------------------
     MARK ALL READ
  -------------------------------------------- */
  const markAll = async () => {
    const token = localStorage.getItem("token");

    await fetch(`${BASE_URL}/api/notification/mark-all`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });

    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  /* --------------------------------------------
     DELETE ONE
  -------------------------------------------- */
  const deleteOne = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`${BASE_URL}/api/notification/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setNotifications((prev) => prev.filter((n) => n._id !== id));
  };

  /* --------------------------------------------
     DELETE ALL
  -------------------------------------------- */
  const deleteAll = async () => {
    const token = localStorage.getItem("token");

    await Promise.all(
      notifications.map((n) =>
        fetch(`${BASE_URL}/api/notification/${n._id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        })
      )
    );

    setNotifications([]);
    setUnreadCount(0);
  };

  return (
    <div className="border-slate-700 w-full bg-[rgba(242,242,242,1)] p-2">
      <div className="flex justify-between items-center fixed top-0 right-[14px] border-b-2 w-[1272px] bg-[rgba(242,242,242,1)] p-3 shadow z-50">
        
        <h1 className="text-xl text-black font-semibold">Profile Details</h1>

        <div className="flex gap-5 items-center">

          {/* SEARCH BAR */}
          <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 w-[350px] shadow-sm">
            <SearchIcon
              className="text-gray-600 cursor-pointer"
              size={18}
              onClick={handleSearch}
            />
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 w-full outline-none text-sm bg-transparent"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onSearch(e.target.value.toLowerCase());
              }}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* NOTIFICATION ICON */}
          <div className="relative" ref={dropdownRef}>
            <svg
              onClick={handleBellClick}
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="#FFC107"
              viewBox="0 0 24 24"
              className="cursor-pointer"
            >
              <path d="M12 24c1.104 0 2-.897 2-2h-4c0 1.103.896 2 2 2zm6.707-5l1.293 1.293V21H4v-1.707L5.293 19H6v-7c0-3.309 2.691-6 6-6s6 2.691 6 6v7h.707zM18 18H6v-7c0-2.757 2.243-5 5-5s5 2.243 5 5v7z"/>
            </svg>

            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-600 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">
                {unreadCount}
              </span>
            )}

            {/* DROPDOWN */}
            {open && (
              <div className="absolute right-0 mt-3 w-[330px] bg-white shadow-lg border rounded-lg p-3 z-50">

                <div className="flex justify-between mb-2">
                  <h2 className="font-semibold">Notifications</h2>
                  <button onClick={markAll} className="text-blue-600 text-sm">
                    Mark all read
                  </button>
                </div>

                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="text-center py-3 text-gray-500">
                      No notifications
                    </p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n._id}
                        className={`p-3 border-b flex justify-between items-start ${
                          !n.read ? "bg-yellow-50" : ""
                        }`}
                      >
                        <div>
                          <h3 className="font-semibold">{n.title}</h3>
                          <p className="text-sm text-gray-600">{n.message}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(n.createdAt).toLocaleString()}
                          </p>

                          {!n.read && (
                            <button
                              onClick={() => markAsRead(n._id)}
                              className="text-blue-600 text-xs mt-1"
                            >
                              Mark as read
                            </button>
                          )}
                        </div>

                        <button
                          onClick={() => deleteOne(n._id)}
                          className="text-red-500 text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {notifications.length > 0 && (
                  <button
                    onClick={deleteAll}
                    className="w-full mt-2 py-2 text-red-600 text-sm border-t"
                  >
                    Delete All
                  </button>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
