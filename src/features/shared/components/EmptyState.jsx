/**
 * Empty State Component
 * Displays when no data is available with actionable suggestions
 */

import { Plus, Search } from 'lucide-react';

const EmptyState = ({
  title = 'No data found',
  description = 'Get started by creating your first item.',
  icon: Icon = Search,
  action,
  actionLabel = 'Create New',
  secondaryAction,
  secondaryActionLabel = 'Learn More'
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {/* Icon */}
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-[#1D2130] mb-2 text-center">
        {title}
      </h3>
      <p className="text-gray-500 text-center max-w-sm mb-6">
        {description}
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        {action && (
          <button
            onClick={action}
            className="px-6 py-2.5 bg-[#FD90A7] hover:bg-[#f77997] text-white rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            {actionLabel}
          </button>
        )}
        {secondaryAction && (
          <button
            onClick={secondaryAction}
            className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors whitespace-nowrap"
          >
            {secondaryActionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
