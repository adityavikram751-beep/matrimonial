import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { API_URL } from '../api/apiURL';
import ReportModal from './ReportModal';

const ReportedContent = ({ report, currentPage, totalPages, setCurrentPage, itemsPerPage, refreshReports }) => {
  const [selectedReport, setSelectedReport] = useState(null);

  const openModal = (report) => setSelectedReport(report);
  const closeModal = () => setSelectedReport(null);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  if (!report) return null;

  const {
    reporter,
    reportedUser,
    title,
    description,
    image,
    status,
    createdAt,
  } = report;


  const getStatusBadge = (status) => {
    const base = 'px-2 py-1 rounded-full text-xs font-medium';
    switch (status.toLowerCase()) {
      case 'reviewed': return `${base} bg-green-100 text-green-800`;
      case 'pending': return `${base} bg-yellow-100 text-yellow-800`;
      case 'blocked': return `${base} bg-red-100 text-red-800`;
      default: return `${base} bg-gray-100 text-gray-800`;
    }
  };

  // for Approve start
const handleAction = async (action, report) => {
  try {
    // console.log("Received report object:", report);

    if (!report || !report._id) {
      alert("Report ID is missing");
      return;
    }

    const res = await fetch(`${API_URL}/admin/report/block/${report._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: action === 'approve' ? 'Reviewed' : 'Blocked',
      }),
    });

    const data = await res.json();
    // console.log('API Response:', data);

    if (data.success) {
      alert(`Report has been ${action === 'approve' ? 'approved' : 'rejected'}`);
      onClose();
      refreshReports();
    } else {
      alert(data.message || 'Something went wrong');
    }
  } catch (err) {
    console.error('Error in handleAction:', err);
    alert('Error processing action');
  }
};

  // for Approve end


  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-400 overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-gray-600 border border-gray-400">
            <th className="py-3 px-4">Reported User</th>
            <th className="py-3 px-4">Report Date</th>
            <th className="py-3 px-4">Reporter User</th>
            <th className="py-3 px-4">Reason</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {report.map((report) => (
            <tr key={report._id} className="border border-gray-400 hover:bg-gray-50">
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <img
                    src={report.reportedUser?.avatar || report.reportedUser?.profileImage || '/default-profile.png'}
                    alt="Reported User"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium">{report.reportedUser?.name}</div>
                    <div className="text-xs text-gray-500">{report.reportedUser?.id}</div>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">{new Date(report.reportDate).toLocaleDateString()}</td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <img
                    src={report.reporter?.avatar || report.reporter?.profileImage || '/default-profile.png'}
                    alt="Reporter"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium">{report.reporter?.name}</div>
                    <div className="text-xs text-gray-500">{report.reporter?.id}</div>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">{report.title}</td>
              <td className="py-3 px-4">
                <span className={getStatusBadge(report.status)}>{report.status}</span>
              </td>
              <td className="mt-2 pr-3 flex gap-3">                
                <button
                  onClick={() => openModal(report)}
                  className="flex items-center gap-1 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
                >
                  <Eye className="w-4 h-4" /> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedReport && (
        <ReportModal
          report={selectedReport}
          onClose={closeModal}
          refreshReports={refreshReports}
        />
      )}


      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3 text-sm text-gray-600">
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">Prev</button>
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-2 py-1 border rounded ${page === currentPage ? 'bg-blue-500 text-white border-blue-500' : 'hover:bg-gray-100'}`}
              >
                {page}
              </button>
            )
          })}
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">Next</button>
        </div>
        <div className="text-sm">Items per page: {itemsPerPage}</div>
      </div>
    </div>
  )
};

export default ReportedContent;
