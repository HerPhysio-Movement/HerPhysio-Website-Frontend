import { Clock } from 'lucide-react';
import ActionButtons from '../../shared/components/ActionButtons';
import StatusBadge from '../../shared/components/StatusBadge';

const DataTable = ({ data, activeFilter, onEdit, onDelete, onVolunteerStatusUpdate }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-200">
        <Clock className="w-12 h-12 mx-auto text-gray-300 mb-2" />
        <p className="text-gray-500">No {activeFilter.toLowerCase()} found.</p>
      </div>
    );
  }

  const renderHeaders = () => {
    switch (activeFilter) {
      case 'Projects':   return ['Name', 'Status', 'Date', 'Actions'];
      case 'Articles':   return ['Title', 'Author', 'Date', 'Actions'];
      case 'Events':     return ['Name', 'Date', 'Location', 'Actions'];
      case 'Webinar':    return ['Title', 'Host', 'Date', 'Actions'];
      case 'Courses':    return ['Course Title', 'Category', 'Caption', 'Actions'];
      case 'Volunteers': return ['Name', 'Email', 'Phone', 'Status', 'Actions'];
      default:           return [];
    }
  };

  const renderRows = () => {
    switch (activeFilter) {
      case 'Projects':
        return data.map((item) => (
          <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.name || item.title}</td>
            <td className="px-4 py-3"><StatusBadge status={item.status} size="sm" /></td>
            <td className="px-4 py-3 text-sm text-gray-500">{item.date || item.created_at}</td>
            <td className="px-4 py-3"><ActionButtons item={item} onEdit={onEdit} onDelete={onDelete} size="sm" /></td>
          </tr>
        ));
      case 'Articles':
        return data.map((item) => (
          <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3 text-sm font-medium text-gray-800 truncate max-w-[200px]">{item.title}</td>
            <td className="px-4 py-3 text-sm text-gray-500">{item.author || 'Her Physio'}</td>
            <td className="px-4 py-3 text-sm text-gray-500">{item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recent'}</td>
            <td className="px-4 py-3"><ActionButtons item={item} onEdit={onEdit} onDelete={onDelete} size="sm" /></td>
          </tr>
        ));
      case 'Events':
        return data.map((item) => (
          <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.event_name || item.name}</td>
            <td className="px-4 py-3 text-sm text-gray-500">{item.event_date || item.date}</td>
            <td className="px-4 py-3 text-sm text-gray-500">{item.venue || item.location || 'TBD'}</td>
            <td className="px-4 py-3"><ActionButtons item={item} onEdit={onEdit} onDelete={onDelete} size="sm" /></td>
          </tr>
        ));
      case 'Webinar':
        return data.map((item) => (
          <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3 text-sm font-medium text-gray-800 truncate max-w-[200px]">{item.title}</td>
            <td className="px-4 py-3 text-sm text-gray-500">{item.host || 'Expert Speaker'}</td>
            <td className="px-4 py-3 text-sm text-gray-500">{item.date}</td>
            <td className="px-4 py-3"><ActionButtons item={item} onEdit={onEdit} onDelete={onDelete} size="sm" /></td>
          </tr>
        ));
      case 'Courses':
        return data.map((item) => (
          <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3 text-sm font-medium text-gray-800 truncate max-w-[200px]">{item.course_title || item.title}</td>
            <td className="px-4 py-3 text-sm text-gray-500">{item.category || '—'}</td>
            <td className="px-4 py-3 text-sm text-gray-500 truncate max-w-[200px]">{item.caption || '—'}</td>
            <td className="px-4 py-3"><ActionButtons item={item} onEdit={onEdit} onDelete={onDelete} size="sm" /></td>
          </tr>
        ));
      case 'Volunteers':
        return data.map((item) => {
          const id = item._id || item.id;
          return (
            <tr key={id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.f_name} {item.l_name}</td>
              <td className="px-4 py-3 text-sm text-gray-500">{item.email}</td>
              <td className="px-4 py-3 text-sm text-gray-500">{item.p_number}</td>
              <td className="px-4 py-3">
                <select
                  value={item.status || 'pending'}
                  onChange={(e) => onVolunteerStatusUpdate(id, e.target.value)}
                  className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 bg-white hover:border-[#FD90A7] transition focus:outline-none focus:ring-2 focus:ring-[#FD90A7]/20"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
              <td className="px-4 py-3"><ActionButtons item={item} onEdit={onEdit} onDelete={onDelete} size="sm" /></td>
            </tr>
          );
        });
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
      <table className="min-w-[640px] w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {renderHeaders().map((header, idx) => (
              <th key={idx} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">{renderRows()}</tbody>
      </table>
    </div>
  );
};

export default DataTable;