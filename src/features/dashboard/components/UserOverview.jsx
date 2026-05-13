import { FaUsers, FaUserTie, FaHandsHelping, FaUser } from 'react-icons/fa';
import { useUser } from '../../../context/UserContext';

const UserOverview = ({ noTopPadding = false }) => {
  const { users } = useUser();

  const totalUsers = Array.isArray(users) ? users.length : 0;

  // Count real roles dynamically – does not rely on hardcoded role names
  const roleCounts = Array.isArray(users)
    ? users.reduce(
        (acc, user) => {
          const role = (user.role || '').toLowerCase();
          if (role === 'admin' || role === 'superadmin') acc.admin += 1;
          else if (role === 'volunteers') acc.volunteers += 1;
          else if (role === 'member' || role === 'user') acc.member += 1;
          else acc.other += 1; // catch any other roles
          return acc;
        },
        { admin: 0, volunteers: 0, member: 0, other: 0 }
      )
    : { admin: 0, volunteers: 0, member: 0, other: 0 };

  const roleData = [
    { role: 'Admin', count: roleCounts.admin, icon: FaUserTie, color: '#FD90A7' },
    { role: 'Volunteer', count: roleCounts.volunteers, icon: FaHandsHelping, color: '#f9b8c9' },
    { role: 'Member', count: roleCounts.member, icon: FaUser, color: '#b8d8f9' },
  ];

  const getPercentage = (count) =>
    totalUsers > 0 ? ((count / totalUsers) * 100).toFixed(0) : 0;

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 ${noTopPadding ? 'pt-0' : ''}`}>
      <h2 className="text-xl font-bold text-[#1D2130] mb-4">User Overview</h2>
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <FaUsers className="w-6 h-6 text-[#FD90A7]" />
        <span className="text-3xl font-bold text-[#1D2130]">{totalUsers}</span>
        <span className="text-gray-500 text-sm">total users</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {roleData.map((item, idx) => {
          const Icon = item.icon;
          const percentage = getPercentage(item.count);
          return (
            <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <Icon className="w-4 h-4" style={{ color: item.color }} />
                </div>  
                <span className="font-medium text-[#1D2130]">{item.role}</span>
              </div>
              <div className="text-2xl font-bold text-[#1D2130] mb-1">{item.count}</div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${percentage}%`, backgroundColor: item.color }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">{percentage}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserOverview;