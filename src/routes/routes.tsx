import { useEffect, useState } from "react";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import App from "../App";
import Error from "../pages/error";
import MyStudy from "../pages/my-study/my-study";
import MyStudyDetail from "../pages/my-study/my-study-detail";
import { ProtectedRoute } from "./protected-route";
import Auth from "../pages/auth";
import MyStudyWrite from "../pages/my-study/my-study-write";
import MyPage from "../pages/my-page";

import { fetchEventSource } from "@microsoft/fetch-event-source";

const Routes = () => {
  const userInfo = localStorage.getItem("userInfo");

  // useEffect(() => {
  //   if (userInfo) {
  //     const fetchData = async () => {
  //       const { accessToken } = JSON.parse(userInfo);
  //       await fetchEventSource(
  //         `${process.env.REACT_APP_SERVER_URL}/notifications/subscribe`,
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //             // Connection: "keep-alive",
  //           },
  //           async onopen(response) {
  //             if (response.ok && response.status === 200) {
  //               console.log("Connection made ", response);
  //             } else if (
  //               response.status >= 400 &&
  //               response.status < 500 &&
  //               response.status !== 429
  //             ) {
  //               console.log("Client side error ", response);
  //             }
  //           },
  //           onmessage(event) {
  //             console.log("message", event.data);
  //             const parsedData = JSON.parse(event.data);
  //             console.log(parsedData);
  //           },
  //           onclose() {
  //             console.log("Connection closed by the server");
  //           },
  //           onerror(err) {
  //             console.log("There was an error from server", err);
  //           },
  //         }
  //       );
  //     };
  //     fetchData();
  //   }
  // }, [userInfo]);

  // useEffect(() => {
  //   let eventSource: EventSource;
  //   if (userInfo && !listening) {
  //     const { accessToken } = JSON.parse(userInfo);
  //     console.log(accessToken);

  //     const fetchSse = () => {
  //       try {
  //         eventSource = new EventSource(
  //           `${process.env.REACT_APP_SERVER_URL}/notifications/subscribe`,

  //           {
  //             headers: {
  //               Authorization: `Bearer ${accessToken}`,
  //               "Content-Type": "text/event-stream",
  //             },
  //             withCredentials: true,
  //           }
  //         );

  //         eventSource.onopen = (event) => {
  //           console.log("connection opened");
  //         };

  //         /* EVENTSOURCE ONMESSAGE ---------------------------------------------------- */
  //         eventSource.onmessage = (event: any) => {
  //           eventSource.onmessage = (event) => {
  //             const eventData = JSON.parse(event.data);

  //             console.log(eventData);

  //             switch (event.type) {
  //               case "connect":
  //                 // 'connect' 이벤트에 대한 처리
  //                 console.log("Connect event received");
  //                 break;

  //               case "addComment":
  //                 // 'addComment' 이벤트에 대한 처리
  //                 console.log("Add Comment event received:", eventData);
  //                 // 여기서 필요한 로직을 수행하면 됩니다.
  //                 break;

  //               case "notificationCount":
  //                 // 'notificationCount' 이벤트에 대한 처리
  //                 console.log("Notification Count event received:", eventData);
  //                 // 여기서 필요한 로직을 수행하면 됩니다.
  //                 break;

  //               default:
  //                 // 알 수 없는 이벤트에 대한 처리
  //                 console.log("Unknown event type:", event.type);
  //             }
  //           };
  //         };

  //         /* EVENTSOURCE ONERROR ------------------------------------------------------ */
  //         eventSource.onerror = async (event: any) => {
  //           if (!event.error.message.includes("No activity"))
  //             eventSource.close();
  //         };
  //       } catch (error) {}
  //     };
  //     fetchSse();
  //     setListening(true);
  //     return () => eventSource.close();
  //   }
  // }, [userInfo, EventSource, listening]);

  // Define public routes accessible to all users
  // 권한 없이 모두 접근이 가능함
  const routesForPublic: RouteObject[] = [];

  // Define routes accessible only to authenticated users
  // 인증된 유저만 접근
  const routesForAuthenticatedOnly: RouteObject[] = [
    {
      path: "/",
      element: <App />,
      errorElement: <Error />,
      children: [
        {
          path: "mystudy",
          element: <ProtectedRoute />,
          children: [
            {
              path: "/mystudy",
              element: <MyStudy />,
              errorElement: <Error />,
            },
            {
              path: "/mystudy/write",
              element: <MyStudyWrite />,
              errorElement: <Error />,
            },
            {
              path: "/mystudy/:studyId",
              element: <MyStudyDetail />,
              errorElement: <Error />,
            },
            {
              path: "/mystudy/:studyId/form",
              element: <MyStudyDetail />,
              errorElement: <Error />,
            },
          ],
        },

        {
          path: "mypage",
          element: <ProtectedRoute />,
          errorElement: <Error />,
          children: [
            {
              path: "",
              element: <MyPage />,
              errorElement: <Error />,
            },
          ],
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  // 유저가 로그인이 되어있지 않은경우 (토큰이 없는경우 접근 가능)
  const routesForNotAuthenticatedOnly: RouteObject[] = [
    {
      path: "/auth",
      element: !userInfo ? <Auth /> : <Error />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForNotAuthenticatedOnly,
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
