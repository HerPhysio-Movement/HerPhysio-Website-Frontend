import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { ROLES } from "../../utils/roles";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const UserManagement = ({ noTopPadding = false }) => {
  const { users, currentUser, updateUserRole } = useUser();
  const [editingUserId, setEditingUserId] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setSelectedRole(user.role);
  };

  const handleSave = (userId) => {
    if (selectedRole) {
      updateUserRole(userId, selectedRole, currentUser.name);
      toast.success("User role updated");
    }
    setEditingUserId(null);
  };

  const handleCancel = () => setEditingUserId(null);

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 ${noTopPadding ? "pt-0" : ""}`}
    >
      <h2 className="text-xl font-bold text-[#1D2130] mb-4 font-zodiak">
        User Management
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#525560] uppercase tracking-wider font-poppins">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#525560] uppercase tracking-wider font-poppins">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#525560] uppercase tracking-wider font-poppins">
                Role
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#525560] uppercase tracking-wider font-poppins">
                Joined
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#525560] uppercase tracking-wider font-poppins">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-[#1D2130] font-poppins">
                  {user.name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-[#525560] font-poppins">
                  {user.email}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  {editingUserId === user.id ? (
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded-lg focus:ring-[#FD90A7] focus:border-[#FD90A7]"
                    >
                      <option value={ROLES.MEMBER}>Member</option>
                      <option value={ROLES.VOLUNTEER}>Volunteer</option>
                      <option value={ROLES.ADMIN}>Admin</option>
                    </select>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium font-poppins ${
                        user.role === ROLES.ADMIN
                          ? "bg-purple-100 text-purple-800"
                          : user.role === ROLES.VOLUNTEER
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-[#525560] font-poppins">
                  {user.joined}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  {editingUserId === user.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSave(user.id)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <FaCheck className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-[#FD90A7] hover:text-[#f77997]"
                      disabled={user.id === currentUser.id}
                      title={
                        user.id === currentUser.id
                          ? "You cannot edit your own role"
                          : ""
                      }
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
