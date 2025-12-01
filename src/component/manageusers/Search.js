"use client";

import React, { useEffect, useRef, useState } from "react";

// ⭐ SOCKET SYSTEM IMPORT
import { connectSocket, disconnectSocket, getSocket } from "@/src/lib/socket";

const Search = () => {
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);
  const BASE_URL = "https://matrimonial-backend-7ahc.onrender.com";

  /* -------------------------------
      1) ADMIN PREF → CONNECT SOCKET
  ------------------------------- */
  const loadAdminPrefs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/admin/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (data.success) {
        const admin = data.data;

        if (admin.notifications === true) {
          connectSocket(admin._id);
        } else {
          disconnectSocket();
        }
      }
    } catch (err) {
      console.log("Admin Pref Error:", err);
    }
  };

  useEffect(() => {
    loadAdminPrefs();
  }, []);

  /* -------------------------------
      2) CLICK OUTSIDE CLOSE
  ------------------------------- */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* -------------------------------
      3) FETCH NOTIFICATIONS
  ------------------------------- */
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
        setUnread(list.filter((n) => !n.read).length);
      }
    } catch (err) {
      console.log("Fetch notification error:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  /* -------------------------------
      4) REAL-TIME NOTIFICATION SOCKET
  ------------------------------- */
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    console.log("🔌 Real-time listener active");

    socket.on("new-notification", (data) => {
      console.log("🔔 LIVE NOTIFICATION:", data);

      setNotifications((prev) => [data, ...prev]);
      setUnread((prev) => prev + 1);
    });

    return () => {
      const socket = getSocket();
      if (socket) socket.off("new-notification");
    };
  }, []);

  /* -------------------------------
      MARK ONE READ
  ------------------------------- */
  const markRead = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${BASE_URL}/api/notification/mark-read/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );

      setUnread((prev) => prev - 1);
    } catch (err) {
      console.log(err);
    }
  };

  /* -------------------------------
      MARK ALL READ
  ------------------------------- */
  const markAll = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${BASE_URL}/api/notification/mark-all`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnread(0);
    } catch (err) {
      console.log(err);
    }
  };

  /* -------------------------------
      DELETE ONE
  ------------------------------- */
  const deleteOne = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${BASE_URL}/api/notification/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotifications((prev) => prev.filter((n) => n._id !== id));
      setUnread(notifications.filter((n) => !n.read && n._id !== id).length);
    } catch (err) {
      console.log(err);
    }
  };

  /* -------------------------------
      DELETE ALL
  ------------------------------- */
  const deleteAll = async () => {
    try {
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
      setUnread(0);
    } catch (err) {
      console.log(err);
    }
  };

  /* -------------------------------
      BELL CLICK
  ------------------------------- */
  const handleBellClick = () => {
    const newOpen = !open;
    setOpen(newOpen);

    if (newOpen) {
      setUnread(0);
      // Frontend auto-read
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }
  };

  return (
    <div
      className="bg-gray-100 px-6 py-4 shadow-sm border-b fixed top-0 z-50 flex items-center justify-between"
      style={{
        left: "250px",
        width: "calc(100% - 250px)",
      }}
    >
      <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>

      <div className="flex items-center gap-5">

        {/* NOTIFICATION BELL */}
        <div className="relative" ref={dropdownRef}>
          <div className="cursor-pointer" onClick={handleBellClick}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#FFC107">
              <path d="M12 24c1.104 0 2-.897 2-2h-4c0 1.103.896 2 2 2zm6.707-5l1.293 1.293V21H4v-1.707L5.293 19H6v-7c0-3.309 2.691-6 6-6s6 2.691 6 6v7h.707zM18 18H6v-7c0-2.757 2.243-5 5-5s5 2.243 5 5v7z"/>
            </svg>

            {unread > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 text-[10px] text-white bg-red-600 rounded-full flex items-center justify-center">
                {unread}
              </span>
            )}
          </div>

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl border rounded-lg max-h-96 overflow-y-auto p-3">

              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">Notifications</h3>
                <button onClick={markAll} className="text-blue-600 text-sm">
                  Mark all read
                </button>
              </div>

              {notifications.length === 0 ? (
                <p className="p-4 text-sm text-gray-500">No notifications</p>
              ) : (
                notifications.map((n) => (
                  <div key={n._id} className="border-b pb-3 mb-3">
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-[15px] capitalize">
                        {n.title}
                      </p>
                      <button
                        onClick={() => deleteOne(n._id)}
                        className="text-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </div>

                    <p className="text-gray-600 text-[13px] mt-1">
                      {n.message}
                    </p>

                    <p className="text-gray-500 text-[11px] mt-1">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
              )}

              {notifications.length > 0 && (
                <>
                  <hr className="border-gray-300 my-2" />
                  <button
                    onClick={deleteAll}
                    className="w-full py-2 text-red-600 font-semibold text-sm"
                  >
                    Delete All
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
