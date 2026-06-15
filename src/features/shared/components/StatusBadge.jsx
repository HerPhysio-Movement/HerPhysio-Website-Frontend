/**
 * Reusable Status Badge Component
 * Provides consistent status visualization across the application
 */

import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { STATUS_CONFIG } from '../../../utils/constants';

const StatusBadge = ({ 
  status, 
  size = 'md', 
  showIcon = true,
  className = '',
  customConfig = {}
}) => {
  // Merge custom config with default status config
  const allConfigs = { ...STATUS_CONFIG, ...customConfig };
  const config = allConfigs[status?.toLowerCase()] || { 
    label: status, 
    className: 'bg-gray-100 text-gray-600' 
  };

  const getIcon = () => {
    const statusLower = status?.toLowerCase();
    
    if (statusLower === 'approved' || statusLower === 'accepted' || statusLower === 'published' || statusLower === 'completed' || statusLower === 'active') {
      return <CheckCircle className={`w-${size === 'sm' ? '3' : size === 'lg' ? '5' : '4'} h-${size === 'sm' ? '3' : size === 'lg' ? '5' : '4'}`} />;
    }
    
    if (statusLower === 'rejected' || statusLower === 'cancelled' || statusLower === 'inactive') {
      return <XCircle className={`w-${size === 'sm' ? '3' : size === 'lg' ? '5' : '4'} h-${size === 'sm' ? '3' : size === 'lg' ? '5' : '4'}`} />;
    }
    
    if (statusLower === 'pending') {
      return <Clock className={`w-${size === 'sm' ? '3' : size === 'lg' ? '5' : '4'} h-${size === 'sm' ? '3' : size === 'lg' ? '5' : '4'}`} />;
    }
    
    if (statusLower === 'draft') {
      return <AlertCircle className={`w-${size === 'sm' ? '3' : size === 'lg' ? '5' : '4'} h-${size === 'sm' ? '3' : size === 'lg' ? '5' : '4'}`} />;
    }

    return null;
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${sizeClasses[size]} ${config.className} ${className}`}>
      {showIcon && getIcon()}
      {config.label}
    </span>
  );
};

export default StatusBadge;
