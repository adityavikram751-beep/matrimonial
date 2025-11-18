// pages/admin/profile.js
import React, { useEffect, useState } from 'react';
// import ProfileCard from '@/src/component/profile/ProfileCard';
// import EditModal from '@/src/component/profile/EditModal';
// import Search from '@/src/component/profile/Search';
import ChangePasswordModal from '@/src/component/profile/ChangePasswordModel';
import PreferenceModal from '@/src/component/profile/PreferenceModal';
import LeftProfileCard from '@/src/component/profile/LeftProfileCard';
// import { Pencil } from 'lucide-react';
import Image from 'next/image';
// import { API_URL } from '../api/apiURL';


import { FiEdit } from "react-icons/fi";


const AdminProfilePage = () => {
  const [adminDetails ,Details] = useState('')
  const [profile, setProfile] = useState({
    fullName: 'Parul Gurg',
    role: 'Super Admin',
    email: 'Parul.adminXYZ@gmail.com',
    phone: '+91 11101011',
    region: 'North Zone / All India',
    image: '/profile.png',
    isOnline: true,
  });

  const [preferences, setPreferences] = useState({
    language: 'English',
    landingPage: 'Dashboard',
    theme: 'Light',
    notifications: true,
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPreferenceModal, setShowPreferenceModal] = useState(false);

  const handleProfileSave = (updatedData) => {
    setProfile((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  const handlePreferenceSave = (data) => {
    setPreferences(data);
  };

  const handlePasswordChange = (newPassword) => {
    console.log('Password updated:', newPassword);
  };

// useEffect(() => {
//   async function adminLoginDetails() {
//     const adminDetails = await fetch(`${API_URL}/auth/admin/login`);
//     const details = await adminDetails.json();
//     console.log(details);
//   }

//   adminLoginDetails();
// }, []);
useEffect(()=>{
    const getToken = JSON.parse(localStorage.getItem('user'))
    Details(getToken)
},[])
  return (
    <>
      {/* <Search /> */}
      <header className='flex justify-between fixed bg-gray-50 z-50 w-[1274px] shadow-xl items-center p-4'>
        <div><h1 className='font-bold text-black'>Admin Profile</h1></div>
        <div><Image src='/notification.png' width={36} height={36} alt='notification' /></div>
      </header>
      <div className="min-h-screen bg-gray-50 px-4 mt-[66px] p-5 py-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/3">
            <div className="relative w-[200px] h-[200px] mb-4 flex flex-col items-center">
              {/* Profile Image */}
              <div className="w-full h-full rounded-full bg-red-100 relative overflow-hidden">
                <Image
                  src={profile.image}
                  alt="Profile-img"
                  fill
                  className="rounded-full object-cover"
                />
              </div>

              {/* Edit Button - Positioned over bottom of image */}
              <button className="absolute bottom-[-10px] bg-green-700 px-5 py-2 cursor-pointer rounded text-white font-bold">
                Edit Profile
              </button>
            </div>
            <div className='mt-5'>
              <p>{adminDetails.email}</p>
              <div className='flex items-center gap-2 text-sm mt-5'>
                <span className="w-[10px] h-[10px] bg-green-700 rounded-full inline-block"></span>
                <span>Active Now</span>
              </div>
              <div className='flex items-center gap-2 text-sm mt-1'>
                <span className=""><Image src="/password lock.png" width={10} height={10} alt="change-Password" /></span>
                <span>Change Password</span>
              </div>
            </div>
          </div>

          <div className="w-full gap-4">
            <div className="bg-amber-50 rounded-lg p-4 border border-gray-300 relative">
              <div
                className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded cursor-pointer"
                onClick={() => setShowEditModal(true)}
              >
                {/* <Pencil size={16} /> */}
                <button className='cursor-pointer'><FiEdit /></button>
              </div>
              <h2 className="font-semibold text-lg mb-2">Basic Info</h2>
              <div className="space-y-1 p-5 text-sm sm:text-base">
                <div className='flex gap-[300px] '>
                  <strong className='w-[160]'>Full Name</strong>
                  {/* <p>:{profile.fullName}</p> */}
                  <p>: {adminDetails?.name}</p>
                  
                </div>

                <div className='flex gap-[300px] py-1'>
                  <strong className='w-[160]'>Role</strong>
                  <p>: {profile.role}</p>
                </div>

                <div className='flex gap-[300px] py-1'>
                  <strong className='w-[160]'>E-mail Address</strong>
                  {/* <p>:{profile.email}</p> */}
                  <p>: {adminDetails.email}</p>
                  {/* <p>{adminDetails.fullName}</p> */}
                </div>

                <div className='flex gap-[300px] py-1'>
                  <strong className='w-[160]'>Phone</strong>
                  <p>: {profile.phone}</p>
                </div>


                <div className='flex gap-[300px] py-1'>
                  <strong className='w-[160]'>Assigned Region</strong>
                  <p>: {profile.region}</p>
                </div>


                {/* <p><strong>Full Name:</strong> {profile.fullName}</p>
                <p><strong>Role:</strong> {profile.role}</p>
                <p><strong>E-mail address:</strong> {profile.email}</p>
                <p><strong>Phone:</strong> {profile.phone}</p>
                <p><strong>Assigned Region:</strong> {profile.region}</p> */}
              </div>
            </div>

            <div className="bg-amber-50 rounded-lg p-4 mt-5 border border-gray-300 relative">
              <div
                className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded cursor-pointer"
                onClick={() => setShowPasswordModal(true)}
              >
                {/* <Pencil size={16} /> */}
                <button className='cursor-pointer'><FiEdit /></button>
              </div>
              <h2 className="font-semibold text-lg mb-2">Security Setting</h2>
              <div className="space-y-1 text-sm sm:text-base">
                <div className='flex gap-[300px] py-1'>
                  <strong className='w-[150]'>Change Password</strong>
                  <p>: XXXXXXXXXX</p>
                </div>

                <div className='flex gap-[200px] py-1'>
                  <strong className='w-[250]'>Two factor Authentication</strong>
                  <p>: on/off</p>
                </div>

                <div className='flex gap-[270px] py-1'>
                  <strong className='w-[180]'>Recently login device</strong>
                  <p>:dell </p>
                </div>

                <div className='flex gap-[250px] py-1'>
                  <strong className='w-[200]'>Alert On suspicious login</strong>
                  <p>:on/off</p>
                </div>
                {/* <p><strong>Change Password:</strong> *******</p> */}
                {/* <div className="flex justify-between py-1">
                  <span>Two Factor Authentication</span>
                  <span className="text-blue-600 font-semibold">On</span>
                </div> */}
                {/* <p><strong>Recent login Device:</strong> Desktop XYZ</p> */}
                {/* <div className="flex justify-between py-1">
                  <span>Alert on suspicious login</span>
                  <span className="text-blue-600 font-semibold">On</span>
                </div> */}
              </div>
            </div>

            <div className="bg-amber-50 rounded-lg p-4 border mt-5 border-gray-300 relative col-span-1 md:col-span-2">
              <div
                className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded cursor-pointer"
                onClick={() => setShowPreferenceModal(true)}
              >
                {/* <Pencil size={16} /> */}
                <button className='cursor-pointer'><FiEdit /></button>
              </div>
              <h2 className="font-semibold text-lg mb-2">Preferences / Personalization</h2>
              <div className="space-y-1 text-sm sm:text-base">
                <div className='flex gap-[300px] py-1'>
                  <strong className='w-[160]'>Language</strong>
                  <p>:English</p>
                </div>

                <div className='flex gap-[300px] py-1'>
                  <strong className='w-[160]'>default landing page</strong>
                  <p>:Dashboard</p>
                </div>

                <div className='flex gap-[300px] py-1'>
                  <strong className='w-[160]'>Theame</strong>
                  <p>:Light</p>
                </div>



                <div className='flex gap-[300px] py-1'>
                  <strong className='w-[160]'>Notification</strong>
                  <p>:on/off</p>
                </div>

                {/* <p><strong>Language:</strong> {preferences.language}</p> */}
                {/* <p><strong>Default landing page:</strong> {preferences.landingPage}</p> */}
                {/* <p><strong>Theme:</strong> {preferences.theme === 'Light' ? '☀️ Light' : '🌙 Dark'}</p> */}
                {/* <div className="flex justify-between py-1">
                  <span>Notifications</span>
                  <span className="text-blue-600 font-semibold">
                    {preferences.notifications ? 'On' : 'Off'}
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        {showEditModal && (
          <EditModal
            defaultValues={profile}
            onSave={handleProfileSave}
            onClose={() => setShowEditModal(false)}
          />
        )}

        {showPasswordModal && (
          <ChangePasswordModal
            onChange={handlePasswordChange}
            onClose={() => setShowPasswordModal(false)}
          />
        )}

        {showPreferenceModal && (
          <PreferenceModal
            defaultValues={preferences}
            onSave={handlePreferenceSave}
            onClose={() => setShowPreferenceModal(false)}
          />
        )}
      </div>
    </>
  );
};

export default AdminProfilePage;



