'use client';

import AnalyticsChart from '@/src/component/dashboard/AnalyticsChart';
import TopSection from '@/src/component/dashboard/TopSection';
import UserTable from '@/src/component/dashboard/UserTable';
import useAuthGuard from '@/utils/withAuth';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import socket from '@/src/lib/socket';

const Index = () => {
  useAuthGuard();

  const placeholders = [
    'Search By User Name',
    'Search By User ID',
    'Search By User Mobile'
  ];

  const [index, setIndex] = useState(0);

  // 🔔 NOTIFICATION STATES
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);
  const BASE_URL = 'https://matrimonial-backend-7ahc.onrender.com';

  // ROTATING PLACEHOLDER
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % placeholders.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // CLICK OUTSIDE → CLOSE DROPDOWN
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // FETCH NOTIFICATIONS (API)
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`${BASE_URL}/api/notification/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();

      if (data.success) {
        const list = data.data.reverse();
        setNotifications(list);
        setUnread(list.filter(n => !n.read).length);
      }
    } catch (err) {
      console.log('Fetch Notifications Error:', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // SOCKET REAL-TIME
  useEffect(() => {
    socket.on('new-notification', (data) => {
      setNotifications(prev => [data, ...prev]);
      setUnread(prev => prev + 1);
    });

    return () => socket.off('new-notification');
  }, []);

  // MARK READ
  const markRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${BASE_URL}/api/notification/mark-read/${id}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });

      setNotifications(prev =>
        prev.map(n => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (e) {
      console.log(e);
    }
  };

  // MARK ALL READ
  const markAll = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${BASE_URL}/api/notification/mark-all`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });

      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnread(0);
    } catch (e) {
      console.log(e);
    }
  };

  // DELETE ONE
  const deleteOne = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${BASE_URL}/api/notification/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      setNotifications(prev => prev.filter(n => n._id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  // DELETE ALL
  const deleteAll = async () => {
    try {
      const token = localStorage.getItem('token');
      const all = notifications;

      await Promise.all(
        all.map(n =>
          fetch(`${BASE_URL}/api/notification/${n._id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
          })
        )
      );

      setNotifications([]);
      setUnread(0);
    } catch (e) {
      console.log(e);
    }
  };

  // 🔥 BELL CLICK — remove red dot + auto mark read
  const handleBellClick = () => {
    const newOpen = !open;
    setOpen(newOpen);

    if (newOpen) {
      // remove red dot
      setUnread(0);

      // auto-mark all unread as read
      notifications.forEach((n) => {
        if (!n.read) markRead(n._id);
      });
    }
  };

  return (
    <div className="flex w-full">

      {/* SIDEBAR */}
      <div className="fixed top-0 left-0 h-full w-[250px] bg-white shadow-md border-r p-4"></div>

      {/* TOP BAR */}
      <div
        className="
          fixed top-0 left-[250px]
          w-[calc(100%-250px)]
          h-[65px]
          bg-[#F7F7F7] border-b shadow-sm
          flex items-center justify-between
          px-10 z-50
        "
      >
        {/* TITLE */}
        <h1 className="text-[28px] font-extrabold text-black">Dashboard</h1>

        {/* RIGHT → NOTIFICATION */}
        <div className="flex items-center space-x-6">

          {/* NOTIFICATION ICON */}
          <div className="relative cursor-pointer" ref={dropdownRef}>
            <Image
              src="/notification.png"
              width={28}
              height={28}
              alt="bell"
              onClick={handleBellClick}
            />

            {/* RED DOT */}
            {unread > 0 && (
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
            )}

            {/* DROPDOWN */}
            {open && (
              <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl border rounded-lg max-h-96 overflow-y-auto p-3">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-[16px]">Notifications</h3>
                  <button onClick={markAll} className="text-blue-600 text-sm">
                    Mark all read
                  </button>
                </div>

                {/* LIST */}
                {notifications.length === 0 ? (
                  <p className="p-4 text-sm text-gray-500 text-center">
                    No notifications
                  </p>
                ) : (
                  notifications.map((n) => (
                    <div key={n._id} className="border-b pb-3 mb-3">

                      {/* TITLE + DELETE */}
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

                      {/* MESSAGE */}
                      <p className="text-gray-600 text-[13px] mt-1">{n.message}</p>

                      {/* DATE */}
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
      </div>

      {/* MAIN CONTENT */}
      <div className=" mt-[75px] w-full px-6">
        <TopSection />
        <AnalyticsChart />
        <UserTable />
      </div>

    </div>
  );
};

export default Index;
