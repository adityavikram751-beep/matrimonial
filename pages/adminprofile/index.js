"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";

const BASE_URL = "https://matrimonial-backend-7ahc.onrender.com";

/* ----------------------------------------------------
   TOKEN FINDER
---------------------------------------------------- */
function findTokenInObject(obj) {
  if (!obj) return null;
  if (typeof obj === "string") {
    if (obj.split(".").length === 3) return obj;
    if (obj.length > 10) return obj;
    return null;
  }
  if (typeof obj === "object") {
    for (const k of Object.keys(obj)) {
      const found = findTokenInObject(obj[k]);
      if (found) return found;
    }
  }
  return null;
}

function getAuthTokenFromLocalStorage() {
  const keys = ["token", "auth", "user", "matrimonial_token", "accessToken"];
  for (let k of keys) {
    const raw = localStorage.getItem(k);
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw);
      const found = findTokenInObject(parsed);
      if (found) return found;
    } catch {
      if (raw.split(".").length === 3 || raw.length > 20) return raw;
    }
  }
  return null;
}

/* ----------------------------------------------------
   TOAST
---------------------------------------------------- */
function Toast({ message, type = "info", onClose }) {
  const bg =
    type === "success"
      ? "bg-green-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-gray-700";
  return (
    <div className={`fixed right-4 top-4 z-50 px-4 py-2 text-white rounded ${bg}`}>
      <div className="flex items-center gap-3">
        <span>{message}</span>
        <button onClick={onClose}>✕</button>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   MODAL WRAPPER
---------------------------------------------------- */
function ModalShell({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   BASIC INFO MODAL (FormData)
---------------------------------------------------- */
function EditBasicModal({ defaultValues, onSave, onClose }) {
  const [form, setForm] = useState({
    name: defaultValues.name || "",
    email: defaultValues.email || "",
    phone: defaultValues.phone || "",
    assignedRegion: defaultValues.assignedRegion || "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(defaultValues.profileImage);

  const handleFile = (file) => {
    if (!file) return;
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const submit = async (e) => {
    e.preventDefault();
    await onSave({ ...form, profileImage: file });
    onClose();
  };

  return (
    <ModalShell title="Edit Basic Info" onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">

        <label className="flex flex-col">
          <span>Name</span>
          <input
            className="border p-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>

        <label className="flex flex-col">
          <span>Email</span>
          <input
            type="email"
            className="border p-2 rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>

        <label className="flex flex-col">
          <span>Phone</span>
          <input
            className="border p-2 rounded"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </label>

        <label className="flex flex-col">
          <span>Assigned Region</span>
          <input
            className="border p-2 rounded"
            value={form.assignedRegion}
            onChange={(e) => setForm({ ...form, assignedRegion: e.target.value })}
          />
        </label>

        <label className="flex flex-col">
          <span>Profile Image</span>
          <input type="file" onChange={(e) => handleFile(e.target.files[0])} />
          {preview && (
            <img src={preview} className="w-20 h-20 mt-2 rounded-full object-cover" />
          )}
        </label>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300">
            Cancel
          </button>
          <button className="px-4 py-2 bg-green-600 text-white">Save</button>
        </div>
      </form>
    </ModalShell>
  );
}

/* ----------------------------------------------------
   SECURITY MODAL
---------------------------------------------------- */
function SecurityModal({ defaultValues, onSave, onClose }) {
  const [form, setForm] = useState({
    newPassword: "",
    twoFactor: defaultValues.twoFactor,
    recentLoginDevice: defaultValues.recentLoginDevice,
    suspiciousLoginAlert: defaultValues.suspiciousLoginAlert,
  });

  const submit = async (e) => {
    e.preventDefault();
    await onSave(form);
    onClose();
  };

  return (
    <ModalShell title="Security Settings" onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">

        <label className="flex flex-col">
          <span>New Password</span>
          <input
            type="password"
            className="border p-2 rounded"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          />
        </label>

        <label className="flex justify-between">
          <span>Two Factor Auth</span>
          <input
            type="checkbox"
            checked={form.twoFactor}
            onChange={(e) => setForm({ ...form, twoFactor: e.target.checked })}
          />
        </label>

        <label className="flex flex-col">
          <span>Recent Login Device</span>
          <input
            className="border p-2 rounded"
            value={form.recentLoginDevice}
            onChange={(e) => setForm({ ...form, recentLoginDevice: e.target.value })}
          />
        </label>

        <label className="flex justify-between">
          <span>Suspicious Login Alert</span>
          <input
            type="checkbox"
            checked={form.suspiciousLoginAlert}
            onChange={(e) =>
              setForm({ ...form, suspiciousLoginAlert: e.target.checked })
            }
          />
        </label>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300">
            Cancel
          </button>
          <button className="px-4 py-2 bg-green-600 text-white">Save</button>
        </div>
      </form>
    </ModalShell>
  );
}

/* ----------------------------------------------------
   PREFERENCES MODAL
---------------------------------------------------- */
function PreferencesModal({ defaultValues, onSave, onClose }) {
  const [form, setForm] = useState({
    language: defaultValues.language,
    theme: defaultValues.theme,
    notifications: defaultValues.notifications,
    landingPage: defaultValues.landingPage,
  });

  const submit = async (e) => {
    e.preventDefault();
    await onSave(form);
    onClose();
  };

  return (
    <ModalShell title="Preferences" onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">

        <label className="flex flex-col">
          <span>Language</span>
          <input
            className="border p-2 rounded"
            value={form.language}
            onChange={(e) => setForm({ ...form, language: e.target.value })}
          />
        </label>

        <label className="flex flex-col">
          <span>Landing Page</span>
          <input
            className="border p-2 rounded"
            value={form.landingPage}
            onChange={(e) => setForm({ ...form, landingPage: e.target.value })}
          />
        </label>

        <label className="flex flex-col">
          <span>Theme</span>
          <select
            className="border p-2 rounded"
            value={form.theme}
            onChange={(e) => setForm({ ...form, theme: e.target.value })}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.notifications}
            onChange={(e) => setForm({ ...form, notifications: e.target.checked })}
          />
          <span>Notifications</span>
        </label>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300">
            Cancel
          </button>
          <button className="px-4 py-2 bg-green-600 text-white">Save</button>
        </div>
      </form>
    </ModalShell>
  );
}

/* ----------------------------------------------------
   MAIN PAGE
---------------------------------------------------- */
export default function AdminProfilePage() {
  const [admin, setAdmin] = useState({});
  const [loading, setLoading] = useState(true);

  const [showBasic, setShowBasic] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  const [toast, setToast] = useState(null);

  /* FETCH PROFILE */
  const loadProfile = async () => {
    const token = getAuthTokenFromLocalStorage();

    const res = await fetch(`${BASE_URL}/admin/profile`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    const json = await res.json();
    if (json.success) {
      setAdmin(json.data);

      // Sidebar update
      localStorage.setItem("admin_profile", JSON.stringify(json.data));
      window.dispatchEvent(new Event("adminProfileUpdated"));
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  /* HANDLE BASIC UPDATE */
  const handleSaveBasic = async (values) => {
    const token = getAuthTokenFromLocalStorage();
    const fd = new FormData();

    fd.append("name", values.name);
    fd.append("email", values.email);
    fd.append("assignedRegion", values.assignedRegion);
    fd.append("phone", values.phone);

    if (values.profileImage) {
      fd.append("profileImage", values.profileImage);
    }

    const res = await fetch(`${BASE_URL}/admin/profile/basic`, {
      method: "PUT",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: fd,
    });

    const json = await res.json();

    if (json.success) {
      setToast({ type: "success", message: "Basic info updated!" });

      // Sidebar update
      localStorage.setItem("admin_profile", JSON.stringify(json.data));
      window.dispatchEvent(new Event("adminProfileUpdated"));

      loadProfile();
    }
  };

  /* HANDLE SECURITY UPDATE */
  const handleSaveSecurity = async (values) => {
    const token = getAuthTokenFromLocalStorage();

    const res = await fetch(`${BASE_URL}/admin/profile/security`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    const json = await res.json();

    if (json.success) {
      setToast({ type: "success", message: "Security updated!" });

      localStorage.setItem("admin_profile", JSON.stringify(json.data));
      window.dispatchEvent(new Event("adminProfileUpdated"));

      loadProfile();
    }
  };

  /* HANDLE PREFERENCES UPDATE */
  const handleSavePreferences = async (values) => {
    const token = getAuthTokenFromLocalStorage();

    const res = await fetch(`${BASE_URL}/admin/profile/preferences`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    const json = await res.json();

    if (json.success) {
      setToast({ type: "success", message: "Preferences updated!" });

      localStorage.setItem("admin_profile", JSON.stringify(json.data));
      window.dispatchEvent(new Event("adminProfileUpdated"));

      loadProfile();
    }
  };

  if (loading) return <p className="p-6">Loading profile...</p>;

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between p-4 bg-gray-100 shadow fixed top-0 w-full">
        <h1 className="font-bold text-lg">Admin Profile</h1>
        <Image src="/notification.png" alt="" width={36} height={36} />
      </div>

      <div className="mt-20 p-6 flex gap-10">

        {/* LEFT SIDE */}
        <div>
          <div className="w-48 h-48 rounded-full overflow-hidden border">
            {admin.profileImage ? (
              <img src={admin.profileImage} className="w-full h-full object-cover" />
            ) : (
              <Image src="/profile.png" fill alt="profile" />
            )}
          </div>

          <button
            onClick={() => setShowBasic(true)}
            className="mt-4 bg-green-600 text-white px-5 py-2 rounded"
          >
            Edit Profile
          </button>

          <p className="mt-4">{admin.email}</p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 space-y-6">

          {/* BASIC INFO */}
          <div className="p-4 bg-amber-50 border rounded relative">
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setShowBasic(true)}
            >
              <FiEdit />
            </div>

            <h2 className="font-semibold text-lg">Basic Info</h2>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between">
                <strong>Name:</strong> <span>{admin.name}</span>
              </div>
              <div className="flex justify-between">
                <strong>Email:</strong> <span>{admin.email}</span>
              </div>
              <div className="flex justify-between">
                <strong>Phone:</strong> <span>{admin.phone}</span>
              </div>
              <div className="flex justify-between">
                <strong>Region:</strong> <span>{admin.assignedRegion}</span>
              </div>
            </div>
          </div>

          {/* SECURITY */}
          <div className="p-4 bg-amber-50 border rounded relative">
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setShowSecurity(true)}
            >
              <FiEdit />
            </div>

            <h2 className="font-semibold text-lg">Security</h2>
            <div className="mt-3 space-y-3">
              <div className="flex justify-between">
                <strong>Password:</strong> <span>••••••••</span>
              </div>

              <div className="flex justify-between">
                <strong>Two Factor Auth:</strong>
                <span>{admin.twoFactor ? "Enabled" : "Disabled"}</span>
              </div>

              <div className="flex justify-between">
                <strong>Recent Login Device:</strong>
                <span>{admin.recentLoginDevice}</span>
              </div>

              <div className="flex justify-between">
                <strong>Suspicious Login Alert:</strong>
                <span>{admin.suspiciousLoginAlert ? "Enabled" : "Disabled"}</span>
              </div>
            </div>
          </div>

          {/* PREFERENCES */}
          <div className="p-4 bg-amber-50 border rounded relative">
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setShowPreferences(true)}
            >
              <FiEdit />
            </div>

            <h2 className="font-semibold text-lg">Preferences</h2>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between">
                <strong>Language:</strong> <span>{admin.language}</span>
              </div>
              <div className="flex justify-between">
                <strong>Landing Page:</strong> <span>{admin.landingPage}</span>
              </div>
              <div className="flex justify-between">
                <strong>Theme:</strong> <span>{admin.theme}</span>
              </div>
              <div className="flex justify-between">
                <strong>Notifications:</strong>
                <span>{admin.notifications ? "ON" : "OFF"}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* MODALS */}
      {showBasic && (
        <EditBasicModal
          defaultValues={admin}
          onSave={handleSaveBasic}
          onClose={() => setShowBasic(false)}
        />
      )}

      {showSecurity && (
        <SecurityModal
          defaultValues={admin}
          onSave={handleSaveSecurity}
          onClose={() => setShowSecurity(false)}
        />
      )}

      {showPreferences && (
        <PreferencesModal
          defaultValues={admin}
          onSave={handleSavePreferences}
          onClose={() => setShowPreferences(false)}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
