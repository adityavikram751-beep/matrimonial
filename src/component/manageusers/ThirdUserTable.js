'use client';
import { useState, useEffect } from 'react';
import { Check, X, Search, Download } from 'lucide-react';
import Papa from 'papaparse';
import { API_URL } from '../api/apiURL';


export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [sortField, setSortField] = useState('');
  const [asc, setAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const usersPerPage = 5;

  const fetchUsers = async () => {
    try {
      const url = `${API_URL}/admin/user-manage-get?search=${search}&status=${statusFilter}&gender=${genderFilter}&sortField=${sortField}&sortOrder=${asc ? 'asc' : 'desc'}&page=${currentPage}&limit=${usersPerPage}`;
      const res = await fetch(url);
      const data = await res.json();
      setUsers(data.users || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, statusFilter, genderFilter, sortField, asc, currentPage]);

  const toggleSort = (field) => {
    if (sortField === field) {
      setAsc(!asc);
    } else {
      setSortField(field);
      setAsc(true);
    }
  };

  const handleExportCSV = () => {
    const csv = Papa.unparse(users);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
  };

  const getStatusColor = (status) => {
    return status === 'Approved'
      ? 'text-green-600'
      : status === 'Pending'
      ? 'text-yellow-500'
      : 'text-red-600';
  };

  const getStatusDotColor = (status) => {
    return status === 'Approved'
      ? 'bg-green-500'
      : status === 'Pending'
      ? 'bg-yellow-400'
      : 'bg-red-500';
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 border border-gray-300 w-full mt-4">
      <div className="flex flex-col border p-1 rounded border-gray-400 md:flex-row md:items-center justify-between gap-3 mb-4">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search By User Name"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>

        <div className="flex gap-2 items-center">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-400 bg-gray-200 cursor-pointer hover:bg-gray-300 text-sm rounded-md px-3 py-2"
          >
            <option value="">Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="reject">Reject</option>
          </select>
          <select
            value={genderFilter}
            onChange={(e) => {
              setGenderFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-400 bg-gray-200 cursor-pointer hover:bg-gray-300 text-sm rounded-md px-3 py-2"
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            {/* <option value="Others">Others</option> */}
          </select>
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 text-sm border border-gray-400 bg-gray-200 cursor-pointer hover:bg-gray-300 rounded-md flex items-center gap-1"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300 text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-2">User ID</th>
              <th className="p-2 cursor-pointer" onClick={() => toggleSort('name')}>
                User Name ⬍
              </th>
              <th className="p-2 cursor-pointer" onClick={() => toggleSort('location')}>
                Location ⬍
              </th>
              <th className="p-2 cursor-pointer" onClick={() => toggleSort('gender')}>
                Gender ⬍
              </th>
              <th className="p-2 cursor-pointer" onClick={() => toggleSort('joined')}>
                Joined ⬍
              </th>
              <th className="p-2">Verified</th>
              <th className="p-2">Status</th>
              <th className="p-2">Last Active</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-t border-gray-300 text-gray-600">
                <td className="p-2">{user.id}</td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.location || 'Not Mention'}</td>
                <td className="p-2">{user.gender || 'Not Mention'}</td>
                <td className="p-2">{user.joined}</td>
                <td className="p-2">
                  {(user.verified === true || user.verified === 'true') ? (
                    <button className="inline-flex items-center justify-center w-24   rounded font-medium text-black gap-2">
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-green-700 rounded-sm font-bold text-white">
                            ✔
                          </span>
                          Yes
                        </button>
                  ) : (
                    <span className="flex items-center gap-1 text-red-600">
                       <span className="text-red-500 w-[75px] justify-center flex  text-lg font-bold">✘ no</span>
                    </span>
                  )}
                </td>
                <td className="p-2">
                  <span className={`flex items-center gap-1 ${getStatusColor(user.status)}`}>
                    <span className={`w-2 h-2 rounded-full ${getStatusDotColor(user.status)}`} />
                    {user.status}
                  </span>
                </td>
                <td className="p-2">{user.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4 text-sm text-gray-600 space-x-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className="px-2 py-1 border border-gray-300 rounded-md"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border border-gray-300 rounded-md ${
              currentPage === i + 1 ? 'bg-gray-200 font-semibold' : ''
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          className="px-2 py-1 border border-gray-300 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
}
