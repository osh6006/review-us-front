import Avatar from "../components/common/avatar";
import Inner from "../components/common/inner";
import Title from "../components/common/title";
import MyStudyHistory from "../components/mypage/my-study-history";
import MyPageStudyList from "../components/mypage/my-study-list";

export default function MyPage() {
  return (
    <Inner>
      <Title title="마이 페이지" />
      <section
        className="flex flex-col w-full mt-8
      sm:flex-row
      "
      >
        <div className="flex flex-col items-center justify-center gap-y-2">
          <Avatar imgUrl="asdf" className="w-56" />
          <div className="text-center">
            <h2 className="text-2xl font-bold">열심이</h2>
            <h4 className="text-neutral">test@gmail.com</h4>
          </div>
          <button className="btn w-full btn-primary btn-outline btn-md">
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
    </Inner>
  );
}
