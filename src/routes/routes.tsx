import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { useRecoilValue } from "recoil";
import { tokenState } from "../recoil/auth-state";
import App from "../App";
import Error from "../pages/error";
import MyStudy from "../pages/my-study/my-study";
import MyStudyDetail from "../pages/my-study/my-study-detail";
import { ProtectedRoute } from "./protected-route";
import Auth from "../pages/auth";
import MyStudyWrite from "../pages/my-study/my-study-write";
import UserProfile from "../pages/profile";
import MyPage from "../pages/my-page";

const Routes = () => {
  const token = useRecoilValue(tokenState);

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
          path: "profile",
          element: <UserProfile />,
          errorElement: <Error />,
        },
        {
          path: "mypage",
          element: <MyPage />,
          errorElement: <Error />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  // 유저가 로그인이 되어있지 않은경우 (토큰이 없는경우 접근 가능)
  const routesForNotAuthenticatedOnly: RouteObject[] = [
    {
      path: "/auth",
      element: !token ? <Auth /> : <Error />,
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
