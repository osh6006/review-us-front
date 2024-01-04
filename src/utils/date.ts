import { format } from "date-fns";
import { ko } from "date-fns/locale";

export const formatDate = (date: string) => {
  const parsedDate = new Date(date);
  const formattedDate = format(parsedDate, "yyyy-MM-dd", {
    locale: ko,
  });
  return formattedDate;
};

export const formatHistoryDate = (date: number) => {
  return { startDate: `${date}-01-01`, endDate: `${date}-12-31` };
};
