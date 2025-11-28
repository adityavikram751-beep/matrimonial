"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const BASE_URL = "https://matrimonial-backend-7ahc.onrender.com";

/* ---------------------------
   TOKEN FINDER (unchanged)
----------------------------*/
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

/* ---------------------------
   Small utilities: Toast
----------------------------*/
function Toast({ message, type = "info", onClose }) {
  const bg =
    type === "success"
      ? "bg-green-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-gray-700";
  return (
    <div className={`fixed right-6 top-6 z-50 px-4 py-2 text-white rounded ${bg} shadow-lg`}>
      <div className="flex items-center gap-3">
        <span className="text-sm">{message}</span>
        <button onClick={onClose} className="text-white/90">✕</button>
      </div>
    </div>
  );
}

/* ---------------------------
   Modal Shell (popup wrapper)
   — styling to match screenshot
----------------------------*/
function ModalShell({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.25)] w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border flex items-center justify-center text-gray-600 hover:bg-gray-50"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ---------------------------
   Blue Toggle (screenshot style)
----------------------------*/
function ToggleBlue({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-12 h-7 rounded-full p-1 flex items-center transition-all ${
        checked ? "bg-[#3b46ff] justify-end" : "bg-gray-300 justify-start"
      }`}
      aria-pressed={checked}
    >
      <span className="w-5 h-5 bg-white rounded-full shadow-sm" />
    </button>
  );
}

/* ---------------------------
   Small helper: Card wrapper style
   (cream background, subtle border, rounded)
----------------------------*/
function Card({ children, onEdit }) {
  return (
    <div className="relative bg-[#fbf0e8] border border-[#d8cfc6] rounded-lg p-6 shadow-sm">
      {onEdit && (
        <div
          className="absolute top-4 right-4 cursor-pointer p-2 rounded border bg-white"
          onClick={onEdit}
        >
          <FiEdit />
        </div>
      )}
      {children}
    </div>
  );
}

/* ---------------------------
   LabelRow — reproducible label : value layout
   Uses 3-column grid: label | colon | value
----------------------------*/
function LabelRow({ label, value, valueNode }) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-sm text-gray-700 py-1">
      <div className="text-gray-500">{label}</div>
      <div className="text-gray-500">:</div>
      <div className="text-right">{valueNode ? valueNode : <span>{value}</span>}</div>
    </div>
  );
}

/* ---------------------------
   Edit Basic Modal (styled exactly)
----------------------------*/
function EditBasicModal({ defaultValues, onSave, onClose }) {
  const [form, setForm] = useState({
    name: defaultValues.name || "",
    email: defaultValues.email || "",
    phone: defaultValues.phone || "",
    assignedRegion: defaultValues.assignedRegion || "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(defaultValues.profileImage || null);

  useEffect(() => {
    setForm({
      name: defaultValues.name || "",
      email: defaultValues.email || "",
      phone: defaultValues.phone || "",
      assignedRegion: defaultValues.assignedRegion || "",
    });
    setPreview(defaultValues.profileImage || null);
  }, [defaultValues]);

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    try {
      setPreview(URL.createObjectURL(f));
    } catch {
      setPreview(null);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    await onSave({ ...form, profileImage: file });
    onClose();
  };

  return (
    <ModalShell title="Edit Basic Info" onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col text-sm">
            <span className="mb-1 text-gray-700">Full Name</span>
            <input
              className="border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>

          <label className="flex flex-col text-sm">
            <span className="mb-1 text-gray-700">E-mail address</span>
            <input
              type="email"
              className="border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>

          <label className="flex flex-col text-sm">
            <span className="mb-1 text-gray-700">Phone</span>
            <input
              className="border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </label>

          <label className="flex flex-col text-sm">
            <span className="mb-1 text-gray-700">Assigned Region</span>
            <input
              className="border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
              value={form.assignedRegion}
              onChange={(e) => setForm({ ...form, assignedRegion: e.target.value })}
            />
          </label>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-20 h-20 rounded-full object-cover border"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-100 border flex items-center justify-center text-sm text-gray-500">
                No Image
              </div>
            )}
          </div>
          <div className="flex-1 text-sm">
            <div className="text-gray-700 mb-1">Profile Image</div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e.target.files[0])}
              className="text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-red-600 text-white shadow"
          >
            Discard
          </button>
          <button className="px-4 py-2 rounded-full bg-green-600 text-white shadow">
            Save
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

/* ---------------------------
   Security Modal — match screenshot
----------------------------*/
function SecurityModal({ defaultValues, onSave, onClose }) {
  const [form, setForm] = useState({
    newPassword: "",
    twoFactor: !!defaultValues.twoFactor,
    recentLoginDevice: defaultValues.recentLoginDevice || "",
    suspiciousLoginAlert: !!defaultValues.suspiciousLoginAlert,
  });
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    setForm({
      newPassword: "",
      twoFactor: !!defaultValues.twoFactor,
      recentLoginDevice: defaultValues.recentLoginDevice || "",
      suspiciousLoginAlert: !!defaultValues.suspiciousLoginAlert,
    });
  }, [defaultValues]);

  const submit = async (e) => {
    e.preventDefault();
    await onSave(form);
    onClose();
  };

  return (
    <ModalShell title="Security Settings" onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Change Password :</label>
          <div className="flex items-center gap-2">
            <input
              type={showPass ? "text" : "password"}
              className="flex-1 border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Enter new password"
              value={form.newPassword}
              onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPass((s) => !s)}
              className="p-2 rounded border flex items-center justify-center"
            >
              {showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-700 mb-1">Two Factor Authentication :</div>
          </div>
          <ToggleBlue
            checked={form.twoFactor}
            onChange={(v) => setForm({ ...form, twoFactor: v })}
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 mb-1 block">Recent login Device</label>
          <input
            className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
            value={form.recentLoginDevice}
            onChange={(e) => setForm({ ...form, recentLoginDevice: e.target.value })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-700 mb-1">Alert on suspicious login</div>
          </div>
          <ToggleBlue
            checked={form.suspiciousLoginAlert}
            onChange={(v) => setForm({ ...form, suspiciousLoginAlert: v })}
          />
        </div>

        <div className="flex justify-end gap-3 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-red-600 text-white shadow"
          >
            Discard
          </button>
          <button className="px-4 py-2 rounded-full bg-green-600 text-white shadow">
            Save
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

/* ---------------------------
   Preferences Modal
----------------------------*/
function PreferencesModal({ defaultValues, onSave, onClose }) {
  const [form, setForm] = useState({
    language: defaultValues.language || "English",
    theme: defaultValues.theme || "light",
    notifications: !!defaultValues.notifications,
    landingPage: defaultValues.landingPage || "Dashboard",
  });

  useEffect(() => {
    setForm({
      language: defaultValues.language || "English",
      theme: defaultValues.theme || "light",
      notifications: !!defaultValues.notifications,
      landingPage: defaultValues.landingPage || "Dashboard",
    });
  }, [defaultValues]);

  const submit = async (e) => {
    e.preventDefault();
    await onSave(form);
    onClose();
  };

  return (
    <ModalShell title="Preferences / Personalization" onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col text-sm">
            <span className="mb-1 text-gray-700">Language</span>
            <input
              className="border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value })}
            />
          </label>

          <label className="flex flex-col text-sm">
            <span className="mb-1 text-gray-700">Default landing page</span>
            <input
              className="border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
              value={form.landingPage}
              onChange={(e) => setForm({ ...form, landingPage: e.target.value })}
            />
          </label>

          <label className="flex flex-col text-sm">
            <span className="mb-1 text-gray-700">Theme</span>
            <select
              className="border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
              value={form.theme}
              onChange={(e) => setForm({ ...form, theme: e.target.value })}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>

          <div className="flex items-center gap-3">
            <ToggleBlue
              checked={form.notifications}
              onChange={(v) => setForm({ ...form, notifications: v })}
            />
            <div className="text-sm text-gray-700">Notifications</div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-red-600 text-white shadow"
          >
            Discard
          </button>
          <button className="px-4 py-2 rounded-full bg-green-600 text-white shadow">
            Save
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

/* ---------------------------
   MAIN PAGE component
----------------------------*/
export default function AdminProfilePage() {
  const [admin, setAdmin] = useState({});
  const [loading, setLoading] = useState(true);

  const [showBasic, setShowBasic] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  const [toast, setToast] = useState(null);

  /* FETCH PROFILE */
  const loadProfile = async () => {
    try {
      const token = getAuthTokenFromLocalStorage();
      const res = await fetch(`${BASE_URL}/admin/profile`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const json = await res.json();
      if (json.success) {
        setAdmin(json.data || {});
        localStorage.setItem("admin_profile", JSON.stringify(json.data || {}));
        window.dispatchEvent(new Event("adminProfileUpdated"));
      } else {
        const cached = localStorage.getItem("admin_profile");
        if (cached) setAdmin(JSON.parse(cached));
      }
    } catch (err) {
      const cached = localStorage.getItem("admin_profile");
      if (cached) setAdmin(JSON.parse(cached));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  /* ---------------------------
     Save handlers (unchanged logic)
  ----------------------------*/
  const handleSaveBasic = async (values) => {
    try {
      const token = getAuthTokenFromLocalStorage();
      const fd = new FormData();
      fd.append("name", values.name);
      fd.append("email", values.email);
      fd.append("assignedRegion", values.assignedRegion);
      fd.append("phone", values.phone);
      if (values.profileImage) fd.append("profileImage", values.profileImage);

      const res = await fetch(`${BASE_URL}/admin/profile/basic`, {
        method: "PUT",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: fd,
      });

      const json = await res.json();
      if (json.success) {
        setToast({ type: "success", message: "Basic info updated!" });
        localStorage.setItem("admin_profile", JSON.stringify(json.data || {}));
        window.dispatchEvent(new Event("adminProfileUpdated"));
        loadProfile();
      } else {
        setToast({ type: "error", message: json.message || "Failed to update" });
      }
    } catch (err) {
      setToast({ type: "error", message: "Network error" });
    }
  };

  const handleSaveSecurity = async (values) => {
    try {
      const token = getAuthTokenFromLocalStorage();
      const res = await fetch(`${BASE_URL}/admin/profile/security`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (json.success) {
        setToast({ type: "success", message: "Security updated!" });
        localStorage.setItem("admin_profile", JSON.stringify(json.data || {}));
        window.dispatchEvent(new Event("adminProfileUpdated"));
        loadProfile();
      } else {
        setToast({ type: "error", message: json.message || "Failed to update" });
      }
    } catch (err) {
      setToast({ type: "error", message: "Network error" });
    }
  };

  const handleSavePreferences = async (values) => {
    try {
      const token = getAuthTokenFromLocalStorage();
      const res = await fetch(`${BASE_URL}/admin/profile/preferences`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (json.success) {
        setToast({ type: "success", message: "Preferences updated!" });
        localStorage.setItem("admin_profile", JSON.stringify(json.data || {}));
        window.dispatchEvent(new Event("adminProfileUpdated"));
        loadProfile();
      } else {
        setToast({ type: "error", message: json.message || "Failed to update" });
      }
    } catch (err) {
      setToast({ type: "error", message: "Network error" });
    }
  };

  if (loading) return <p className="p-6">Loading profile...</p>;

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between p-4 bg-gray-100 shadow fixed top-0 w-full z-20">
        <h1 className="font-bold text-lg">Admin Profile</h1>
        <div className="flex items-center gap-3">
          <Image src="/notification.png" alt="" width={36} height={36} />
        </div>
      </div>

      <div className="mt-20 p-6 flex gap-10 max-w-6xl mx-auto">

        {/* LEFT SIDE */}
        <div className="w-64 flex-shrink-0">
          <div className="w-44 h-44 rounded-full overflow-hidden border">
            {admin.profileImage ? (
              <img src={admin.profileImage} className="w-full h-full object-cover" alt="admin" />
            ) : (
              <Image src="/profile.png" alt="profile" width={176} height={176} />
            )}
          </div>

          <button
            onClick={() => setShowBasic(true)}
            className="mt-4 bg-green-600 text-white px-5 py-2 rounded shadow"
          >
            Edit profile
          </button>

          <p className="mt-4 font-medium">{admin.email}</p>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-600" />
              <div>Active Now</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xl">🔒</div>
              <div>Change Password</div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 space-y-6">

          {/* BASIC CARD */}
          <Card onEdit={() => setShowBasic(true)}>
            <h2 className="font-semibold text-lg mb-3">Basic Info</h2>
            <div>
              <LabelRow label="Full Name" value={admin.name || "-"} />
              <LabelRow label="Role" value={admin.role || "Super Admin"} />
              <LabelRow label="E-mail address" value={admin.email || "-"} />
              <LabelRow label="Phone" value={admin.phone || "-"} />
              <LabelRow label="Assigned Region" value={admin.assignedRegion || "-"} />
            </div>
          </Card>

          {/* SECURITY CARD */}
          <Card onEdit={() => setShowSecurity(true)}>
            <h2 className="font-semibold text-lg mb-3">Security Setting</h2>
            <div>
              <LabelRow label="Change Password" valueNode={<span>••••••••</span>} />
              <div className="py-1">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-sm text-gray-700">
                  <div className="text-gray-500">Two Factor Authentication</div>
                  <div className="text-gray-500">:</div>
                  <div className="text-right">
                    <ToggleBlue checked={!!admin.twoFactor} onChange={() => {}} />
                  </div>
                </div>
              </div>
              <LabelRow label="Recent login Device" value={admin.recentLoginDevice || "-"} />
              <div className="py-1">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-sm text-gray-700">
                  <div className="text-gray-500">Alert on suspicious login</div>
                  <div className="text-gray-500">:</div>
                  <div className="text-right">
                    <ToggleBlue checked={!!admin.suspiciousLoginAlert} onChange={() => {}} />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* PREFERENCES CARD */}
          <Card onEdit={() => setShowPreferences(true)}>
            <h2 className="font-semibold text-lg mb-3">Preferences / Personalization</h2>
            <div>
              <LabelRow label="Language" value={admin.language || "English"} />
              <LabelRow label="Default landing page" value={admin.landingPage || "Dashboard"} />
              <LabelRow label="Theme" value={admin.theme || "Light"} />
              <div className="py-1">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-sm text-gray-700">
                  <div className="text-gray-500">Notifications</div>
                  <div className="text-gray-500">:</div>
                  <div className="text-right">
                    <ToggleBlue checked={!!admin.notifications} onChange={() => {}} />
                  </div>
                </div>
              </div>
            </div>
          </Card>
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
