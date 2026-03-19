import { useState } from "react";
import { X, Calendar } from "lucide-react";

const Modal = ({ mode, activeFilter, currentItem, onClose, onSave }) => {
  const [formData, setFormData] = useState(() => {
    if (mode === "edit" && currentItem) {
      return { ...currentItem };
    }
    switch (activeFilter) {
      case "Projects":
        return { name: "", status: "Active", date: "", statusColor: "green", location: "" };
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
  const [focused, setFocused] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFocus = (e) => {
    setFocused({ ...focused, [e.target.name]: true });
  };

  const handleBlur = (e) => {
    setFocused({ ...focused, [e.target.name]: false });
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
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#1D2130] font-zodiak">
              {mode === "add" ? "Add" : "Edit"} {activeFilter}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5 text-[#525560]" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Projects */}
            {activeFilter === "Projects" && (
              <>
                <div className="relative">
                  <label className={`absolute left-3 transition-all duration-200 font-poppins ${focused.name || formData.name ? 'text-xs -top-2 bg-white px-2 text-[#FD90A7]' : 'top-3 text-gray-400'}`}>Name</label>
                  <input type="text" name="name" value={formData.name || ""} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FD90A7] font-poppins" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">Status</label>
                  <select name="status" value={formData.status || "Active"} onChange={handleChange} className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FD90A7] font-poppins">
                    <option>Active</option><option>Completed</option><option>Postponed</option><option>Pending</option>
                  </select>
                </div>
                <div className="relative">
                  <label className={`absolute left-3 transition-all duration-200 font-poppins ${focused.date || formData.date ? 'text-xs -top-2 bg-white px-2 text-[#FD90A7]' : 'top-3 text-gray-400'}`}>Date</label>
                  <input type="text" name="date" value={formData.date || ""} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} placeholder="DD-MM-YYYY" className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FD90A7] font-poppins" required />
                </div>
                <div className="relative">
                  <label className={`absolute left-3 transition-all duration-200 font-poppins ${focused.location || formData.location ? 'text-xs -top-2 bg-white px-2 text-[#FD90A7]' : 'top-3 text-gray-400'}`}>Location</label>
                  <input type="text" name="location" value={formData.location || ""} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} placeholder="e.g. Lagos" className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FD90A7] font-poppins" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">Color</label>
                  <select name="statusColor" value={formData.statusColor || "green"} onChange={handleChange} className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FD90A7] font-poppins">
                    <option value="green">Green</option><option value="blue">Blue</option><option value="yellow">Yellow</option><option value="orange">Orange</option>
                  </select>
                </div>
              </>
            )}

            {/* Articles */}
            {activeFilter === "Articles" && (
              <>
                <div className="relative">
                  <label className={`absolute left-3 transition-all duration-200 font-poppins ${focused.title || formData.title ? 'text-xs -top-2 bg-white px-2 text-[#FD90A7]' : 'top-3 text-gray-400'}`}>Title</label>
                  <input type="text" name="title" value={formData.title || ""} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FD90A7] font-poppins" required />
                </div>
                <div className="relative">
                  <label className={`absolute left-3 transition-all duration-200 font-poppins ${focused.author || formData.author ? 'text-xs -top-2 bg-white px-2 text-[#FD90A7]' : 'top-3 text-gray-400'}`}>Author</label>
                  <input type="text" name="author" value={formData.author || ""} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FD90A7] font-poppins" required />
                </div>
                <div className="relative">
                  <label className={`absolute left-3 transition-all duration-200 font-poppins ${focused.date || formData.date ? 'text-xs -top-2 bg-white px-2 text-[#FD90A7]' : 'top-3 text-gray-400'}`}>Date</label>
                  <input type="text" name="date" value={formData.date || ""} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} placeholder="DD-MM-YYYY" className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FD90A7] font-poppins" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">Status</label>
                  <div className="flex gap-4">
                    {["Pending", "Published", "Unpublished"].map(status => (
                      <label key={status} className="flex items-center gap-2">
                        <input type="radio" name="status" value={status} checked={formData.status === status} onChange={handleChange} className="text-[#FD90A7] focus:ring-[#FD90A7]" />
                        <span className="text-sm text-gray-700 font-poppins">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Events */}
            {activeFilter === "Events" && (
              <>
                <div className="relative">
                  <label className={`absolute left-3 transition-all duration-200 font-poppins ${focused.name || formData.name ? 'text-xs -top-2 bg-white px-2 text-[#FD90A7]' : 'top-3 text-gray-400'}`}>Name</label>
                  <input type="text" name="name" value={formData.name || ""} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FD90A7] font-poppins" required />
                </div>
                <div className="relative">
                  <label className={`absolute left-3 transition-all duration-200 font-poppins ${focused.date || formData.date ? 'text-xs -top-2 bg-white px-2 text-[#FD90A7]' : 'top-3 text-gray-400'}`}>Date</label>
                  <input type="text" name="date" value={formData.date || ""} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} placeholder="DD-MM-YYYY" className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FD90A7] font-poppins" required />
                </div>
                <div className="relative">
                  <label className={`absolute left-3 transition-all duration-200 font-poppins ${focused.location || formData.location ? 'text-xs -top-2 bg-white px-2 text-[#FD90A7]' : 'top-3 text-gray-400'}`}>Location</label>
                  <input type="text" name="location" value={formData.location || ""} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} placeholder="e.g. Lagos" className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FD90A7] font-poppins" required />
                </div>
              </>
            )}

            {/* Webinar */}
            {activeFilter === "Webinar" && (
              <>
                <div className="relative">
                  <label className={`absolute left-3 transition-all duration-200 font-poppins ${focused.title || formData.title ? 'text-xs -top-2 bg-white px-2 text-[#FD90A7]' : 'top-3 text-gray-400'}`}>Title</label>
                  <input type="text" name="title" value={formData.title || ""} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FD90A7] font-poppins" required />
                </div>
                <div className="relative">
                  <label className={`absolute left-3 transition-all duration-200 font-poppins ${focused.host || formData.host ? 'text-xs -top-2 bg-white px-2 text-[#FD90A7]' : 'top-3 text-gray-400'}`}>Host</label>
                  <input type="text" name="host" value={formData.host || ""} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FD90A7] font-poppins" required />
                </div>
                <div className="relative">
                  <label className={`absolute left-3 transition-all duration-200 font-poppins ${focused.date || formData.date ? 'text-xs -top-2 bg-white px-2 text-[#FD90A7]' : 'top-3 text-gray-400'}`}>Date</label>
                  <input type="text" name="date" value={formData.date || ""} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} placeholder="DD-MM-YYYY" className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FD90A7] font-poppins" required />
                </div>
              </>
            )}

            {/* Volunteers */}
            {activeFilter === "Volunteers" && (
              <>
                <div className="relative">
                  <label className={`absolute left-3 transition-all duration-200 font-poppins ${focused.name || formData.name ? 'text-xs -top-2 bg-white px-2 text-[#FD90A7]' : 'top-3 text-gray-400'}`}>Name</label>
                  <input type="text" name="name" value={formData.name || ""} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FD90A7] font-poppins" required />
                </div>
                <div className="relative">
                  <label className={`absolute left-3 transition-all duration-200 font-poppins ${focused.email || formData.email ? 'text-xs -top-2 bg-white px-2 text-[#FD90A7]' : 'top-3 text-gray-400'}`}>Email</label>
                  <input type="email" name="email" value={formData.email || ""} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FD90A7] font-poppins" required />
                </div>
                <div className="relative">
                  <label className={`absolute left-3 transition-all duration-200 font-poppins ${focused.dateJoined || formData.dateJoined ? 'text-xs -top-2 bg-white px-2 text-[#FD90A7]' : 'top-3 text-gray-400'}`}>Date Joined</label>
                  <input type="text" name="dateJoined" value={formData.dateJoined || ""} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} placeholder="DD-MM-YYYY" className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FD90A7] font-poppins" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">Role</label>
                  <select name="role" value={formData.role || "volunteer"} onChange={handleChange} className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FD90A7] font-poppins">
                    <option value="volunteer">Volunteer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-full text-[#525560] hover:bg-gray-50 transition font-poppins">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-[#FD90A7] text-white rounded-full hover:bg-[#f77997] transition font-poppins font-semibold">{mode === "add" ? "Add" : "Save"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;