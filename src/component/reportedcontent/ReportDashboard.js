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

  // ⭐ TOP CARDS — DATA DIRECTLY FROM TABLE DATA ⭐
  const totalReports = reports.length;

  const pendingReports = reports.filter(
    (r) => r.status?.toLowerCase() === 'pending'
  ).length;

  const reviewedReports = reports.filter(
    (r) => r.status?.toLowerCase() === 'reviewed' || r.status?.toLowerCase() === 'approved'
  ).length;

  const blockedReports = reports.filter(
    (r) => r.status?.toLowerCase() === 'blocked'
  ).length;

  const formatK = (num) =>
    num >= 1000 ? (num / 1000).toFixed(1) + ' K' : num;

  return (
    <div className="p-5">

      {/* ⭐ TOP CARDS — AUTO FROM TABLE DATA ⭐ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-10 mb-10">
        {[
          { label: 'Total Reports This Week', value: totalReports },
          { label: 'Pending Report Review', value: pendingReports },
          { label: 'Action Taken', value: reviewedReports },
          { label: 'Blocked User', value: blockedReports },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-white border border-gray-300 rounded-xl shadow-sm p-6 flex flex-col justify-center items-center"
            style={{ height: "150px" }}
          >
            <p className="text-lg font-semibold text-gray-800 text-center">{label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-4">{formatK(value)}</p>
          </div>
        ))}
      </div>

      {/* SEARCH + FILTER + TABLE */}
      <div className="border mt-5 p-4 bg-white border-gray-400 rounded">

        {/* SEARCH BAR */}
        <div className="bg-gray-100 p-2 rounded-lg shadow-sm border border-gray-400 mb-2">
          <div className=" flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div className=" relative w-full  md:max-w-sm">
              <Search className=" absolute left-3 top-1/2 transform -translate-y-1/2  text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => {
                  setCurrentPage(1);
                  setSearchTerm(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-2  bg-white border  border-gray-400 rounded-lg focus:ring-2 focus:ring-gray-200"
              />
            </div>

            {/* FILTERS */}
            <div className="flex flex-wrap gap-3">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setCurrentPage(1);
                  setStatusFilter(e.target.value);
                }}
                className="px-3 py-2 border bg-gray-300 border-gray-400 rounded-lg"
              >
                <option value="all"> Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="blocked">Blocked</option>
              </select>

              <select
                value={genderFilter}
                onChange={(e) => {
                  setCurrentPage(1);
                  setGenderFilter(e.target.value);
                }}
                className="px-3 py-2 border bg-gray-300 border-gray-400 rounded-lg"
              >
                <option value=""> Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

          </div>
        </div>

        {/* TABLE */}
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
