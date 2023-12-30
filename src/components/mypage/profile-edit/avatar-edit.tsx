import { Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";

import Avatar from "../../common/avatar";

interface AvatarEditProps {
  imageUrl: string | null;
  handleButtonClick: () => void;
}

const AvatarEdit: React.FC<AvatarEditProps> = ({
  imageUrl,
  handleButtonClick,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center ">
      <Avatar imgUrl={imageUrl} className="w-40" />
      <Menu as="div" className="relative mt-2 inline-block text-left">
        <Menu.Button className="inline-flex w-full justify-center rounded-md  px-4 py-2 text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          <div role="button" className="btn btn-primary btn-wide">
            수정하기
          </div>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className="absolute left-[50%] mt-1 w-[16em] divide-y divide-gray-100 rounded-md bg-white shadow-lg 
          ring-1 ring-black/5 focus:outline-none
          -translate-x-1/2
          "
          >
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={`${
                    active
                      ? "bg-primary transition-colors text-white"
                      : "text-gray-900"
                  } group flex w-full items-center justify-center rounded-md px-2 py-2 text-sm`}
                  onClick={handleButtonClick}
                >
                  이미지 수정
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={`${
                    active
                      ? "bg-primary transition-colors text-white"
                      : "text-gray-900"
                  } group flex w-full items-center justify-center rounded-md px-2 py-2 text-sm`}
                  onClick={() => {
                    // console.log("menu2");
                  }}
                >
                  이미지 삭제
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default AvatarEdit;
