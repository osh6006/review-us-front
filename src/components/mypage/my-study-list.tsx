import { useLatestStudy } from "../../hooks/use-profile";
import Loading from "../common/loading";
import MyStudyCard from "./my-study-card";

const MyPageStudyList = () => {
  const { data, isLoading, isError, isSuccess } = useLatestStudy();

  if (isLoading) {
    return (
      <div className="flex w-full min-h-[250px] text-neutral text-xl justify-center items-center">
        <Loading size="md" type="spinner" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex w-full min-h-[250px] text-neutral text-xl justify-center items-center">
        <h1>서버 에러가 발생하였습니다.</h1>
      </div>
    );
  }

  if (isSuccess && data?.latestBoardList?.length <= 0) {
    return (
      <div className="flex w-full min-h-[250px] text-neutral text-xl justify-center items-center">
        <h1>아직 작성한 복습이 없습니다</h1>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 
    "
    >
      {isSuccess && data && (
        <>
          {data.latestBoardList.map((study) => {
            return <MyStudyCard key={study.boardNumber} study={study} />;
          })}
        </>
      )}
    </div>
  );
};

export default MyPageStudyList;
