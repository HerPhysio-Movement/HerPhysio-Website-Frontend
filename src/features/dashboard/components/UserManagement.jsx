import { useState, useMemo } from 'react';
import { Search, Users, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUser } from '../../../context/UserContext';

const UserManagement = ({ noTopPadding = false }) => {
  const { users, promoteUserToAdmin, isLoading } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Extract all distinct roles dynamically
  const allRoles = useMemo(() => {
    if (!Array.isArray(users)) return [];
    const rolesSet = new Set(users.map((u) => u.role).filter(Boolean));
    return Array.from(rolesSet).sort();
  }, [users]);

  // Filtering logic
  const filteredUsers = useMemo(() => {
    if (!Array.isArray(users)) return [];
    let filtered = users;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.f_name?.toLowerCase().includes(query) ||
          u.l_name?.toLowerCase().includes(query) ||
          `${u.f_name} ${u.l_name}`.toLowerCase().includes(query) ||
          u.email?.toLowerCase().includes(query)
      );
    }
    if (roleFilter !== 'all') {
      filtered = filtered.filter((u) => u.role === roleFilter);
    }
    return filtered;
  }, [users, searchQuery, roleFilter]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const extractUserId = (user) => {
    if (!user) return null;
    const id = user._id || user.id || user.userId || user.firebase_uid;
    return id ? String(id) : null;
  };

  const handlePromote = async (user) => {
    const userId = extractUserId(user);
    if (!userId) {
      toast.error('Invalid user ID. Cannot promote.');
      return;
    }
    // For MongoDB ObjectId format, backend expects 24 hex characters.
    if (!userId.match(/^[0-9a-f]{24}$/i)) {
      toast.error(
        `Promotion failed: the backend requires a MongoDB ObjectId (24 hex characters). This user has ID: ${userId}. Please contact the backend team.`
      );
      return;
    }
    try {
      await promoteUserToAdmin(userId);
      toast.success(`${user.f_name || user.email} promoted to admin`);
    } catch (error) {
      toast.error(`Failed: ${error.message}`);
    }
  };

  const getRoleBadge = (role) => {
    if (!role) return null;
    const lowerRole = role.toLowerCase();
    if (lowerRole === 'admin' || lowerRole === 'superadmin')
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">Admin</span>;
    if (lowerRole === 'volunteer')
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 capitalize">{role}</span>;
    if (lowerRole === 'member' || lowerRole === 'user')
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">Member</span>;
    return (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 capitalize">
        {role}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex justify-center items-center h-32">
          <div className="animate-pulse text-[#FD90A7]">Loading users...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 ${noTopPadding ? 'pt-0' : ''}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#FD90A7]" />
          <h2 className="text-xl font-bold text-[#1D2130]">User Management</h2>
        </div>
        <div className="text-sm text-gray-500">
          Total: <span className="font-semibold text-[#1D2130]">{users.length}</span> users
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD90A7] bg-white"
        >
          <option value="all">All Roles</option>
          {allRoles.map((role) => (
            <option key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No users found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedUsers.map((user, idx) => {
                const userId = extractUserId(user);
                const isAdmin = ['admin', 'superadmin'].includes((user.role || '').toLowerCase());
                return (
                  <tr key={userId || idx} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#FD90A7]/10 flex items-center justify-center text-[#FD90A7] font-medium text-sm">
                          {(user.f_name?.[0] || user.email?.[0] || 'U').toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {user.f_name || ''} {user.l_name || ''}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{getRoleBadge(user.role)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {!isAdmin ? (
                        <button
                          onClick={() => handlePromote(user)}
                          className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition"
                        >
                          <Shield className="w-3 h-3" />
                          Promote
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400">Admin</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition"
          >
            Previous
          </button>
          <span className="px-3 py-1 text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UserManagement;