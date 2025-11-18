import { ArrowUp, User } from 'lucide-react';

export default function ApprovedProfileCard({ data }) {
  const profileImages = Array.isArray(data.profileImage) ? data.profileImage : [];

  return (
    <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl p-4 w-full max-w-sm">
      <div className="flex items-center justify-between flex-wrap gap-y-2">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center justify-center w-6 h-6 bg-green-700 rounded-sm font-bold text-white">
                        ✔
                      </span>
          <span className="font-medium text-gray-700 text-sm sm:text-base">Approved Profile</span>
        </div>
      </div>

      <div className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">
        {data.count.toLocaleString()}
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 gap-2">
        <div className="flex items-center text-green-600 text-sm">
          <ArrowUp size={16} className="mr-1" />
          <span>{data.change}% Vs</span>&nbsp;<span>last week</span>
        </div>
        <div className="flex -space-x-2 overflow-hidden">
          {profileImages.length > 0 ? (
            profileImages.map((src, i) => (
              <img
                key={i}
                src={src}
                className="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover"
                alt="Profile"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ))
          ) : (
            [...Array(Math.min(data.count, 4))].map((_, i) => (
              <div
                key={`approved-placeholder-${i}`}
                className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-gray-500 shadow-sm"
              >
                <User size={18} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
