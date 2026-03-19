import { useState } from "react";
import { X, Calendar } from "lucide-react";

const Modal = ({ mode, activeFilter, currentItem, onClose, onSave }) => {
  const [formData, setFormData] = useState(() => {
    if (mode === "edit" && currentItem) {
      return { ...currentItem };
    }
    // Default empty based on filter
    switch (activeFilter) {
      case "Projects":
        return { name: "", status: "Active", date: "", statusColor: "green" };
      case "Articles":
        return { title: "", author: "", date: "", status: "Pending" };
      case "Events":
        return { name: "", date: "", location: "" };
      case "Webinar":
        return { title: "", host: "", date: "" };
      case "Volunteers":
        return { name: "", email: "", dateJoined: "", role: "volunteer" };
      default:
        return {};
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "edit") {
      onSave({ ...formData, id: currentItem.id });
    } else {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              {mode === "add" ? "Add" : "Edit"} {activeFilter}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
          {activeFilter === "Projects" && (
  <>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
      <input
        type="text"
        name="name"
        value={formData.name || ""}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
      <select
        name="status"
        value={formData.status || "Active"}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      >
        <option>Active</option>
        <option>Completed</option>
        <option>Postponed</option>
        <option>Pending</option>
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
      <input
        type="text"
        name="date"
        value={formData.date || ""}
        onChange={handleChange}
        placeholder="DD-MM-YYYY"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
      <input
        type="text"
        name="location"
        value={formData.location || ""}
        onChange={handleChange}
        placeholder="e.g. Lagos"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
      <select
        name="statusColor"
        value={formData.statusColor || "green"}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      >
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="yellow">Yellow</option>
        <option value="orange">Orange</option>
      </select>
    </div>
  </>
)}

            {activeFilter === "Articles" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="date"
                      value={formData.date || ""}
                      onChange={handleChange}
                      placeholder="DD-MM-YYYY"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-10"
                      required
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <div className="flex gap-4">
                    {["Pending", "Published", "Unpublished"].map((status) => (
                      <label key={status} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="status"
                          value={status}
                          checked={formData.status === status}
                          onChange={handleChange}
                          className="text-pink-500 focus:ring-pink-500"
                        />
                        <span className="text-sm text-gray-700">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeFilter === "Events" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date || ""}
                    onChange={handleChange}
                    placeholder="DD-MM-YYYY"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </>
            )}

            {activeFilter === "Webinar" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Host</label>
                  <input
                    type="text"
                    name="host"
                    value={formData.host || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date || ""}
                    onChange={handleChange}
                    placeholder="DD-MM-YYYY"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </>
            )}

            {activeFilter === "Volunteers" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Joined</label>
                  <input
                    type="text"
                    name="dateJoined"
                    value={formData.dateJoined || ""}
                    onChange={handleChange}
                    placeholder="DD-MM-YYYY"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    name="role"
                    value={formData.role || "volunteer"}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="volunteer">Volunteer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
              >
                {mode === "add" ? "Add" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;