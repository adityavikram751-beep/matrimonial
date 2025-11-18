'use client';
import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import ReportedContent from './ReportedContent';
import { API_URL } from '../api/apiURL';

const ReportDashboard = () => {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchReports = async () => {
    try {
      const res = await fetch(
        `${API_URL}/admin/report-analize?search=${searchTerm}&status=${statusFilter}&gender=${genderFilter}&page=${currentPage}&limit=${itemsPerPage}`
      );
      const data = await res.json();
      setReports(data.reports || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error('Failed to fetch reports:', err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [searchTerm, statusFilter, genderFilter, currentPage]);

  const totalReports = reports.length;
  const pendingReports = reports.filter((r) => r.status.toLowerCase() === 'pending').length;
  const reviewedReports = reports.filter((r) => r.status.toLowerCase() === 'reviewed').length;
  const blockedReports = reports.filter((r) => r.status.toLowerCase() === 'blocked').length;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Reported Content</h1>

      <div className="grid   grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mr-20 ml-20 h-30 w-ful gap-20 mb-6">
        {[
          { label: 'Total Reports', value: totalReports },
          { label: 'Pending Reports', value: pendingReports },
          { label: 'Reviewed Reports', value: reviewedReports },
          { label: 'Blocked Reports', value: blockedReports },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white flex justify-center items-center border-2 border-gray-300  p-4 rounded-lg shadow-lg">
            <div className='text-center'>
              <div className="text-xl text-gray-600">{label}</div>
              <div className="text-3xl mt-3 font-bold text-gray-900">{value}</div>
            </div>
          </div>
        ))}
      </div>


    <div className='border mt-5 p-4 border-gray-400 rounded'>
      <div className="bg-white  p-2 rounded-lg shadow-sm border border-gray-400 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => {
                setCurrentPage(1);
                setSearchTerm(e.target.value);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:border-0 rounded-lg focus:ring-2 focus:ring-gray-200
"
            />
          </div>

          {/* Dropdowns */}
          <div className="flex flex-wrap gap-3">
            <select
              value={statusFilter}
              onChange={(e) => {
                setCurrentPage(1);
                setStatusFilter(e.target.value);
              }}
              className="px-3 py-2 border bg-gray-300 border-gray-300   hover:bg-gray-200 cursor-pointer rounded-lg"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="blocked">Blocked</option>
            </select>

            <select
              value={genderFilter}
              onChange={(e) => {
                setCurrentPage(1);
                setGenderFilter(e.target.value);
              }}
              className="px-3 py-2 border border-gray-300 bg-gray-300 cursor-pointer   rounded-lg"
            >
              <option value="">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>



      <ReportedContent
        report={reports}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        refreshReports={fetchReports}
      />
    </div>
    </div>
  );
};

export default ReportDashboard;
