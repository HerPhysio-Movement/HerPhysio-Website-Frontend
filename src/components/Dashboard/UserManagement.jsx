import { useState, useMemo } from "react";
import { useUser } from "../../context/UserContext";
import { ROLES } from "../../utils/roles";
import { FaEdit, FaCheck, FaTimes, FaPlus, FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import {
  parseDateToDateObject,
  formatDateForStorage,
} from "../../utils/dateHelpers";
import "react-datepicker/dist/react-datepicker.css";

const UserManagement = ({ noTopPadding = false }) => {
  const { users, currentUser, updateUserRole } = useUser();
  const [editingUserId, setEditingUserId] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: ROLES.MEMBER,
    joined: "",
  });

  const itemsPerPage = 5;

  // Filter users
  const filteredUsers = useMemo(() => {
    let filtered = users;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query),
      );
    }
    if (roleFilter !== "all") {
      filtered = filtered.filter((u) => u.role === roleFilter);
    }
    return filtered;
  }, [users, searchQuery, roleFilter]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

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

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast.error("Name and email are required");
      return;
    }
    const newId = Date.now();
    const userToAdd = {
      id: newId,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      joined: newUser.joined || new Date().toISOString().slice(0, 10),
    };
    // In a real app, you'd call an API. Here we'll simulate by adding to context (requires addUser in UserContext).
    // For now, we'll just log and toast. You can extend UserContext with addUser function.
    console.log("Add user:", userToAdd);
    toast.success("User added (demo)");
    setModalOpen(false);
    setNewUser({ name: "", email: "", role: ROLES.MEMBER, joined: "" });
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 ${
        noTopPadding ? "pt-0" : ""
      }`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-xl font-bold text-[#1D2130] font-zodiak">
          User Management
        </h2>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#FD90A7] text-white rounded-full text-sm font-semibold hover:bg-[#f77997] transition"
        >
          <FaPlus className="w-4 h-4" /> Add User
        </button>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FD90A7]"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FD90A7]"
        >
          <option value="all">All Roles</option>
          <option value={ROLES.MEMBER}>Member</option>
          <option value={ROLES.VOLUNTEER}>Volunteer</option>
          <option value={ROLES.ADMIN}>Admin</option>
        </select>
      </div>

      {/* Table */}
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
            {paginatedUsers.map((user) => (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Add User Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-[#1D2130] mb-4">
              Add New User
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value={ROLES.MEMBER}>Member</option>
                <option value={ROLES.VOLUNTEER}>Volunteer</option>
                <option value={ROLES.ADMIN}>Admin</option>
              </select>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Joined (optional)
                </label>
                <DatePicker
                  selected={parseDateToDateObject(newUser.joined)}
                  onChange={(date) =>
                    setNewUser({
                      ...newUser,
                      joined: formatDateForStorage(date),
                    })
                  }
                  dateFormat="dd-MM-yyyy"
                  placeholderText="DD-MM-YYYY"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-full text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-[#FD90A7] text-white rounded-full"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
