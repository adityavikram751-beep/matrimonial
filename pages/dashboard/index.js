'use client';

import AnalyticsChart from '@/src/component/dashboard/AnalyticsChart';
import TopSection from '@/src/component/dashboard/TopSection';
import UserTable from '@/src/component/dashboard/UserTable';
import useAuthGuard from '@/utils/withAuth';
import React, { useState, useEffect, useRef } from 'react';
import socket from '@/src/lib/socket';

const Index = () => {
  useAuthGuard();

  // Placeholders — rotate
  const placeholders = ['Search By User Name', 'Search By User ID', 'Search By User Mobile'];
  const [index, setIndex] = useState(0);

  // Notification states
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);
  const BASE_URL = "https://matrimonial-backend-7ahc.onrender.com";

  // Placeholder rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % placeholders.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Click outside → close dropdown
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Fetch notifications (API)
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/api/notification/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();

      if (data.success) {
        const list = data.data.reverse();
        setNotifications(list);
      }
    } catch (err) {
      console.log("Notification fetch error:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Real-time socket notifications
  useEffect(() => {
    socket.on("new-notification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => socket.off("new-notification");
  }, []);

  // Mark one read
  const markRead = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${BASE_URL}/api/notification/mark-read/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` }
      });

      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (e) {
      console.log(e);
    }
  };

  // Mark all read
  const markAll = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${BASE_URL}/api/notification/mark-all`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` }
      });

      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (e) {
      console.log(e);
    }
  };

  // Delete one
  const deleteOne = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${BASE_URL}/api/notification/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  // Delete all
  const deleteAll = async () => {
    try {
      const token = localStorage.getItem("token");

      await Promise.all(
        notifications.map((n) =>
          fetch(`${BASE_URL}/api/notification/${n._id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          })
        )
      );

      setNotifications([]);
    } catch (e) {
      console.log(e);
    }
  };

  // BELL CLICK — auto-read + red dot remove
  const handleBellClick = () => {
    const newOpen = !open;
    setOpen(newOpen);

    if (newOpen) {
      // 1) Remove red dot (mark all read in UI)
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read: true }))
      );
    }
  };

  // Red dot logic (true if any unread)
  const showRedDot = notifications.some((n) => !n.read);

  return (
    <div className="flex w-full">

      {/* SIDEBAR */}
      <div className="fixed top-0 left-0 h-full w-[250px] bg-white shadow-md border-r p-4"></div>

      {/* TOP BAR */}
      <div
        className="fixed top-0 left-[250px] w-[calc(100%-250px)] h-[65px] bg-[#F7F7F7] border-b shadow-sm flex items-center justify-between px-10 z-50"
      >
        {/* TITLE */}
        <h1 className="text-[28px] font-extrabold text-black">Dashboard</h1>

        {/* RIGHT → NOTIFICATION ICON */}
        <div className="relative cursor-pointer" ref={dropdownRef}>

          {/* 🔔 SVG BELL ICON */}
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

          {/* 🔴 RED DOT */}
          {showRedDot && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-600 rounded-full border border-white"></span>
          )}

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl border rounded-lg max-h-96 overflow-y-auto p-3">

              {/* HEADER */}
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-[16px]">Notifications</h3>
                <button onClick={markAll} className="text-blue-600 text-sm">Mark all read</button>
              </div>

              {/* LIST */}
              {notifications.length === 0 ? (
                <p className="p-4 text-sm text-gray-500 text-center">No notifications</p>
              ) : (
                notifications.map((n) => (
                  <div key={n._id} className="border-b pb-3 mb-3">
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-[15px] capitalize">{n.title}</p>
                      <button
                        onClick={() => deleteOne(n._id)}
                        className="text-red-600 text-xs"
                      >
                        Delete
                      </button>
                    </div>

                    <p className="text-gray-600 text-[13px] mt-1">{n.message}</p>
                    <p className="text-gray-500 text-[11px] mt-1">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
              )}

              {/* DELETE ALL */}
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

      {/* MAIN CONTENT */}
      <div className="mt-[75px] w-full px-6">
        <TopSection />
        <AnalyticsChart />
        <UserTable />
      </div>

    </div>
  );
};

export default Index;
