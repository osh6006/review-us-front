import { Menu } from "@headlessui/react";
import { Bell } from "lucide-react";
import { privateApi } from "../utils/axios-setting";

import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteNotification } from "../apis/alram";

interface AlramProps {
  userInfo: string;
}

interface IAlram {
  boardNumber: string;
  notification_id: string;
  title: string;
  content: string;
}

const Alram: React.FC<AlramProps> = ({ userInfo }) => {
  const nav = useNavigate();
  const [alrams, setAlrams] = useState<any[]>([]);

  useEffect(() => {
    if (userInfo) {
      const fetchData = async () => {
        const { accessToken } = JSON.parse(userInfo);
        await fetchEventSource(
          `${process.env.REACT_APP_SERVER_URL}/notifications/subscribe`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Connection: "keep-alive",
            },
            async onopen(response) {
              if (response.ok && response.status === 200) {
                console.log("Connection made");
                await privateApi
                  .get(`${process.env.REACT_APP_SERVER_URL}/reviewnotify/send`)
                  .then((response) => {
                    console.log(response.data);
                  })
                  .catch((error) => {
                    console.error(
                      "There was a problem with the fetch operation:",
                      error
                    );
                  });
              } else if (response.status === 401) {
                console.log("리프레시 토큰 필요~");
              } else if (
                response.status >= 400 &&
                response.status < 500 &&
                response.status !== 429
              ) {
                console.log("Client side error", response);
              }
            },
            async onmessage(event) {
              switch (event.event) {
                case "addComment":
                  const parsedData = JSON.parse(event?.data);
                  setAlrams((prev) => [...prev, parsedData]);
                  break;
              }
            },
            onclose() {
              console.log("Connection closed by the server");
            },
            onerror(err) {
              console.log("There was an error from server", err);
            },
          }
        );
      };
      fetchData();
    }
  }, [userInfo]);

  return (
    <Menu as="div" className="relative">
      <Menu.Button>
        <>
          <Bell />
          {alrams.length > 0 ? (
            <span className="absolute w-[12px] h-[12px] -top-1 -right-1 bg-success rounded-full" />
          ) : null}
        </>
      </Menu.Button>

      {alrams.length > 0 ? (
        <Menu.Items
          className="absolute p-2 -right-20 mt-2 w-[400px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 
      gap-y-2 focus:outline-none"
        >
          {alrams?.map((alram) => {
            if (alram?.title) {
              return (
                <Menu.Item key={alram.boardNumber}>
                  {({ active, close }) => (
                    <div
                      onClick={async () => {
                        await deleteNotification(alram.notification_id);
                        setAlrams((prev) =>
                          prev.filter(
                            (el) => el.notification_id !== alram.notification_id
                          )
                        );
                        nav(`mystudy/${alram.boardNumber}`);
                      }}
                      className={`${
                        active ? "bg-primary text-white" : "text-gray-900"
                      } group flex w-full items-center justify-between rounded-md px-2 py-2 text-sm transition-colors`}
                    >
                      <p>{alram?.content}</p>
                      <div className="flex gap-x-2">
                        <button
                          onClick={async (event) => {
                            event.stopPropagation();
                            await deleteNotification(alram.notification_id);
                            setAlrams((prev) =>
                              prev.filter(
                                (el) =>
                                  el.notification_id !== alram.notification_id
                              )
                            );
                            close();
                          }}
                          className="text-xs text-success"
                        >
                          알림 확인
                        </button>
                      </div>
                    </div>
                  )}
                </Menu.Item>
              );
            }
            return <></>;
          })}
        </Menu.Items>
      ) : (
        <Menu.Items
          className="absolute p-2 -right-20 mt-2 w-[400px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 
        gap-y-2 focus:outline-none"
        >
          <Menu.Item>
            <div
              onClick={() => {}}
              className={`text-slate-400 group text-center w-full  rounded-md px-2 py-2 text-sm transition-colors`}
            >
              도착한 알림이 없어요!
            </div>
          </Menu.Item>
        </Menu.Items>
      )}
    </Menu>
  );
};

export default Alram;
