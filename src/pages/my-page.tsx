import Avatar from "../components/common/avatar";
import Inner from "../components/common/inner";
import Loading from "../components/common/loading";
import Title from "../components/common/title";
import MyStudyHistory from "../components/mypage/my-study-history";
import MyPageStudyList from "../components/mypage/my-study-list";
import UserDelete from "../components/mypage/user-delete";

import { useMyProfileQuery } from "../hooks/use-profile";
import { useProfileModifyModal } from "../hooks/use-profile-modify-modal";
import Error from "./error";

export default function MyPage() {
  const { onOpen } = useProfileModifyModal();

  const { data: profile, isLoading, isError } = useMyProfileQuery();

  if (isLoading) {
    return (
      <Inner>
        <div className="flex w-full h-[100dvh] justify-center items-center">
          <Loading type="spinner" size="lg" />
        </div>
      </Inner>
    );
  }

  if (isError) {
    return (
      <Inner>
        <Error />
      </Inner>
    );
  }

  return (
    <Inner>
      {
        <>
          <Title title="마이 페이지" />
          <section
            className="mx-auto flex flex-col items-center w-full mt-8 max-w-5xl
            sm:flex-row sm:items-center
            "
          >
            <div className="flex flex-col items-center justify-center gap-y-2 ">
              <div className="relative">
                <Avatar imgUrl={profile?.profileImage} className="w-56" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold">{profile?.nickname}</h2>
                <h4 className="text-neutral">{profile?.email}</h4>
              </div>
              <button
                onClick={() => onOpen(profile!)}
                className="btn w-full btn-primary btn-outline btn-md"
              >
                프로필 수정
              </button>
            </div>
            <div className="w-full flex-1 sm:ml-10">
              <h2
                className="text-2xl font-semibold mt-3 mb-3 text-center sm:text-start
              sm:mt-0"
              >
                최근 기록
              </h2>
              <MyPageStudyList />
            </div>
          </section>
          <MyStudyHistory />
          <UserDelete />
        </>
      }
    </Inner>
  );
}
