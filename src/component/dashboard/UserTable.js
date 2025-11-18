import { useEffect, useState } from 'react';
import { API_URL } from '../api/apiURL';
// import Papa from 'papaparse';
import jsPDF from 'jspdf';
import Image from 'next/image';


export default function UsersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        search,
        status: statusFilter,
        gender: genderFilter,
        page: currentPage,
        limit: usersPerPage,
      });

      const response = await fetch(`${API_URL}/admin/getUser?${params.toString()}`);



      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setUsers(data.data || []);
      setTotalPages(data.totalPages || 1);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);

    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, statusFilter, genderFilter, currentPage]);

  // const handleExportCSV = () => {
  //    const csv = Papa.unparse(users);
  //       const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  //       const url = URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.href = url;
  //       a.download = 'users.csv';
  //       a.click();
  // };




  const handleExportPDF = () => {
  const doc = new jsPDF();

  const headers = Object.keys(users[0]);

  const rows = users.map(user => headers.map(header => user[header]));

  doc.text('User Data', 10, 10);

  let y = 20;

  headers.forEach((header, i) => {
    doc.text(header, 10 + (i * 40), y);
  });

  
  rows.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      doc.text(String(cell), 10 + (cellIndex * 40), y + 10 + (rowIndex * 10));
    });
  });

  doc.save('users.pdf');
};



  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="p-6 max-w-full mx-[-12px]">
      <div className="bg-white rounded-xl shadow border border-gray-400 p-4">
        <div className="flex border-1 p-1 rounded flex-wrap justify-between items-center mb-4 gap-4">
          <div className='flex items-center gap-2 p-2 shadow border border-[rgba(255, 255, 255, 1)] rounded-xl'>
            <Image src="/search.png" width={20} height={20} alt='Saerch'/>
            <input
            type="text"
            placeholder="Search By User Name"
            className="border-none focus:outline-0"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          </div>
          

          <div className="flex   gap-2 flex-wrap">
            <select
              className="border px-1 bg-gray-200 hover:bg-gray-100 transition ease-in-out cursor-pointer  rounded"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">Status</option>
              <option>approved</option>
              <option>pending</option>
              <option>blocked</option>
            </select>

            <select
              className="border bg-gray-200 hover:bg-gray-100 px-2 py-2 cursor-pointer rounded text-sm"
              value={genderFilter}
              onChange={(e) => {
                setGenderFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <button
              onClick={handleExportPDF}
              className="bg-gray-200 border px-4 py-2 rounded cursor-pointer text-sm hover:bg-gray-100"
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto">
          <table className="min-w-full text-sm border-t border-gray-400">
            <thead className="bg-gray-100">
              <tr>
                {[
                  'User ID',
                  'User Name',
                  'Location',
                  'Gender',
                  'Joined',
                  'Verified',
                  'Status',
                  'Last Active',
                ].map((head) => (
                  <th
                    key={head}
                    className="text-left px-3 py-2 border-b border-gray-400"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="flex ml-[400px] items-center justify-center w-100 py-4">
                    <Image className='text-center' src="/loading2.gif" width={100} height={100} alt='loading..' />
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((user, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-600 hover:bg-gray-50"
                  >
                    <td className="px-3 py-2">{user.id}</td>
                    <td className="px-3 py-2">{user.name}</td>
                    <td className="px-3 py-2">{user.location}</td>
                    <td className="px-3 py-2">{user.gender}</td>
                    <td className="px-3 py-2">{user.joined}</td>
                    <td className="px-3 py-2">
                      {user.status === 'approved' ? (
                        <button className="inline-flex items-center justify-center w-24 h-10  rounded font-medium text-black gap-2">
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-green-700 rounded-sm font-bold text-white">
                            ✔
                          </span>
                          Yes
                        </button>
                      ) : (
                        <span className="text-red-500 w-[75px] justify-center flex  text-lg font-bold">✘ no</span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <span className="flex items-center gap-2">
                        <span
                          className={`w-3 h-3 rounded-full ${user.status === 'approved'
                              ? 'bg-[]'
                              : user.status === 'Pending'
                                ? 'bg-yellow-400'
                                : 'bg-red-500'
                            }`}
                        ></span>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-3 py-2">{user.lastActive}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center text-gray-500 py-4 italic"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2 mt-6 text-sm text-gray-600">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:underline'
              }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => changePage(page)}
                  className={`px-3 py-1 rounded ${currentPage === page
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'hover:text-blue-600'
                    }`}
                >
                  {page}
                </button>
              );
            } else if (
              (page === currentPage - 2 && page !== 2) ||
              (page === currentPage + 2 && page !== totalPages - 1)
            ) {
              return <span key={page}>...</span>;
            }
            return null;
          })}

          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:underline'
              }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}