// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Pencil, Trash2, Save, X } from 'lucide-react';
// import { API_URL } from '@/src/component/api/apiURL';

// const ProfileCard = ({ title, apiPath }) => {
//   const [textInput, setTextInput] = useState('');
//   const [options, setOptions] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [editText, setEditText] = useState('');

//   const API_URL_DATA = `${API_URL}/api/master/${apiPath}`;

//   useEffect(() => {
//     fetchOptions();
//   }, []);

//   const fetchOptions = async () => {
//     try {
//       const res = await fetch(API_URL_DATA);
//       const data = await res.json();
//       setOptions(data);
//     } catch (err) {
//       console.error('Error fetching options:', err);
//     }
//   };

//   const addOption = async () => {
//     const trimmed = textInput.trim();
//     if (!trimmed) return;

//     try {
//       const res = await fetch(API_URL_DATA, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ value: trimmed }),
//       });
//       const data = await res.json();
//       setOptions((prev) => [...prev, data]);
//       setTextInput('');
//     } catch (err) {
//       console.error('Error adding option:', err);
//     }
//   };

//   const removeOption = async (id) => {
//     try {
//       await fetch(`${API_URL_DATA}/${id}`, { method: 'DELETE' });
//       setOptions((prev) => prev.filter((item) => item._id !== id));
//     } catch (err) {
//       console.error('Error deleting option:', err);
//     }
//   };

//   const startEdit = (id, value) => {
//     setEditingId(id);
//     setEditText(value);
//   };

//   const saveEdit = async (id) => {
//     try {
//       const res = await fetch(`${API_URL_DATA}/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ value: editText }),
//       });
//       const updated = await res.json();
//       setOptions((prev) =>
//         prev.map((item) => (item._id === id ? updated : item))
//       );
//       setEditingId(null);
//       setEditText('');
//     } catch (err) {
//       console.error('Error editing option:', err);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       addOption();
//     }
//   };

//   return (
//     <div className="border border-gray-200 p-6 rounded-xl shadow-sm bg-white w-full max-w-md mx-auto transition hover:shadow-md">
//       <h1 className="text-xl font-bold text-gray-800 mb-4">{title}</h1>

//       <div className="flex flex-col sm:flex-row gap-3 mb-4">
//         <input
//           type="text"
//           value={textInput}
//           onChange={(e) => setTextInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//           placeholder="Enter new value"
//           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
//         />
//         <button
//           onClick={addOption}
//           className="bg-rose-600 text-white rounded-lg hover:bg-rose-700 px-6 py-2 transition font-medium"
//         >
//           Add
//         </button>
//       </div>

//       {options.length > 0 && (
//         <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
//           {options.map((option) => (
//             <div
//               key={option._id}
//               className="flex items-center justify-between bg-rose-50 border border-rose-200 p-3 rounded-md"
//             >
//               {editingId === option._id ? (
//                 <div className="flex w-full items-center gap-2">
//                   <input
//                     value={editText}
//                     onChange={(e) => setEditText(e.target.value)}
//                     className="flex-1 p-2 border border-gray-300 rounded-md"
//                   />
//                   <button
//                     onClick={() => saveEdit(option._id)}
//                     className="text-green-600 hover:text-green-800"
//                     title="Save"
//                   >
//                     <Save size={18} />
//                   </button>
//                   <button
//                     onClick={() => {
//                       setEditingId(null);
//                       setEditText('');
//                     }}
//                     className="text-gray-500 hover:text-gray-700"
//                     title="Cancel"
//                   >
//                     <X size={18} />
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex justify-between w-full items-center">
//                   <span className="text-gray-800 font-medium">{option.value}</span>
//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => startEdit(option._id, option.value)}
//                       className="text-blue-500 hover:text-blue-700"
//                       title="Edit"
//                     >
//                       <Pencil size={18} />
//                     </button>
//                     <button
//                       onClick={() => removeOption(option._id)}
//                       className="text-rose-500 hover:text-rose-700"
//                       title="Delete"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileCard;


import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Save, X } from 'lucide-react';
import { API_URL } from '@/src/component/api/apiURL';
import { RxCross2 } from "react-icons/rx";


