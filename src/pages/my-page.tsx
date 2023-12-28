import Avatar from "../components/common/avatar";
import Inner from "../components/common/inner";
import Loading from "../components/common/loading";
import Title from "../components/common/title";
import MyStudyHistory from "../components/mypage/my-study-history";
import MyPageStudyList from "../components/mypage/my-study-list";

import { useMyProfileQuery } from "../hooks/use-profile";
import { useProfileModifyModal } from "../hooks/use-profile-modify-modal";
import Error from "./error";

export default function MyPage() {
  const { onOpen } = useProfileModifyModal();

  const {
    data: profile,
    isLoading,
    error,
    isError,
    isSuccess,
  } = useMyProfileQuery();

  console.log(error?.code);

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
            className="flex flex-col w-full mt-8
      sm:flex-row
      "
          >
            <div className="flex flex-col items-center justify-center gap-y-2">
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
            <div className="flex-1 sm:ml-20 ">
              <h2 className="text-2xl font-semibold mt-3 mb-3 text-center sm:text-start sm:mt-0">
                최근 기록
              </h2>
              <MyPageStudyList />
            </div>
          </section>
          <div className="divider divider-primary"></div>
          <h2 className="text-2xl font-semibold mt-3 mb-3 text-center sm:text-start sm:mt-0">
            히스토리
          </h2>
          <MyStudyHistory />
        </>
      }
    </Inner>
  );
}
