'use client';
import React from 'react';
import Search from '@/src/component/Profile details/Search';
import ProfileCard from '@/src/component/Profile details/ProfileDetails';
const profileTitles = [
  { label: 'Profile For', api: 'profile-for' },
  { label: 'Religion', api: 'religion' },
  { label: 'Caste', api: 'caste' },
  { label: 'Communities', api: 'communities' },
  { label: 'Diet', api: 'diet' },
  { label: 'Color', api: 'color' },
  { label: 'Marital Status', api: 'marital-status' },
  { label: 'Mother Tongue', api: 'mother-tongue' },
  { label: 'Family Status', api: 'family-status' },
  { label: 'State', api: 'state' },
  { label: 'City', api: 'city' },
  { label: 'Education', api: 'education' },
  { label: 'Employed In', api: 'employed-in' },
  { label: 'Designation', api: 'designation' },
];


export default function ProfilePage() {

  return (
    <>
      <Search />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profileTitles.map((item, idx) => (
            <ProfileCard key={idx} title={item.label} apiPath={item.api} />
          ))}
        </div>
      </div>
    </>
  );
}