const ProfileCard = ({ title, apiPath }) => {

  const [textInput, setTextInput] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [stateList, setStateList] = useState([]);
  const [options, setOptions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editState, setEditState] = useState('');
  const [error, setError] = useState('');

  const API_URL_DATA = `${API_URL}/api/master/${apiPath}`;

  useEffect(() => {
    fetchOptions();
    if (apiPath === 'city') {
      fetchStates();
    }
  }, []);
  
  const fetchOptions = async () => {
    try {
      const res = await fetch(API_URL_DATA);
      const data = await res.json();
      setOptions(data);
    } catch (err) {
      console.error('Error fetching options:', err);
    }
  };
  const fetchStates = async () => {
    try {
      const res = await fetch(`${API_URL}/api/master/state`);
      const data = await res.json();
      setStateList(data);
    } catch (err) {
      console.error('Error fetching states:', err);
    }
  };
  const addOption = async () => {
  const trimmed = textInput.trim();
  if (!trimmed) return;

  // Check for duplicate (case-insensitive)
  const isDuplicate = options.some(
    (opt) => opt.value.trim().toLowerCase() === trimmed.toLowerCase()
  );

  if (isDuplicate) {
    setError('This field has already been mentioned');
    return;
  }

  const payload = apiPath === 'city'
    ? { value: trimmed, state: selectedState }
    : { value: trimmed };

  try {
    const res = await fetch(API_URL_DATA, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setOptions((prev) => [...prev, data]);
    setTextInput('');
    setSelectedState('');
    setError(''); // Clear error after successful add
  } catch (err) {
    console.error('Error adding option:', err);
  }
};

  const removeOption = async (id) => {
    try {
      await fetch(`${API_URL_DATA}/${id}`, { method: 'DELETE' });
      setOptions((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Error deleting option:', err);
    }
  };
  const startEdit = (id, value, stateName = '') => {
    setEditingId(id);
    setEditText(value);
    if (apiPath === 'city') setEditState(stateName);
  };
  const saveEdit = async (id) => {
    const payload = apiPath === 'city'
      ? { value: editText, state: editState }
      : { value: editText };
    try {
      const res = await fetch(`${API_URL_DATA}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const updated = await res.json();
      setOptions((prev) =>
        prev.map((item) => (item._id === id ? updated : item))
      );
      setEditingId(null);
      setEditText('');
      setEditState('');
    } catch (err) {
      console.error('Error editing option:', err);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && textInput.trim() !== '' ) {
      e.preventDefault();
      addOption();
    }
  };
  return (
    <div className="border-1 border-black mt-[50px] p-3 rounded-xl shadow-sm bg-white w-full max-w-md mx-auto transition hover:shadow-md">
      <h1 className="text-xl font-bold text-gray-800 mb-4">{title}</h1>
      <div className="flex flex-col gap-3 mb-3">
        {apiPath === 'city' && (
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
          >
            <option value="">Select State</option>
            {stateList.map((state) => (
              <option key={state._id} value={state.value}>
                {state.value}
              </option>
            ))}
          </select>
        )}
      
        <form
  onSubmit={(e) => {
    e.preventDefault();
    addOption();
  }}
  className="flex gap-3 flex-row "
>
  <input
    type="text"
    value={textInput}
    onChange={(e) => {
      setTextInput(e.target.value);
      setError('');
    }}
    onKeyDown={handleKeyDown}
    placeholder="Enter new value"
    className="w-full p-3 border border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
  />
  {error && <p className="text-sm text-red-500 -mt-2">{error}</p>}

    <button type="button"
          onClick={addOption}  
          className="bg-red-800 border-1 border-black   text-white rounded-lg hover:bg-rose-700 px-4 py-2 transition font-medium"
        >
          Add
        </button>
</form>

      
      </div>
      {options.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <div
              key={option._id}
              className=""
            >
              {editingId === option._id ? (
                <div className="">
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                  />
                  {apiPath === 'city' && (
                    <select
                      value={editState}
                      onChange={(e) => setEditState(e.target.value)}
                      className="p-2 border border-gray-300 rounded-md"
                    >
                      {/* <option value="">Select State</option> */}
                      {stateList.map((s) => (
                        <option key={s._id} value={s.value}>
                          {s.value}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ) : (
                <div className="inline-flex bg-[rgba(255,208,208,1)] items-center gap-2 p-1 justify-center shadow rounded border-1 border-green-400 overflow-hidden text-ellipsis whitespace-nowrap">
                  <span className="text-gray-800   font-medium">
                    {option.value} {option.state ? `(${option.state})` : ''}
                  </span>
                  <div className=" flex gap-2">
                    <button
                      onClick={() => removeOption(option._id)}
                      className="cursor-pointer text-black flex justify-center items-center bg-transparent "
                    >
                      <RxCross2 className='bg-transparent' />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      )}
    </div>
  );
};
export default ProfileCard;