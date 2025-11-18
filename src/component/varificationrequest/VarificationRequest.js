'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GrView } from "react-icons/gr";


import {
  ChevronDown,
  ChevronUp,
  Eye,
  Loader2,
  Search,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { API_URL } from '../api/apiURL';

const gradients = [
  'bg-gradient-to-br from-blue-400 to-purple-500',
  'bg-gradient-to-br from-green-400 to-blue-500',
  'bg-gradient-to-br from-purple-400 to-pink-500',
  'bg-gradient-to-br from-yellow-400 to-orange-500',
  'bg-gradient-to-br from-pink-400 to-red-500',
  'bg-gradient-to-br from-indigo-400 to-purple-500',
];

const getStatusColor = (status) =>
({
  approved: 'text-green-600',
  pending: 'text-orange-500',
  reject: 'text-red-600',
}[status] || 'text-gray-600');

const getStatusDot = (status) =>
({
  approved: 'bg-green-500',
  pending: 'bg-orange-500',
  reject: 'bg-red-500',
}[status] || 'bg-gray-500');

const getGradientClass = (name) =>
  gradients[name?.charCodeAt(0) % gradients.length || 0];

const UserAvatar = ({ name = '', userId, gender, image }) => {
  const initials = name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const gradientClass = getGradientClass(name);

  return (
    <div className="flex items-center gap-3">
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-8 h-8 rounded-full object-cover border"
        />
      ) : (
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-xs ${gradientClass}`}
        >
          {initials}
        </div>
      )}
      <div>
        <div className="font-medium text-gray-900 text-sm">{name}</div>
        <div className="text-xs text-gray-500">
          ID: {userId} / {gender}
        </div>
      </div>
    </div>
  );
};

const UserModerationDashboard = () => {
  const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState('Status');
  const [genderFilter, setGenderFilter] = useState('Gender');
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);
  const [rejectCount, setRejectCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const itemsPerPage = 10;


  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${API_URL}/admin/user-verify`);
        const data = await res.json();
        setUsers(data?.data)

        const totalRequest = (data?.data?.length);
        setRequestCount(totalRequest);


        const count = data?.data?.filter(user => user.adminApprovel === 'pending').length;
        setPendingCount(count);

        const approvedCount = data?.data?.filter(user => user.adminApprovel === 'approved').length;
        setApprovedCount(approvedCount);


       const reject = data?.data?.filter(user => user.adminApprovel === 'reject').length;
       setRejectCount(reject)



      } catch (err) {
        setError('Failed to fetch users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSort = (field) => {
    setSortDirection(sortField === field && sortDirection === 'asc' ? 'desc' : 'asc');
    setSortField(field);
  };

  const getSortIcon = (field) =>
    sortField !== field ? (
      <ChevronDown className="w-4 h-4 text-gray-400" />
    ) : sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4 text-gray-600" />
    ) : (
      <ChevronDown className="w-4 h-4 text-gray-600" />
    );

  const updateUserStatus = async (userId, status) => {
    const confirm = window.confirm(`Are you sure you want to ${status} this user?`);
    if (!confirm) return;

    try {
      const res = await fetch(`${API_URL}/admin/${userId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminApprovel: status }),
      });

      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, adminApprovel: status } : u))
        );
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const filteredAndSortedUsers = useMemo(() => {
    const safeUsers = Array.isArray(users) ? users : [];
    return safeUsers?.filter(({ _id, fullName, firstName, lastName, adminApprovel, gender }) => {
      const matchSearch =
        !searchTerm ||
        _id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        firstName?.toLowerCase().includes(searchTerm.toLowerCase()) || lastName?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'Status' || adminApprovel === statusFilter;
      const matchGender = genderFilter === 'Gender' || gender === genderFilter;
      return matchSearch && matchStatus && matchGender;
    })
      .sort((a, b) => {
        if (!sortField) return 0;
        const valA = a[sortField]?.toLowerCase?.() || '';
        const valB = b[sortField]?.toLowerCase?.() || '';
        return sortDirection === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      });
  }, [users, searchTerm, statusFilter, genderFilter, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
  const paginatedUsers = filteredAndSortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );





  return (
    <div className="w-full min-h-screen   bg-gray-50 mt-0  sm:py-6">

      <div className="flex shadow  justify-between items-center p-2 pt-0 mt-0 mb-2 bg-gray-50">
        <div className="bg-transparent">
          <h1 className="text-2xl font-bold p-5 text-black">Verification Request</h1>
        </div>
        <div className="flex gap-5 justify-center items-center">
          {/* <div className="flex gap-2 justify-center items-center border bg-white border-gray-300 rounded-md px-2 py-1">
            <Image src="/search.png" width={20} height={20} alt="search" />
            <input
              type="text"
              placeholder="Search..."
              className="border-none rounded-md px-2 w-[300px] py-1 focus:outline-none focus:ring-blue-500"
            />
          </div> */}
          <div>
            <Image className="cursor-pointer" src="/notification.png" width={35} height={35} alt="Notification" />
          </div>
        </div>
      </div>



      {/* Report Section Start */}
      <div className='p-3 p-5 flex justify-center gap-[70px] items-center'>
        <div className='border-2 border-gray-400 text-center shadow w-[200px] rounded-2xl p-5'>
          <h1 className='font-bold'>Total Request this <br />Week</h1>
          <br />
          <b>{requestCount}</b>
        </div>
        <div className='border-2 border-gray-400 text-center shadow w-[200px] rounded-2xl p-5'>
          <h1 className='font-bold'>Pending <br />Verification</h1>
          <br />
          <b>{pendingCount}</b>
        </div>
        <div className='border-2 border-gray-400 text-center shadow w-[200px] rounded-2xl p-5'>
          <h1 className='font-bold'>Approved This <br />Week</h1>
          <br />
          <b>{approvedCount}</b>
        </div>
        <div className='border-2 border-gray-400 text-center shadow w-[200px] rounded-2xl p-5'>
          <h1 className='font-bold'>Rejected Due to<br />
            MisMatch
          </h1>
          <br />
          <b>{rejectCount}</b>
        </div>
      </div>
      {/* Report Section End */}


      <div className="max-w-7xl p-5 border rounded-2xl ml-3 mr-3 border-gray-300 mx-auto space-y-6 ">
        {/* Filters */}
        <div className="flex flex-wrap border p-1 rounded border-gray-300 gap-4 justify-between items-center">
          <div className="relative  flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by Name or ID"
              className="w-full sm:w-64 border border-gray-300 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 bg-gray-200 cursor-pointer hover:bg-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="Status">Status</option>
              <option value="approved">approved</option>
              <option value="pending">pending</option>
              <option value="reject">rejected</option>
            </select>

            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 bg-gray-200 cursor-pointer hover:bg-gray-300 text-sm"
            >
              <option value="Gender">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              {/* <option value="Others">Others</option> */}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border rounded-lg border-gray-300  bg-white shadow-sm">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="animate-spin h-6 w-6 text-gray-600" />
              <span className="ml-2 text-sm text-gray-600">Loading users...</span>
            </div>
          ) : error ? (
            <div className="p-6 text-center text-red-600">{error}</div>
          ) : paginatedUsers.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No users found.</div>
          ) : (
            <table className="w-full min-w-[800px] text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3">
                    <button onClick={() => handleSort('fullName')} className="flex items-center gap-1">
                      Name {getSortIcon('fullName')}
                    </button>
                  </th>
                  <th className="text-left px-4 py-3">Email</th>
                  <th className="text-left px-4 py-3">Mobile</th>
                  <th className="text-left px-4 py-3">Gender</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <UserAvatar
                        name={`${user.firstName || ''} ${user.lastName || ''}`.trim()}
                        userId={user._id?.slice(-6)}
                        gender={user.gender}
                        image={user.profileImage}
                      />
                    </td>
                    <td className="px-4 py-3">{user.email || '-'}</td>
                    <td className="px-4 py-3">{user.mobile}</td>
                    <td className="px-4 py-3">{user.gender || "Not Mention"}</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${getStatusDot(user.adminApprovel)}`} />
                        <span className={`${getStatusColor(user.adminApprovel)} font-medium`}>
                          {user.adminApprovel}
                        </span>
                      </span>
                    </td>
                    <td className="px-4 py-2 flex gap-2 flex-wrap">
                      <Link
                        href={`/manageusers/${user._id}`}
                        className=" flex items-center gap-1 text-black text-sm px-3 py-1 rounded-md transition"
                      >
                        <GrView /> View
                      </Link>

                      {/* <button
                        onClick={() => updateUserStatus(user._id, 'approved')}
                        className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-md transition"
                      >
                        Approve
                      </button> */}

                      {/* <button
                        onClick={() => updateUserStatus(user._id, 'reject')}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md transition"
                      >
                        Reject
                      </button> */}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center pt-4 gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Prev
            </button>
            {[...Array(totalPages).keys()].map((n) => (
              <button
                key={n}
                onClick={() => setCurrentPage(n + 1)}
                className={`px-3 py-1 border rounded text-sm ${currentPage === n + 1 ? 'bg-blue-100 text-blue-800 font-semibold' : ''
                  }`}
              >
                {n + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserModerationDashboard;
