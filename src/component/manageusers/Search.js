"use client";

import React, { useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import socket from "@/src/lib/socket";

const Search = () => {
  const [topSearch, setTopSearch] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("Socket Status:", socket.connected);

    socket.on("connect", () => {
      console.log("Connected to Socket.io");
    });

    // Listen for real-time notifications
    socket.on("new-notification", (data) => {
      console.log("New Notification Received:", data);

      setNotifications((prev) => [data, ...prev]);
      setCount((prev) => prev + 1);
    });

    return () => {
      socket.off("new-notification");
    };
  }, []);

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

        {/* ------------ 🔔 Notification Icon ---------------- */}
        <div className="relative">
          <div
            className="cursor-pointer"
            onClick={() => {
              setOpen(!open);
              setCount(0); // badge reset
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#FFC107">
              <path d="M12 24c1.104 0 2-.897 2-2h-4c0 1.103.896 2 2 2zm6.707-5l1.293 1.293V21H4v-1.707L5.293 19H6v-7c0-3.309 2.691-6 6-6s6 2.691 6 6v7h.707zM18 18H6v-7c0-2.757 2.243-5 5-5s5 2.243 5 5v7z"/>
            </svg>

            {/* 🔴 Badge */}
            {count > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center text-[10px] text-white bg-red-600 rounded-full">
                {count}
              </span>
            )}
          </div>

          {/* ------------ 🔽 Notification Dropdown ---------------- */}
          {open && (
            <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl border rounded-lg max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="p-4 text-gray-500 text-sm">No Notifications</p>
              ) : (
                notifications.map((n, i) => (
                  <div
                    key={i}
                    className="p-3 border-b hover:bg-gray-100 cursor-pointer"
                  >
                    <p className="font-semibold">{n.message}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(n.time).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Search;
