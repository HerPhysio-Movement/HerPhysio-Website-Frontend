import { parse, format } from "date-fns";

export const formatDateForDisplay = (dateString) => {
  if (!dateString) return "";
  const parsed = parse(dateString, "dd-MM-yyyy", new Date());
  if (isNaN(parsed)) return "";
  return format(parsed, "dd-MM-yyyy");
};

export const parseDateToDateObject = (dateString) => {
  if (!dateString) return null;
  const parsed = parse(dateString, "dd-MM-yyyy", new Date());
  return isNaN(parsed) ? null : parsed;
};

export const formatDateForStorage = (date) => {
  if (!date) return "";
  return format(date, "dd-MM-yyyy");
};
