import { Fragment, useCallback } from "react";
import { useRecoilValue } from "recoil";

import { useForm } from "react-hook-form";
import { PenSquare } from "lucide-react";
import { Menu, Transition } from "@headlessui/react";

import {
  profileModifyModal,
  useProfileModifyModal,
} from "../../hooks/use-profile-modify-modal";
import Modal from "./modal";
import Avatar from "../common/avatar";

import { MyProfileFormData } from "../../types/interface/form-interface";
import { useProfileImageUploader } from "../../hooks/use-profile";

const ProfileModifyModal = () => {
  const profileModalValue = useRecoilValue(profileModifyModal);
  const { onClose } = useProfileModifyModal();

  const { register, handleSubmit } = useForm<MyProfileFormData>({
    values: {
      nickname: profileModalValue.profileData?.nickname || "",
      password: "",
    },
  });

  const { handleFileChange } = useProfileImageUploader();

  const onImageModify = async () => {};

  const onImageDelete = () => {};

  const onSubmit = (data: MyProfileFormData) => {
    console.log(data);
  };

  return (
    <Modal
      isOpen={profileModalValue.isOpen}
      onClose={onClose}
      title="프로필 수정"
      desc="프로필 정보를 수정해 보세요"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 flex flex-col items-center justify-center gap-y-3">
          <div className="relative">
            <Avatar
              imgUrl={profileModalValue.profileData?.profileImage}
              className="w-40"
            />
            <Menu as="div" className="absolute bottom-0 inline-block text-left">
              <Menu.Button className="inline-flex w-full justify-center rounded-md  px-4 py-2 text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                <PenSquare className="absolute text-neutral bottom-0 right-0 transition-colors hover:text-primary cursor-pointer " />
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
                <Menu.Items className="absolute mt-2 w-32 divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <input
                          accept="image/*"
                          type="file"
                          className={`${
                            active
                              ? "bg-primary transition-colors text-white"
                              : "text-gray-900"
                          } group text-center flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          onChange={handleFileChange}
                        >
                          이미지 수정
                        </input>
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
                          } group text-center flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          onClick={() => {
                            console.log("menu2");
                          }}
                        >
                          이미지 삭제
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <input
            className="input text-center input-primary"
            placeholder="닉네임을 입력해 주세요"
            {...register("nickname", {
              required: "제목을 입력해 주세요",
              minLength: {
                value: 2,
                message: "최소 2글자 이상 입력해야 합니다.",
              },
            })}
          />
          <input
            className="input text-center input-primary"
            placeholder="비밀번호를 입력해 주세요"
            type="password"
            {...register("password", {
              required: "비밀번호를 입력해 주세요",
            })}
          />
        </div>
        <div className="w-full flex justify-end mt-9 gap-x-3">
          <button
            type="button"
            className="btn btn-outline px-6"
            onClick={onClose}
          >
            취소
          </button>
          <button type="submit" className="btn btn-primary text-white px-6">
            수정
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProfileModifyModal;
