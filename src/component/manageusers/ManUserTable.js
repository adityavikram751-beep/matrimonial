'use client';
import { useEffect, useState } from 'react';
import { Check, X, Circle, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { API_URL } from '../api/apiURL';


export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const usersPerPage = 5;



  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: usersPerPage,
        search,
        statusFilter,
        genderFilter,
      });

      const res = await fetch(`${API_URL}/admin/user-manage?${queryParams}`);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      console.log(data);



      if (data.success) {
        setUsers(data.data);
        setTotalPages(data.totalPages);
      } else {
        setError(data.message || 'API Error fetching users.');
        console.error('API Error fetching users:', data.message);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch users.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, search, statusFilter, genderFilter]);

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`${API_URL}/admin/user-manage/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adminApprovel: 'approved' }),
      });

      const data = await res.json();



      if (data.success) {
        fetchUsers();
      } else {
        console.error('Failed to approve user:', data.message);
        alert(`Failed to approve: ${data.message}`);
      }
    } catch (error) {
      console.error('Approval error:', error);
      alert(`Approval error: ${error.message}`);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch(`${API_URL}/admin/user-manage/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adminApprovel: 'reject' }),
      });

      const data = await res.json();

      console.log(data)

      if (data.success) {
        fetchUsers();
      } else {
        console.error('Failed to reject user:', data.message);
        alert(`Failed to reject: ${data.message}`);
      }
    } catch (error) {
      console.error('Rejection error:', error);
      alert(`Rejection error: ${error.message}`);
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };


  return (
    <div className="overflow-x-auto bg-white border border-gray-300 shadow-md rounded-xl p-4 mt-4 w-full">
      <div className="flex flex-col md:flex-row md:items-center border p-1 rounded border-gray-400 justify-between gap-3 mb-4">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by name or mobile"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-md text-sm"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-400 bg-gray-200 cursor-pointer hover:bg-gray-300 text-sm rounded-md px-3 py-2"
          >
            <option value="">Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="reject">Rejected</option>
          </select>
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="border  text-sm border-gray-400 bg-gray-200 hover:bg-gray-200 rounded-md px-3 py-2"
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            {/* <option value="Others">Other</option> */}
          </select>
        </div>
      </div>

      {loading && <p className="flex justify-center items-center text-gray-500 py-4">
        <Image src="/loading2.gif" width={100} height={100} alt="loading.." />
      </p>}
      {error && <p className="text-center text-red-600 py-4">Error: {error}</p>}

      {!loading && !error && users.length === 0 && (
        <p className="p-4 text-center text-gray-500">No users found.</p>
      )}

      {!loading && !error && users.length > 0 && (
        <table className="min-w-full text-sm text-left border border-gray-300">
          <thead className="bg-gray-50 text-gray-700 font-medium">
            <tr>
              <th className="p-2 border border-gray-300 text-center">User ID</th>
              <th className="p-2 border border-gray-300">Name</th>
              <th className="p-2 border border-gray-300">Location</th>
              <th className="p-2 border border-gray-300">Joined</th>
              <th className="p-2 border border-gray-300 text-center">Verified</th>
              {/* <th className="p-2 border border-gray-300 text-center">CreateAt</th> */}
              <th className="p-2 border border-gray-300 text-center">Status</th>
              <th className="p-2 border border-gray-300 text-center">Actions</th>
              <th className="p-2 border border-gray-300 text-center">View</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id || idx} className="text-gray-700">
                <td className="p-2 border border-gray-300 text-center whitespace-nowrap">
                  {user._id ? user._id.slice(-5) : '-'}
                </td>
                <td className="p-2 border border-gray-300 flex items-center gap-3">
                  <img
                    src={user.profileImage || '/avatars/1.jpg'}
                    className="w-8 h-8 rounded-full object-cover"
                    alt="avatar"
                  />
                  <div className="flex flex-col">
                    <span>{`${user.firstName}  ${user.lastName}`}</span>
                    <span className="text-xs text-gray-500">{user.mobile} / {user.gender}</span>
                  </div>
                </td>
                <td className="p-2 border border-gray-300 whitespace-nowrap">{user.city || 'Not Mention'}</td>
                <td className="p-2 border border-gray-300 whitespace-nowrap">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 border border-gray-300 text-center">
                  {(user?.isMobileVerified === true || user?.isMobileVerified === 'true') ? (
                    <button className="inline-flex items-center justify-center w-24   rounded font-medium text-black gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-green-700 rounded-sm font-bold text-white">
                        ✔
                      </span>
                      Yes
                    </button>

                  ) : (

                    <span className="text-red-500  justify-center flex items-center  text-lg font-bold">
                      ✘ no

                    </span>
                  )}
                </td>
                {/* <td className='p-2 border border-gray-300 text-center'>{user.
                  updatedAt
                  || "Not Mention"}</td> */}
                <td className="p-2 border border-gray-300 text-center">
                  <span
                    className={`inline-flex items-center  gap-1 text-sm font-medium ${user.adminApprovel === 'approved'
                        ? 'text-green-600'
                        : user.adminApprovel === 'pending'
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}
                  >
                    <Circle
                      size={10}
                      className={
                        user.adminApprovel === 'approved'
                          ? 'text-green-700 bg-green-700 rounded-full'
                          : user.adminApprovel === 'pending'
                            ? 'bg-red-400 border-0 rounded-full'
                            : 'text-red-500'
                      }
                    />
                    {user.adminApprovel === 'approved' ? 'Approved' :
                      user.adminApprovel === 'reject' ? 'Rejected' :
                        user.adminApprovel}
                  </span>
                </td>
                <td className="p-2 border border-gray-300 text-center">
                  {user.adminApprovel === 'pending' ? (
                    <div className="flex justify-center items-center gap-1">
                      <button
                        className="px-2 py-0.5 text-xs text-white bg-green-500 rounded-md hover:bg-green-600"
                        onClick={() => handleApprove(user._id)}
                      >
                        Approve
                      </button>
                      {/* <button
                          className="px-2 py-0.5 text-xs text-white bg-red-500 rounded-md hover:bg-red-600"
                          onClick={() => handleReject(user._id)}
                        >
                          Reject
                        </button> */}
                    </div>
                  ) : user.adminApprovel === 'reject' ? (
                    <button
                      className="px-2 py-0.5 text-xs text-white bg-green-500 rounded-md hover:bg-green-600"
                      onClick={() => handleApprove(user._id)}
                    >
                      Approve
                    </button>
                  ) : (
                    <div className="flex justify-center items-center gap-1">
                      <button className="px-2 py-0.5 text-xs bg-gray-300 text-gray-700 rounded-md" disabled>
                        Approved
                      </button>
                      {/* <button
                          className="px-2 py-0.5 text-xs text-white bg-red-500 rounded-md hover:bg-red-600"
                          onClick={() => handleReject(user._id)} 
                        >
                          Reject
                        </button> */}
                    </div>
                  )}
                </td>
                <td className="p-2 border border-gray-300 text-center">

                  <Link href={`/manageusers/${user._id}`}>
                    {/* <Link href={`/user/${initialUsers.find(u => u.__id === user.__id)?.__id.replace('#', '')}`}> */}
                    <span className="text-sm text-black hover:underline cursor-pointer">View</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && !error && totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2 text-sm text-gray-700">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded border border-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 rounded border border-gray-300 ${currentPage === i + 1 ? 'bg-gray-200 font-semibold' : ''
                }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 rounded border border-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}