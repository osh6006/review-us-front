import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import { useMyStudiesQuery } from "../../hooks/use-study";
// import { useFakeMyStudiesQuery } from "../../hooks/use-fake-study";

import Card from "./card";
import SkeletonCard from "../common/skeleton/skeleton-card";
import { Fragment } from "react";
import Loading from "../common/loading";

interface CardListProps {
  type: "list" | "card";
  searchValue?: string;
}

const CardList: React.FC<CardListProps> = ({ type, searchValue }) => {
  const nav = useNavigate();

  const { data, isLoading, isError, isSuccess, isFetching, fetchNextPage } =
    useMyStudiesQuery();

  if (isLoading) {
    return (
      <ul
        className={clsx(
          `px-4 my-4`,
          type === "card"
            ? `grid gap-2 grid-cols-1 justify-items-center
    sm:grid-cols-2 sm:px-0 sm:my-8 sm:justify-items-start sm:gap-3
    md:grid-cols-3
    xl:grid-cols-4 xl:gap-4
    `
            : `grid gap-y-2 grid-cols-1 justify-items-center
      lg:grid-cols-2 sm:px-0 sm:my-8 sm:gap-2 sm:justify-items-start
      `
        )}
      >
        {[1, 2, 3, 4, 5].map((el) => {
          return <SkeletonCard key={el} type={type} />;
        })}
      </ul>
    );
  }

  if (isError) {
    return (
      <div
        className="w-full min-h-[400px] flex flex-col px-3 items-center justify-center gap-y-4 
    sm:min-h-[500px] sm:gap-8
    "
      >
        <h2 className=" text-md  text-neutral sm:text-xl ">
          데이터를 가져오는 도중 에러가 발생했어요
        </h2>
      </div>
    );
  }

  return (
    <section>
      {isSuccess && data?.pages.length <= 0 && (
        <div
          className="w-full min-h-[400px] flex flex-col px-3 items-center justify-center gap-y-4 
          sm:min-h-[500px] sm:gap-8
          "
        >
          <h2 className=" text-md  text-neutral sm:text-xl ">
            아직 복습을 시작하지 않았어요 시작해 볼까요?
          </h2>
          <button
            className="btn btn-wide btn-primary"
            onClick={() => nav("/mystudy/write")}
          >
            시작하기
          </button>
        </div>
      )}
      {isSuccess && (
        <>
          <ul
            className={clsx(
              `px-4 my-4`,
              type === "card"
                ? `grid gap-2 grid-cols-1 justify-items-center
        sm:grid-cols-2 sm:px-0 sm:my-8 sm:justify-items-start sm:gap-3
        md:grid-cols-3
        xl:grid-cols-4 xl:gap-4
        `
                : `grid gap-y-2 grid-cols-1 justify-items-center
          lg:grid-cols-2 sm:px-0 sm:my-8 sm:gap-2 sm:justify-items-start
          `
            )}
          >
            {data &&
              data.pages?.map((group, i) => (
                <Fragment key={i}>
                  {group &&
                    group?.noOffsetBoardlist.content.map((data) => (
                      <Card key={data.boardNumber} data={data} type={type} />
                    ))}
                </Fragment>
              ))}
          </ul>
          <div className="flex justify-center">
            <button
              disabled={isFetching}
              className="btn btn-primary btn-wide"
              onClick={() => fetchNextPage()}
            >
              {isFetching ? <Loading size="sm" type="spinner" /> : "더 보기"}
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default CardList;
