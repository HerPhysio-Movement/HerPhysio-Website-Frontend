import ActionButtons from "./ActionButtons";

const DataTable = ({ data, activeFilter, onEdit, onDelete }) => {
  const getStatusBadge = (status, color) => {
    const colors = {
      green: "bg-green-100 text-green-800",
      blue: "bg-blue-100 text-blue-800",
      yellow: "bg-yellow-100 text-yellow-800",
      orange: "bg-orange-100 text-orange-800",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium font-poppins ${colors[color] || colors.green}`}>
        {status}
      </span>
    );
  };

  const renderRows = () => {
    switch (activeFilter) {
      case "Projects":
        return data.map((item) => (
          <tr key={item.id} className="hover:bg-[#FD90A7]/5 transition">
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1D2130] font-poppins">
              {item.name}
            </td>
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
              {getStatusBadge(item.status, item.statusColor)}
            </td>
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-[#525560] font-poppins">
              {item.date}
            </td>
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-[#525560]">
              <ActionButtons item={item} onEdit={onEdit} onDelete={onDelete} />
            </td>
          </tr>
        ));
      case "Articles":
        return data.map((item) => (
          <tr key={item.id} className="hover:bg-[#FD90A7]/5 transition">
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1D2130] font-poppins">
              {item.title}
            </td>
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-[#525560] font-poppins">
              {item.author}
            </td>
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-[#525560] font-poppins">
              {item.date}
            </td>
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
              <ActionButtons item={item} onEdit={onEdit} onDelete={onDelete} />
            </td>
          </tr>
        ));
      case "Events":
        return data.map((item) => (
          <tr key={item.id} className="hover:bg-[#FD90A7]/5 transition">
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1D2130] font-poppins">
              {item.name}
            </td>
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-[#525560] font-poppins">
              {item.date}
            </td>
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-[#525560] font-poppins">
              {item.location}
            </td>
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
              <ActionButtons item={item} onEdit={onEdit} onDelete={onDelete} />
            </td>
          </tr>
        ));
      case "Webinar":
        return data.map((item) => (
          <tr key={item.id} className="hover:bg-[#FD90A7]/5 transition">
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1D2130] font-poppins">
              {item.title}
            </td>
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-[#525560] font-poppins">
              {item.host}
            </td>
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-[#525560] font-poppins">
              {item.date}
            </td>
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
              <ActionButtons item={item} onEdit={onEdit} onDelete={onDelete} />
            </td>
          </tr>
        ));
      case "Volunteers":
        return data.map((item) => (
          <tr key={item.id} className="hover:bg-[#FD90A7]/5 transition">
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1D2130] font-poppins">
              {item.name}
            </td>
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-[#525560] font-poppins">
              {item.email}
            </td>
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-[#525560] font-poppins">
              {item.dateJoined}
            </td>
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
              <span className={`px-3 py-1 rounded-full text-xs font-medium font-poppins ${
                item.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
              }`}>
                {item.role}
              </span>
            </td>
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
              <ActionButtons item={item} onEdit={onEdit} onDelete={onDelete} />
            </td>
          </tr>
        ));
      default:
        return null;
    }
  };

  const renderHeaders = () => {
    switch (activeFilter) {
      case "Projects":
        return (
          <>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#525560] uppercase tracking-wider font-poppins">Name</th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#525560] uppercase tracking-wider font-poppins">Status</th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#525560] uppercase tracking-wider font-poppins">Date</th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#525560] uppercase tracking-wider font-poppins">Actions</th>
          </>
        );
      case "Articles":
        return (
          <>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#525560] uppercase tracking-wider font-poppins">Title</th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#525560] uppercase tracking-wider font-poppins">Author</th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#525560] uppercase tracking-wider font-poppins">Date</th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#525560] uppercase tracking-wider font-poppins">Actions</th>
          </>
        );
      case "Events":
        return (
          <>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#525560] uppercase tracking-wider font-poppins">Name</th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#525560] uppercase tracking-wider font-poppins">Date</th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#525560] uppercase tracking-wider font-poppins">Location</th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#525560] uppercase tracking-wider font-poppins">Actions</th>
          </>
        );
      case "Webinar":
        return (
          <>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#525560] uppercase tracking-wider font-poppins">Title</th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#525560] uppercase tracking-wider font-poppins">Host</th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#525560] uppercase tracking-wider font-poppins">Date</th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#525560] uppercase tracking-wider font-poppins">Actions</th>
          </>
        );
      case "Volunteers":
        return (
          <>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#525560] uppercase tracking-wider font-poppins">Name</th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#525560] uppercase tracking-wider font-poppins">Email</th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#525560] uppercase tracking-wider font-poppins">Date Joined</th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#525560] uppercase tracking-wider font-poppins">Role</th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#525560] uppercase tracking-wider font-poppins">Actions</th>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-x-auto border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>{renderHeaders()}</tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">{renderRows()}</tbody>
      </table>
    </div>
  );
};

export default DataTable;