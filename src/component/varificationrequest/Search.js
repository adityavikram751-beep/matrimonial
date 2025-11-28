import React, { useEffect, useRef, useState } from "react";
import { Search as SearchIcon } from "lucide-react";

const Search = ({ setSearch, topSearch, setTopSearch }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null); // CLICK OUTSIDE REF

  const BASE_URL = "https://matrimonial-backend-7ahc.onrender.com";

  // CLICK OUTSIDE LOGIC
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false); // dropdown close
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // GET NOTIFICATIONS
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/api/notification/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setNotifications(data.data.reverse());
      }
    } catch (err) {
      console.log("Notification Error:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // MARK ONE READ
  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${BASE_URL}/api/notification/mark-read/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchNotifications();
    } catch (e) {
      console.log(e);
    }
  };

  // MARK ALL READ
  const markAll = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${BASE_URL}/api/notification/mark-all`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchNotifications();
    } catch (e) {
      console.log(e);
    }
  };

  // DELETE SINGLE
  const deleteOne = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${BASE_URL}/api/notification/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchNotifications();
    } catch (e) {
      console.log(e);
    }
  };

  // DELETE ALL
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

      fetchNotifications();
    } catch (e) {
      console.log(e);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div
      className="bg-gray-100 px-6 py-4 shadow-sm border-b fixed top-0 z-50 flex items-center justify-between"
      style={{
        left: "250px",
        width: "calc(100% - 250px)",
      }}
    >
      <h1 className="text-2xl font-bold text-gray-900">Verification Request</h1>

      <div className="flex items-center gap-5">
        {/* ➤ Search Bar */}
        <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 w-[350px] shadow-md">
          <SearchIcon className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search By User ID"
            className="ml-2 w-full outline-none text-gray-700"
            value={topSearch}
            onChange={(e) => {
              setTopSearch(e.target.value);
              setSearch(e.target.value);
            }}
          />
        </div>

        {/* ➤ Notification Icon */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setOpen(!open)}
            className="cursor-pointer relative"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#FFC107">
              <path d="M12 24c1.104 0 2-.897 2-2h-4c0 1.103.896 2 2 2zm6.707-5l1.293 1.293V21H4v-1.707L5.293 19H6v-7c0-3.309 2.691-6 6-6s6 2.691 6 6v7h.707zM18 18H6v-7c0-2.757 2.243-5 5-5s5 2.243 5 5v7z" />
            </svg>

            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-600 text-white text-[10px] flex items-center justify-center rounded-full">
                {unreadCount}
              </span>
            )}
          </div>

          {/* ➤ Dropdown */}
          {open && (
            <div className="absolute right-0 mt-3 w-[350px] bg-white shadow-lg border rounded-lg p-3 z-50">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-gray-800">Notifications</h2>
                <button className="text-sm text-blue-600" onClick={markAll}>
                  Mark all as read
                </button>
              </div>

              <div className="max-h-[300px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-center text-gray-500 py-3">
                    No notifications
                  </p>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item._id}
                      className={`p-3 border-b flex justify-between items-start ${
                        !item.read ? "bg-yellow-50" : ""
                      }`}
                    >
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(item.createdAt).toLocaleString()}
                        </p>

                        {!item.read && (
                          <button
                            className="text-blue-600 text-xs mt-1"
                            onClick={() => markAsRead(item._id)}
                          >
                            Mark as read
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => deleteOne(item._id)}
                        className="text-red-500 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>

              {notifications.length > 0 && (
                <button
                  className="w-full text-red-600 mt-2 py-2 border-t text-sm"
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
