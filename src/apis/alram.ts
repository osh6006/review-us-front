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

export const deleteNotification = async (notification_id: string) => {
  return privateApi
    .delete(`/notifications/api/notification/delete/${notification_id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};
