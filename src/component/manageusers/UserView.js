'use client';
import React from 'react';
import Image from 'next/image';

const UserDetailCard = ({ user }) => {
  const formatDate = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    if (isNaN(d)) return 'N/A';
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100">

      {/* TOP PROFILE */}
      <div className="flex items-center space-x-6 mb-10">
        <div className="flex flex-col items-center relative">
          <img
            src={user.profileImage || '/default-avatar.png'}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border"
          />

          <span
            className={`mt-2 px-4 py-1 rounded-full text-sm font-semibold capitalize 
              ${user.adminApprovel === 'approved'
                ? 'bg-green-600 text-white'
                : user.adminApprovel === 'reject'
                ? 'bg-red-700 text-white'
                : 'bg-green-600 text-white'
              }`}
          >
            {user.adminApprovel}
          </span>
        </div>

        <div className="flex-1">
          <h2 className="text-3xl font-bold">
            {user.firstName} {user.lastName}
          </h2>

          <p className="text-gray-500 text-lg font-medium">
            #{user._id?.slice(-6)} / {user.gender}
          </p>

          <p className="flex items-center gap-2 text-gray-600 text-lg mt-1 font-medium">
            <Image src="/location.png" width={18} height={20} alt="Location" />
            {user.city}
          </p>
        </div>
      </div>

      {/* PERSONAL INFORMATION */}
      <SectionBox
        title="Personal Information"
        twoColumn
        data={[
          ['Full Name', `${user.firstName} ${user.lastName}`],
          ['Education', user.highestEducation],
          ['DOB', formatDate(user.dateOfBirth)],
          ['Profession', user.designation || user.employedIn],
          ['Gender', user.gender],
          ['Income Range', user.annualIncome],
          ['Marital Status', user.maritalStatus],
          ['Height', user.height],
          ['Religion', user.religion],
          ['Mother Tongue', user.motherTongue],
        ]}
      />

      {/* FAMILY + CAREER */}
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <SectionBox
          title="Family Background"
          data={[
            ['Father Occ', user.fatherOccupation],
            ['Mother Occ', user.motherOccupation],
            ['Family Inc', user.familyIncome],
            ['Brother', user.brother || '0'],
            ['Family Type', user.familyType],
          ]}
        />

        <SectionBox
          title="Career, Education"
          data={[
            ['Post Grad', user.postGraduation],
            ['Under Grad', user.underGraduation],
            ['Employee In', user.employedIn],
            ['Profession', user.designation || user.employedIn],
            ['Company', user.company],
          ]}
        />
      </div>

      {/* LIFESTYLE & HOBBIES */}
      <div className="mt-8">
        <SectionBox
          title="Lifestyle & Hobbies"
          twoColumn
          data={[
            ['Dietary Habit', user.diet],
            ['Hobbies', user.hobbies?.join(', ') || 'N/A'],

            ['Drinking Habit', user.drinking],
            ['Sports', user.sports?.join(', ') || 'N/A'],

            [
              'Assets',
              `${user.ownCar ? 'own a car' : ''}${user.ownCar && user.ownHouse ? ', ' : ''}${user.ownHouse ? 'house' : ''}` ||
                'N/A'
            ],
            ['Interest', user.interests?.join(', ') || 'N/A'],

            ['Fav Vacation', user.vacationDestination?.join(', ') || 'N/A'],
            ['Fav Cuisine', user.cuisine?.join(', ') || 'N/A'],

            ['Fav Movie', user.movies?.join(', ') || 'N/A'],
            ['Fav Color', user.favoriteColor || 'N/A'],
          ]}
        />
      </div>
    </div>
  );
};

/* ================= SECTION BOX (EXACT SCREENSHOT) ================= */
const SectionBox = ({ title, data, twoColumn = false }) => {
  const rows = twoColumn
    ? data.reduce((acc, cur, i) => {
        if (i % 2 === 0) acc.push([cur, data[i + 1]]);
        return acc;
      }, [])
    : data;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-400">
      {title && (
        <h3 className="text-xl font-semibold mb-4 text-gray-900">{title}</h3>
      )}

      <table className="w-full text-gray-700 text-[15px] border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left border-b border-gray-400">
            <th className="p-3 font-medium border-r border-gray-300">Data</th>
            <th className="p-3 font-medium border-r border-gray-300">Info</th>

            {twoColumn && (
              <>
                <th className="p-3 font-medium border-r border-gray-300">
                  Data
                </th>
                <th className="p-3 font-medium">Info</th>
              </>
            )}
          </tr>
        </thead>

        <tbody>
          {twoColumn
            ? rows.map((pair, i) => (
                <tr key={i} className="border-t border-gray-300">
                  <td className="p-3 border-r border-gray-300">
                    {pair[0]?.[0]}
                  </td>
                  <td className="p-3 border-r border-gray-300">
                    {pair[0]?.[1] || 'N/A'}
                  </td>

                  <td className="p-3 border-r border-gray-300">
                    {pair[1]?.[0] || ''}
                  </td>
                  <td className="p-3">{pair[1]?.[1] || 'N/A'}</td>
                </tr>
              ))
            : rows.map(([label, value], i) => (
                <tr key={i} className="border-t border-gray-300">
                  <td className="p-3 border-r border-gray-300">{label}</td>
                  <td className="p-3">{value || 'N/A'}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetailCard;
