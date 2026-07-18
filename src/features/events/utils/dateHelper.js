// src/utils/dateHelpers.js
export const formatEventTime = (time) => {
  if (!time || time === 'Time TBD' || time === 'TBD') return 'Time TBD';

  // Check if it's already in 12-hour format
  if (/[ap]m/i.test(time)) {
    return time.trim();
  }

  // Try to parse as 24-hour format
  const parts = time.split(':');
  if (parts.length === 2) {
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    
    if (!isNaN(hours) && !isNaN(minutes) && hours >= 0 && hours <= 23) {
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const hour12 = hours % 12 || 12;
      return `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }
  }

  return time;
};