// pages/auth/login.js
'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { API_URL } from '../api/apiURL';


export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (data) => {
    setLoading(true);
    setError('');

    try {
      const res = await axios.post(`${API_URL}/auth/admin/login`, {
        email: data.email,
        password: data.password,
      });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative">
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm brightness-50"
        style={{ backgroundImage: "url('/bg.png')" }}
      />
      {loading ? (
        <div className="relative w-full h-screen">
          <Image
            src="/bg.png"
            alt="Logging in"
            fill
            className="object-cover blur-sm"
            priority
          />
          <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
            <div className="bg-opacity-10 backdrop-blur-md px-8 py-8 rounded-xl text-center shadow-2xl border border-white/20">
              <h1 className="text-white text-xl font-semibold mb-4">Logging In</h1>
              <div className="flex items-center justify-center space-x-2">
                <span className="w-3 h-3 bg-white rounded-full animate-bounce" />
                <span className="w-3 h-3 bg-white rounded-full animate-bounce delay-200" />
                <span className="w-3 h-3 bg-white rounded-full animate-bounce delay-400" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="relative z-10 w-full max-w-md px-8 py-10 flex flex-col items-center">
            {/* <img
              src="/profile.png"
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-white shadow-md mb-4"
            /> */}
            {/* <h2 className="text-white text-xl font-semibold">Sanjay</h2>
            <p className="text-gray-300 text-sm mb-6">Super Admin</p> */}

            <div className="relative z-10 w-full max-w-md px-8 py-10 bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-blue-400 flex flex-col items-center">
              <form
                onSubmit={handleSubmit(handleLogin)}
                className="w-full flex flex-col space-y-4"
              >
                <div>
                  <input
                    {...register('email', { required: 'Email is required' })}
                    type="email"
                    placeholder="Admin Email"
                    className="w-full px-4 py-2 rounded-md bg-white text-black shadow-inner"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    {...register('password', { required: 'Password is required' })}
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 rounded-md bg-white text-black shadow-inner"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                  type="submit"
                  className="bg-red-700 hover:bg-red-800 text-white py-2 rounded-md font-semibold transition duration-300"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




// // pages/login.js
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import { useState } from 'react';

// export default function LoginPage() {
//   const router = useRouter();
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleLogin = async (data) => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.post(
//         'https://bxcfrrl4-3000.inc1.devtunnels.ms/auth/admin/login',
//         data
//       );

//       const { token, user } = response.data;
//       localStorage.setItem('token', token);

//       // Optionally store user details
//       localStorage.setItem('user', JSON.stringify(user));

//       router.push('/dashboard');
//     } catch (err) {
//       console.error(err);
//       setError('Invalid email or password');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit(handleLogin)}
//         className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm"
//       >
//         <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
//           <input
//             {...register('email', { required: true })}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
//             type="email"
//             placeholder="Email"
//           />
//           {errors.email && <p className="text-red-500 text-xs mt-1">Email is required</p>}
//         </div>

//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
//           <input
//             {...register('password', { required: true })}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
//             type="password"
//             placeholder="Password"
//           />
//           {errors.password && <p className="text-red-500 text-xs mt-1">Password is required</p>}
//         </div>

//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
//         >
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//     </div>
//   );
// }
