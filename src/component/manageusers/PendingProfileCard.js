import { ArrowDown, MoreHorizontal, User } from 'lucide-react';

export default function PendingProfileCard({ data }) {
  const profileImages = Array.isArray(data.profileImage) ? data.profileImage : [];

  return (
    <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl p-4 w-full max-w-sm">
      <div className="flex items-center justify-between flex-wrap gap-y-2">
        <div className="flex items-center space-x-2">
          <div className="bg-yellow-300 text-yellow-800 rounded-full w-5 h-5 flex items-center justify-center">
            <MoreHorizontal size={14} />
          </div>
          <span className="font-medium text-gray-800 text-sm sm:text-base">Pending Profile</span>
        </div>
      </div>

      <div className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">
        {data.count.toLocaleString()}
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 gap-2">
        <div className="flex items-center text-red-600 text-sm">
          <ArrowDown size={16} className="mr-1" />
          <span>{Math.abs(data.change)}% Vs</span>&nbsp;<span>last week</span>
        </div>
        <div className="flex -space-x-2 overflow-hidden">
          {profileImages.length > 0 ? (
            profileImages.map((src, i) => (
              <img
                key={i}
                src={src}
                className="w-8 h-8 rounded-full border-2 border-red-500 shadow-sm object-cover"
                alt="Profile"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ))
          ) : (
            [...Array(Math.min(data.count, 4))].map((_, i) => (
              <div
                key={`pending-placeholder-${i}`}
                className="w-8 h-8 rounded-full border-2 border-red-500 bg-gray-200 flex items-center justify-center text-gray-500 shadow-sm"
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
