/**
 * Reusable Action Buttons Component for Dashboard Tables
 * Provides consistent edit/delete functionality across all data tables
 */

import { Edit2, Trash2, Copy, Download, Eye } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const ActionButtons = ({ 
  item, 
  onEdit, 
  onDelete, 
  onView, 
  onDuplicate, 
  size = 'sm',
  showView = false,
  showDuplicate = false,
  showDownload = false,
  customActions = []
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleEdit = () => {
    onEdit(item);
    setShowMenu(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      onDelete(item.id || item._id);
      setShowMenu(false);
    }
  };

  const handleView = () => {
    if (onView) {
      onView(item);
      setShowMenu(false);
    }
  };

  const handleDuplicate = () => {
    if (onDuplicate) {
      onDuplicate(item);
      toast.success('Item duplicated. You can now edit it.');
      setShowMenu(false);
    }
  };

  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  const buttonSize = size === 'sm' ? 'p-1.5' : 'p-2';

  return (
    <div className="flex items-center gap-1">
      {/* Edit Button */}
      <button
        onClick={handleEdit}
        className={`${buttonSize} text-gray-400 hover:text-[#FD90A7] hover:bg-[#FD90A7]/10 transition rounded-lg`}
        title="Edit"
      >
        <Edit2 className={iconSize} />
      </button>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className={`${buttonSize} text-gray-400 hover:text-red-500 hover:bg-red-50 transition rounded-lg`}
        title="Delete"
      >
        <Trash2 className={iconSize} />
      </button>

      {/* View Button */}
      {showView && onView && (
        <button
          onClick={handleView}
          className={`${buttonSize} text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition rounded-lg`}
          title="View details"
        >
          <Eye className={iconSize} />
        </button>
      )}

      {/* Duplicate Button */}
      {showDuplicate && onDuplicate && (
        <button
          onClick={handleDuplicate}
          className={`${buttonSize} text-gray-400 hover:text-green-500 hover:bg-green-50 transition rounded-lg`}
          title="Duplicate"
        >
          <Copy className={iconSize} />
        </button>
      )}

      {/* Custom Actions */}
      {customActions && customActions.map((action, idx) => (
        <button
          key={idx}
          onClick={() => {
            action.handler(item);
            setShowMenu(false);
          }}
          className={`${buttonSize} text-gray-400 hover:text-${action.color}-500 hover:bg-${action.color}-50 transition rounded-lg`}
          title={action.title}
        >
          {action.icon && <action.icon className={iconSize} />}
        </button>
      ))}
    </div>
  );
};

export default ActionButtons;
