import { Menu } from "@headlessui/react";
import Avatar from "./avatar";
import { useAuthentication } from "../../recoil/auth-state";
import { useNavigate } from "react-router-dom";

const AvatarMenu = () => {
  const { logout } = useAuthentication();
  const nav = useNavigate();

  return (
    <Menu as="div" className="relative">
      <Menu.Button>
        <Avatar
          isIndicator
          indicatorNum={99}
          className="cursor-pointer hover:border-2 duration-100"
        />
      </Menu.Button>
      <Menu.Items className="absolute p-2 right-0 mt-2 w-28 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={() => nav("/")}
              className={`${
                active ? "bg-primary text-white" : "text-gray-900"
              } group flex w-full items-center justify-between rounded-md px-2 py-2 text-sm transition-colors`}
            >
              알림
              <span className="badge badge-success group-hover:text-white">
                +99
              </span>
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={() => nav("/myPage")}
              className={`${
                active ? "bg-primary text-white" : "text-gray-900"
              } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors`}
            >
              마이 페이지
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={() => logout()}
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

export default AvatarMenu;
