import { Clock, Eye } from 'lucide-react';
import ActionButtons from '../../shared/components/ActionButtons';
import StatusBadge from '../../shared/components/StatusBadge';
import { getWebinarHost, getWebinarTitle, getWebinarVideoUrl } from '../../../utils/videoHelpers';

const getPublishedDate = (item) =>
  item.published_at ||
  item.publishedAt ||
  item.publish_date ||
  item.published_date ||
  item.date ||
  item.created_at ||
  item.createdAt;

const formatDate = (value) => {
  if (!value) return 'N/A';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const DataTable = ({
  data,
  activeFilter,
  onEdit,
  onDelete,
  onVolunteerStatusUpdate,
  onEventRegistrationsClick,
  eventRegistrationCounts,
}) => {
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
      case 'Projects': return ['Name', 'Status', 'Published Date', 'Actions'];
      case 'Articles': return ['Title', 'Author', 'Category', 'Actions'];
      case 'Blogs': return ['Title', 'Author', 'Status', 'Published Date', 'Actions'];
      case 'Events': return ['Name', 'Date', 'Location', 'Registered', 'Actions'];
      case 'Webinar': return ['Title', 'Host', 'Provider', 'Link', 'Date', 'Actions'];
      case 'Courses': return ['Course Title', 'Category', 'Caption', 'Link', 'Tags', 'Actions'];
      case 'Gallery': return ['Image', 'Title', 'Category', 'Description', 'Actions'];
      case 'Volunteers': return ['Name', 'Email', 'Phone', 'Status', 'Actions'];
      default: return [];
    }
  };

  const renderRows = () => {
    switch (activeFilter) {
      case 'Projects':
        return data.map((item) => (
          <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.name || item.title}</td>
            <td className="px-4 py-3"><StatusBadge status={item.status} size="sm" /></td>
            <td className="px-4 py-3 text-sm text-gray-500">{formatDate(getPublishedDate(item))}</td>
            <td className="px-4 py-3"><ActionButtons item={item} onEdit={onEdit} onDelete={onDelete} size="sm" /></td>
          </tr>
        ));

      case 'Articles':
        return data.map((item) => (
          <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3 text-sm font-medium text-gray-800 truncate max-w-50">{item.title}</td>
            <td className="px-4 py-3 text-sm text-gray-500">{item.author || 'Unknown'}</td>
            <td className="px-4 py-3 text-sm text-gray-500">{item.category || 'Uncategorized'}</td>
            <td className="px-4 py-3"><ActionButtons item={item} onEdit={onEdit} onDelete={onDelete} size="sm" /></td>
          </tr>
        ));

      case 'Blogs':
        return data.map((item) => (
          <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3 text-sm font-medium text-gray-800 truncate max-w-50">{item.title}</td>
            <td className="px-4 py-3 text-sm text-gray-500">{item.author || 'Unknown'}</td>
            <td className="px-4 py-3"><StatusBadge status={item.status} size="sm" /></td>
            <td className="px-4 py-3 text-sm text-gray-500">{formatDate(getPublishedDate(item))}</td>
            <td className="px-4 py-3"><ActionButtons item={item} onEdit={onEdit} onDelete={onDelete} size="sm" /></td>
          </tr>
        ));

      case 'Events':
        return data.map((item) => {
          const id = item._id || item.id;
          const registrationCount = eventRegistrationCounts?.[id] ?? 'N/A';
          return (
            <tr key={id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.event_name || item.name}</td>
              <td className="px-4 py-3 text-sm text-gray-500">{item.event_date || item.date}</td>
              <td className="px-4 py-3 text-sm text-gray-500">{item.venue || item.location || 'TBD'}</td>
              <td className="px-4 py-3 text-sm text-gray-500">{registrationCount}</td>
              <td className="px-4 py-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onEventRegistrationsClick?.(item)}
                  aria-label="View registrations"
                  className="p-1.5 text-gray-400 hover:text-[#FD90A7] hover:bg-[#FD90A7]/10 transition rounded-lg"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <ActionButtons item={item} onEdit={onEdit} onDelete={onDelete} size="sm" />
              </td>
            </tr>
          );
        });

      case 'Webinar':
        return data.map((item) => {
          const id = item._id || item.id;
          const link = getWebinarVideoUrl(item);
          return (
            <tr key={id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-gray-800 truncate max-w-50">{getWebinarTitle(item)}</td>
              <td className="px-4 py-3 text-sm text-gray-500">{getWebinarHost(item)}</td>
              <td className="px-4 py-3 text-sm text-gray-500 capitalize">{item.provider || item.preview_site_name || 'N/A'}</td>
              <td className="px-4 py-3 text-sm text-gray-500 truncate max-w-50">
                {link ? (
                  <a href={link} target="_blank" rel="noopener noreferrer" className="text-[#FD90A7] hover:underline">
                    Open link
                  </a>
                ) : (
                  'N/A'
                )}
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">{formatDate(getPublishedDate(item))}</td>
              <td className="px-4 py-3"><ActionButtons item={item} onEdit={onEdit} onDelete={onDelete} size="sm" /></td>
            </tr>
          );
        });

      case 'Courses':
        return data.map((item) => {
          const id = item._id || item.id;
          const tags = Array.isArray(item.tags) ? item.tags.join(', ') : item.tags;
          return (
            <tr key={id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-gray-800 truncate max-w-50">{item.course_title || item.title}</td>
              <td className="px-4 py-3 text-sm text-gray-500">{item.category || 'N/A'}</td>
              <td className="px-4 py-3 text-sm text-gray-500 truncate max-w-50">{item.caption || 'N/A'}</td>
              <td className="px-4 py-3 text-sm text-gray-500 truncate max-w-50">
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[#FD90A7] hover:underline">
                    Open link
                  </a>
                ) : (
                  'N/A'
                )}
              </td>
              <td className="px-4 py-3 text-sm text-gray-500 truncate max-w-50">{tags || 'N/A'}</td>
              <td className="px-4 py-3"><ActionButtons item={item} onEdit={onEdit} onDelete={onDelete} size="sm" /></td>
            </tr>
          );
        });

      case 'Gallery':
        return data.map((item) => (
          <tr key={item.id || item._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3">
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.title || 'Gallery image'}
                  className="h-12 w-16 rounded-md object-cover border border-gray-100"
                />
              ) : (
                <div className="h-12 w-16 rounded-md bg-gray-100 text-gray-400 text-xs flex items-center justify-center">
                  No image
                </div>
              )}
            </td>
            <td className="px-4 py-3 text-sm font-medium text-gray-800 truncate max-w-50">{item.title || 'Untitled'}</td>
            <td className="px-4 py-3 text-sm text-gray-500">{item.caption || 'N/A'}</td>
            <td className="px-4 py-3 text-sm text-gray-500 truncate max-w-50">{item.description || 'N/A'}</td>
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
                  value={(item.status === 'approved' ? 'accepted' : item.status) || 'pending'}
                  onChange={(event) => onVolunteerStatusUpdate(id, event.target.value)}
                  className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 bg-white hover:border-[#FD90A7] transition focus:outline-none focus:ring-2 focus:ring-[#FD90A7]/20"
                >
                  <option value="pending">Pending</option>
                  <option value="accepted">Approved</option>
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
      <table className="min-w-160 w-full">
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
