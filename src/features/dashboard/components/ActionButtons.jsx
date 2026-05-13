import { Eye, Edit, Trash2 } from 'lucide-react';

const ActionButtons = ({ item, onEdit, onDelete }) => (
  <div className="flex items-center gap-2">
    <button className="p-2 text-gray-400 hover:text-[#FD90A7] transition rounded-full hover:bg-[#FD90A7]/10" aria-label="View"><Eye className="w-5 h-5" /></button>
    <button onClick={() => onEdit(item)} className="p-2 text-gray-400 hover:text-[#FD90A7] transition rounded-full hover:bg-[#FD90A7]/10" aria-label="Edit"><Edit className="w-5 h-5" /></button>
    <button onClick={() => onDelete(item.id)} className="p-2 text-gray-400 hover:text-red-500 transition rounded-full hover:bg-red-50" aria-label="Delete"><Trash2 className="w-5 h-5" /></button>
  </div>
);

export default ActionButtons;