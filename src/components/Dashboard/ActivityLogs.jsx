import { useUser } from '../../context/UserContext';
import { FaHistory } from 'react-icons/fa';

const ActivityLogs = () => {
  const { activityLogs } = useUser();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <h2 className="text-xl font-bold text-[#1D2130] mb-4 font-zodiak flex items-center gap-2">
        <FaHistory className="w-5 h-5 text-[#FD90A7]" />
        Activity Logs
      </h2>
      <div className="space-y-4">
        {activityLogs.map((log) => (
          <div key={log.id} className="border-l-4 border-[#FD90A7] pl-4 py-2 bg-gray-50 rounded-r-xl">
            <p className="text-sm font-medium text-[#1D2130] font-poppins">{log.action}</p>
            <p className="text-xs text-[#525560] font-poppins">
              {log.user} {log.details && `(${log.details})`} – {log.timestamp} by {log.performedBy}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLogs;