import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getNotificationSend, getNotifications } from "../apis/alram";

export const useAlramSub = () => {
  return useQuery<any, AxiosError>({
    queryKey: ["alramQuery"],
    queryFn: () => getNotifications(),
  });
};

export const useAlramSend = () => {
  return useQuery<any, AxiosError>({
    queryKey: ["alramSendQuery"],
    queryFn: () => getNotificationSend(),
  });
};
