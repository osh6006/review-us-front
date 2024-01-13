import { privateApi } from "../utils/axios-setting";

export const getNotifications = async () => {
  return await privateApi
    .get(`/notifications/subscribe`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const getNotificationSend = async () => {
  return await privateApi
    .get(`/reviewnotify/send`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
