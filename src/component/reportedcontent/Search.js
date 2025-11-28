import React, { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";

const Search = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const BASE_URL = "https://matrimonial-backend-7ahc.onrender.com";

  // -------------------------------
  // CLICK OUTSIDE TO CLOSE
  // -------------------------------
  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // -------------------------------
  // FETCH NOTIFICATIONS (FAST)
  // -------------------------------
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/api/notification/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (data.success) {
        // NO DELAY — SET DIRECTLY
        setNotifications(data.data.reverse());
      }
    } catch (error) {
      console.log("Fetch Notification Error:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // -------------------------------
  // MARK SINGLE READ (FAST)
  // -------------------------------
  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${BASE_URL}/api/notification/mark-read/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      // INSTANT UI UPDATE (NO EXTRA FETCH)
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, read: true } : n
        )
      );
    } catch (e) {
      console.log("Mark Read Error:", e);
    }
  };

  // -------------------------------
  // MARK ALL READ (SUPER FAST)
  // -------------------------------
  const markAll = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${BASE_URL}/api/notification/mark-all`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      // INSTANT UPDATE
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read: true }))
      );
    } catch (e) {
      console.log("Mark All Error:", e);
    }
  };

  // -------------------------------
  // DELETE ONE (FAST)
  // -------------------------------
  const deleteOne = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${BASE_URL}/api/notification/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      // FAST REMOVE FROM UI
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (e) {
      console.log("Delete Error:", e);
    }
  };

  // -------------------------------
  // DELETE ALL (SUPER FAST)
  // -------------------------------
  const deleteAll = async () => {
    try {
      const token = localStorage.getItem("token");

      // PARALLEL DELETE — ULTRA FAST
      await Promise.all(
        notifications.map((n) =>
          fetch(`${BASE_URL}/api/notification/${n._id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );

      setNotifications([]);
    } catch (e) {
      console.log("Delete All Error:", e);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="w-full bg-[#f5f5f5] py-3 px-4 border-b flex items-center justify-between">

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-black whitespace-nowrap">
        Reported Content
      </h1>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {/* NOTIFICATION */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="cursor-pointer relative"
            onClick={() => setOpen(!open)}
          >
            <Bell className="h-7 w-7 text-yellow-500" />

            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-600 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">
                {unreadCount}
              </span>
            )}
          </div>

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-3 w-[330px] bg-white shadow-lg border rounded-lg p-3 z-50">

              {/* HEADING */}
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-gray-800">Notifications</h2>
                <button
                  onClick={markAll}
                  className="text-blue-600 text-sm"
                >
                  Mark all read
                </button>
              </div>

              {/* LIST */}
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-center text-gray-500 py-3">
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
                        className="text-red-500 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* DELETE ALL */}
              {notifications.length > 0 && (
                <button
                  className="w-full text-red-600 mt-2 py-2 text-sm border-t"
                  onClick={deleteAll}
                >
                  Delete All
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
