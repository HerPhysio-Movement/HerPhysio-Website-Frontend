import { useUser } from '../../context/UserContext';
import { ROLES } from '../../utils/roles';
import { FaUsers, FaUserTie, FaHandsHelping, FaUser } from 'react-icons/fa';

const UserOverview = () => {
  const { users } = useUser();

  const totalUsers = users.length;
  const roleCounts = {
    admin: users.filter(u => u.role === ROLES.ADMIN).length,
    volunteer: users.filter(u => u.role === ROLES.VOLUNTEER).length,
    member: users.filter(u => u.role === ROLES.MEMBER).length,
  };

  const roleData = [
    { role: 'Admin', count: roleCounts.admin, icon: FaUserTie, color: '#FD90A7' },
    { role: 'Volunteer', count: roleCounts.volunteer, icon: FaHandsHelping, color: '#f9b8c9' },
    { role: 'Member', count: roleCounts.member, icon: FaUser, color: '#b8d8f9' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <h2 className="text-xl font-bold text-[#1D2130] mb-4 font-zodiak">User Overview</h2>
      <div className="flex items-center gap-3 mb-6">
        <FaUsers className="w-6 h-6 text-[#FD90A7]" />
        <span className="text-3xl font-bold text-[#1D2130]">{totalUsers}</span>
        <span className="text-[#525560] font-poppins">total users</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {roleData.map((item, idx) => {
          const Icon = item.icon;
          const percentage = ((item.count / totalUsers) * 100).toFixed(0);
          return (
            <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                  <Icon className="w-4 h-4" style={{ color: item.color }} />
                </div>
                <span className="font-medium text-[#1D2130]">{item.role}</span>
              </div>
              <div className="text-2xl font-bold text-[#1D2130] mb-1">{item.count}</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="h-2 rounded-full" style={{ width: `${percentage}%`, backgroundColor: item.color }}></div>
              </div>
              <div className="text-xs text-[#525560] mt-1">{percentage}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserOverview;