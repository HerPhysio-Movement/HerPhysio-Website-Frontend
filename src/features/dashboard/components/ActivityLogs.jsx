import { FaHistory, FaPlus, FaEdit, FaTrash, FaCheckCircle, FaTimes } from 'react-icons/fa';
import { Clock, User, FileText } from 'lucide-react';
import { useUser } from '../../../context/UserContext';

// Helper to pick the right icon per action type
const getActionIcon = (type) => {
  switch (type) {
    case 'create':   return <FaPlus className="w-4 h-4" />;
    case 'edit':     return <FaEdit className="w-4 h-4" />;
    case 'delete':   return <FaTrash className="w-4 h-4" />;
    case 'approve':  return <FaCheckCircle className="w-4 h-4" />;
    case 'reject':   return <FaTimes className="w-4 h-4" />;
    default:         return <FileText className="w-4 h-4" />;
  }
};

const getActionColor = (type) => {
  switch (type) {
    case 'create':  return 'bg-green-100 text-green-700';
    case 'edit':    return 'bg-blue-100 text-blue-700';
    case 'delete':  return 'bg-red-100 text-red-700';
    case 'approve': return 'bg-green-100 text-green-700';
    case 'reject':  return 'bg-red-100 text-red-700';
    default:        return 'bg-gray-100 text-gray-700';
  }
};

const ActivityLogs = ({ noTopPadding = false }) => {
  const { activityLogs } = useUser();   // ← real logs from context

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 ${noTopPadding ? 'pt-0' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FD90A7]/10 rounded-lg flex items-center justify-center">
            <FaHistory className="w-5 h-5 text-[#FD90A7]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1D2130]">Activity Logs</h2>
            <p className="text-xs text-gray-500 mt-0.5">Recent platform activities</p>
          </div>
        </div>
        {/* View All link (can be hooked later) */}
        <a href="#" className="text-xs text-[#FD90A7] hover:underline font-medium">
          View All →
        </a>
      </div>

      <div className="space-y-1">
        {!activityLogs || activityLogs.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No recent activity</p>
          </div>
        ) : (
          activityLogs.map((log, idx) => (
            <div key={log.id || idx} className="group hover:bg-gray-50 rounded-lg p-3 transition-all duration-200">
              <div className="flex items-start gap-4">
                {/* Timeline dot and line */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActionColor(log.type)} shadow-sm`}>
                    {getActionIcon(log.type)}
                  </div>
                  {idx < activityLogs.length - 1 && (
                    <div className="w-0.5 h-12 bg-gradient-to-b from-gray-300 to-gray-200 my-1" />
                  )}
                </div>

                {/* Activity Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#1D2130]">
                        {log.action}
                        {log.details && (
                          <span className="text-[#FD90A7] ml-1">"{log.details}"</span>
                        )}
                      </p>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <User className="w-3 h-3" />
                          {log.performedBy || log.user}
                        </div>
                        <div className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {log.timestamp}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-white bg-[#FD90A7]/70 px-2 py-1 rounded-full whitespace-nowrap">
                      {log.user}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {activityLogs && activityLogs.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <a href="#" className="inline-flex items-center gap-2 text-sm text-[#FD90A7] hover:text-[#f77997] font-medium transition">
            <FileText className="w-4 h-4" />
            View complete activity log
            <span className="ml-1">→</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default ActivityLogs;