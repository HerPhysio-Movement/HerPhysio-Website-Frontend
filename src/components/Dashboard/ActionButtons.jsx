import { Eye, Edit, Trash2 } from "lucide-react";

const ActionButtons = ({ item, onEdit, onDelete }) => (
  <div className="flex items-center gap-3">
    <button className="p-2 text-gray-400 hover:text-pink-500 transition min-w-[44px] min-h-[44px] flex items-center justify-center">
      <Eye className="w-5 h-5" />
    </button>
    <button
      onClick={() => onEdit(item)}
      className="p-2 text-gray-400 hover:text-pink-500 transition min-w-[44px] min-h-[44px] flex items-center justify-center"
    >
      <Edit className="w-5 h-5" />
    </button>
    <button
      onClick={() => onDelete(item.id)}
      className="p-2 text-gray-400 hover:text-red-500 transition min-w-[44px] min-h-[44px] flex items-center justify-center"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  </div>
);

export default ActionButtons;