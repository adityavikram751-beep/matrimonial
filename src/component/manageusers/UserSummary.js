import { ArrowUp, ArrowDown } from 'lucide-react';

export default function StatCard({ totalUsers, newSignups }) {
  const StatItem = ({ title, value, change, trend }) => (
    <div className="flex-1 text-center">
      <div className="text-sm sm:text-base font-medium text-gray-700">{title}</div>
      <div className="text-2xl sm:text-3xl font-bold text-gray-900">
        {value.toLocaleString()}
      </div>
      <div
        className={`flex justify-center items-center text-sm mt-1 ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {trend === 'up' ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
        <span>{Math.abs(change)}% Vs&nbsp;</span>
        <span>last week</span>
      </div>
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl p-4 w-full max-w-sm">
      <div className="flex flex-col sm:flex-row items-center justify-between sm:space-x-6 space-y-4 sm:space-y-0">
        <div className="flex-1 text-center">
          <p className="text-sm text-gray-500">Total Users</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{totalUsers.count.toLocaleString()}</h2>
        </div>
        <div className="w-full h-px bg-gray-300 sm:w-px sm:h-12" />
        <StatItem
          title="New Signups"
          value={newSignups.count}
          change={newSignups.change}
          trend={newSignups.trend}
        />
      </div>
    </div>
  );
}
