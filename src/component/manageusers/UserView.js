import React from 'react';
import { API_URL } from '../api/apiURL';
import Image from 'next/image';

const UserDetailCard = ({ user }) => {
  const formatDate = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleApproval = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/admin/user-manage/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adminApprovel: status }),
      });

      const data = await res.json();

      if (data.success) {
        alert(`User has been ${status}.`);
        window.location.reload();

      } else {
        console.error(`Failed to ${status} user:`, data.message);
        alert(`Failed to ${status}: ${data.message}`);
      }
    } catch (error) {
      console.error(`${status} error:`, error);
      alert(`${status} error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100">
      {/* Top Header */}
      <div className="flex items-center space-x-6 bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col items-center relative">
          <img
            src={user.profileImage || '/default-avatar.png'}
            alt={user.fullName}
            className="w-24 h-24 rounded-full object-cover border"
          />
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium
    ${user.adminApprovel === 'approved' ? 'bg-red-700 text-white' :
                user.adminApprovel === 'reject' ? 'bg-red-700  text-white font-bold' :
                  'bg-red-600 text-white'}
  `}
          >
            {user.adminApprovel}
          </span>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold">
            {`${user.firstName || ''} ${user.lastName || ''}`.trim()}
          </h2>
          <p className="text-gray-500">
            #{user._id?.slice(-6)} / {user.gender}
          </p>
          <p className="text-gray-600 flex gap-2">
            <Image src="/location.png" width={17} height={25} alt="Location" /> {user.city}
          </p>
        </div>
      </div>

      <TableSection
        title="Personal Information"
        data={[
          ['Full Name', user.fullName],
          ['DOB', formatDate(user.dateOfBirth)],
          ['Gender', user.gender],
          ['Marital Status', user.maritalStatus],
          ['Religion', user.religion],
          ['Education', user.highestEducation],
          ['Profession', user.occupation],
          ['Income Range', user.annualIncome],
          ['Height', user.height],
          ['Mother Tongue', user.motherTongue],
        ]}
        twoColumn
      />

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <TableSection
          title="Family Background"
          data={[
            ['Father Occ', user.fatherOccupation],
            ['Mother Occ', user.motherOccupation],
            ['Family Inc', user.familyIncome],
            ['Brother', user.brother || '0'],
            ['Family Type', user.familyType],
          ]}
        />
        <TableSection
          title="Career, Education"
          data={[
            ['Post Grad', user.postGraduation],
            ['Under Grad', user.underGraduation],
            ['Employee In', user.employedIn],
            ['Profession', user.occupation],
            ['Company', user.company],
          ]}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <TableSection
          title="Lifestyle & Hobbies"
          data={[
            ['Dietary Habit', user.diet],
            ['Drinking Habit', user.drinking],
            [
              'Assets',
              `${user.ownCar ? 'own a car' : ''}${user.ownCar && user.ownHouse ? ', ' : ''
              }${user.ownHouse ? 'house' : ''}` || 'N/A',
            ],
            ['Fav Vacation', user.vacationDestination?.join(', ') || 'N/A'],
            ['Fav Movie', user.movies?.join(', ') || 'N/A'],
          ]}
        />
        <TableSection
          title=""
          data={[
            ['Hobbies', user.hobbies?.join(', ') || 'N/A'],
            ['Sports', user.sports?.join(', ') || 'N/A'],
            ['Interest', user.interests?.join(', ') || 'N/A'],
            ['Fav Cuisine', user.cuisine?.join(', ') || 'N/A'],
            ['Fav Color', user.favoriteColor || 'N/A'],
          ]}
        />
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <button
          onClick={() => handleApproval(user._id, 'reject')}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
          disabled={user.adminApprovel === 'reject'}
        >
          Reject
        </button>
        <button
          onClick={() => handleApproval(user._id, 'approved')}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          disabled={user.adminApprovel === 'approved'}
        >
          Approve
        </button>
      </div>
    </div>
  );
};

const TableSection = ({ title, data, twoColumn = false }) => (
  <div className="bg-white rounded-lg shadow-md p-4">
    {title && (
      <h3 className="text-xl font-semibold text-gray-700 mb-4">{title}</h3>
    )}
    <table className="w-full text-sm text-gray-700 border-collapse">
      <thead>
        <tr className="text-left bg-gray-100">
          <th className="p-2 font-medium">Data</th>
          <th className="p-2 font-medium">Info</th>
          {twoColumn && (
            <>
              <th className="p-2 font-medium">Data</th>
              <th className="p-2 font-medium">Info</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {twoColumn
          ? data
            .reduce((rows, val, idx, arr) => {
              if (idx % 2 === 0) rows.push([val, arr[idx + 1]]);
              return rows;
            }, [])
            .map((pair, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-2">{pair[0]?.[0]}</td>
                <td className="p-2">{pair[0]?.[1] || 'N/A'}</td>
                <td className="p-2">{pair[1]?.[0] || ''}</td>
                <td className="p-2">{pair[1]?.[1] || 'N/A'}</td>
              </tr>
            ))
          : data.map(([label, value], idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{label}</td>
              <td className="p-2">{value || 'N/A'}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);

export default UserDetailCard;
