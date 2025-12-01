"use client";

import React, { useEffect, useRef, useState } from "react";

// ⭐ SOCKET IMPORT
import { connectSocket, disconnectSocket, getSocket } from "@/src/lib/socket";

const Search = () => {
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);
  const BASE_URL = "https://matrimonial-backend-7ahc.onrender.com";

  /* -----------------------------------------
        1) LOAD ADMIN PREF → CONNECT SOCKET
  ----------------------------------------- */
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
    } catch (error) {
      console.log("Admin Pref Error:", error);
    }
  };

  useEffect(() => {
    loadAdminPrefs();
  }, []);

  /* -----------------------------------------
      CLICK OUTSIDE TO CLOSE DROPDOWN
  ----------------------------------------- */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* -----------------------------------------
      FETCH NOTIFICATIONS (API)
  ----------------------------------------- */
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

  /* -----------------------------------------
      SOCKET REAL-TIME LISTENER
  ----------------------------------------- */
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    console.log("🔌 Socket listener attached");

    socket.on("new-notification", (data) => {
      console.log("🔔 LIVE NOTIFICATION RECEIVED:", data);

      setNotifications((prev) => [data, ...prev]);
      setUnread((u) => u + 1);
    });

    return () => {
      const socket = getSocket();
      if (socket) socket.off("new-notification");
    };
  }, []);

  /* -----------------------------------------
      MARK READ
  ----------------------------------------- */
  const markRead = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`${BASE_URL}/api/notification/mark-read/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });

    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, read: true } : n))
    );

    setUnread((prev) => prev - 1);
  };

  /* -----------------------------------------
      MARK ALL READ
  ----------------------------------------- */
  const markAll = async () => {
    const token = localStorage.getItem("token");

    await fetch(`${BASE_URL}/api/notification/mark-all`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });

    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnread(0);
  };

  /* -----------------------------------------
      DELETE ONE
  ----------------------------------------- */
  const deleteOne = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`${BASE_URL}/api/notification/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setNotifications((prev) => prev.filter((n) => n._id !== id));
  };

  /* -----------------------------------------
      DELETE ALL
  ----------------------------------------- */
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
    setUnread(0);
  };

  /* -----------------------------------------
      BELL CLICK → AUTO READ + RED DOT REMOVE
  ----------------------------------------- */
  const handleBellClick = () => {
    const newState = !open;
    setOpen(newState);

    if (newState) {
      setUnread(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }
  };

  /* -----------------------------------------
      UI RETURN
  ----------------------------------------- */
  return (
    <div
      className="bg-gray-100 px-10 py-4 shadow-sm border-b fixed top-0 z-50 flex items-center justify-between"
      style={{ left: "250px", width: "calc(100% - 250px)" }}
    >
      <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>

      <div className="flex items-center gap-5">
        <div className="relative" ref={dropdownRef}>
          <div className="cursor-pointer" onClick={handleBellClick}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#FFC107">
              <path d="M12 24c1.104 0 2-.897 2-2h-4c0 1.103.896 2 2 2zm6.707-5l1.293 1.293V21H4v-1.707L5.293 19H6v-7c0-3.309 2.691-6 6-6s6 2.691 6 6v7h.707zM18 18H6v-7c0-2.757 2.243-5 5-5s5 2.243 5 5v7z"/>
            </svg>

            {unread > 0 && (
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            )}
          </div>

          {open && (
            <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl border rounded-lg max-h-96 overflow-y-auto p-3">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-[16px]">Notifications</h3>
                <button className="text-blue-600 text-sm" onClick={markAll}>
                  Mark all read
                </button>
              </div>

              {notifications.length === 0 ? (
                <p className="p-4 text-sm text-gray-500 text-center">
                  No notifications
                </p>
              ) : (
                notifications.map((n) => (
                  <div key={n._id} className="border-b pb-3 mb-3">
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-[15px] capitalize">
                        {n.title}
                      </p>
                      <button
                        onClick={() => deleteOne(n._id)}
                        className="text-red-600 text-xs"
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
                    className="w-full py-2 text-red-600 font-semibold text-sm"
                    onClick={deleteAll}
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
