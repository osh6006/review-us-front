import { Menu } from "@headlessui/react";
import { Bell } from "lucide-react";
import { privateApi } from "../utils/axios-setting";

interface AlramProps {
  userInfo: string;
}

const Alram: React.FC<AlramProps> = ({ userInfo }) => {
  //   useEffect(() => {
  //     const sse = new EventSource(
  //       `${process.env.REACT_APP_SERVER_URL}/notifications/subscribe`,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     function getRealtimeData(data: any) {
  //       // process the data here,
  //       // then pass it to state to be rendered
  //       console.log(data);
  //     }
  //     sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
  //     sse.onerror = (e) => {
  //       // error log here
  //       sse.close();
  //     };
  //     return () => {
  //       sse.close();
  //     };
  //   }, []);

  //   useEffect(() => {
  //     let eventSource: EventSourcePolyfill;
  //     const { accessToken } = JSON.parse(userInfo);

  //     const connect = async () => {
  //       if (!accessToken) {
  //         return;
  //       }
  //       eventSource = new EventSourcePolyfill(
  //         `${process.env.REACT_APP_SERVER_URL}/notifications/subscribe`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       );

  //       console.log(eventSource.readyState);

  //       eventSource.addEventListener("connect", (event) => {
  //         console.log(event);
  //       });
  //       eventSource.addEventListener("addComment", (event) => {
  //         console.log(event);
  //       });
  //       eventSource.addEventListener("notificationCount", (event) => {
  //         console.log(event);
  //       });
  //     };

  //     connect();

  //     return () => {
  //       eventSource.close();
  //     };
  //   }, [userInfo]);

  const handleMenuClick = async () => {
    await privateApi
      .get(`${process.env.REACT_APP_SERVER_URL}/reviewnotify/send`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button onClick={handleMenuClick}>
        <div className="relative">
          <Bell />
          {/* {sendDAta && (
            <span className="absolute w-[12px] h-[12px] -top-1 -right-1 bg-success rounded-full" />
          )} */}
        </div>
      </Menu.Button>
      <Menu.Items className="absolute p-2 right-0 mt-2 w-72 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <div
              onClick={() => {}}
              className={`${
                active ? "bg-primary text-white" : "text-gray-900"
              } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors`}
            >
              마이 페이지
            </div>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={async () => {}}
              className={`${
                active ? "bg-primary text-white" : "text-gray-900"
              } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors`}
            >
              로그아웃
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default Alram;
