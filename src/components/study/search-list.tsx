import clsx from "clsx";
import { useMyStudiesSearchQuery } from "../../hooks/use-study";

import Card from "./card";
import SkeletonCard from "../common/skeleton/skeleton-card";
import { useEffect, useState } from "react";
import { getMyStudiesBySearch } from "../../apis/study";
import { MyStudySearchResponse } from "../../types/interface";

interface CardListProps {
  type: "list" | "card";
  searchValue: string;
}

const SearchCardList: React.FC<CardListProps> = ({ type, searchValue }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<MyStudySearchResponse | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getMyStudiesBySearch(searchValue)
      .then((res) => setData(res))
      .catch((error) => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [searchValue]);

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
      {data && data?.searchList?.length <= 0 ? (
        <>
          <div
            className="w-full min-h-[400px] flex flex-col px-3 items-center justify-center gap-y-4
          sm:min-h-[500px] sm:gap-8
          "
          >
            <h2 className=" text-md  text-neutral sm:text-xl ">
              검색결과가 없습니다.
            </h2>
          </div>
        </>
      ) : (
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
          {data?.searchList.map((study) => {
            return <Card key={study.boardNumber} data={study} type={type} />;
          })}
        </ul>
      )}
    </section>
  );
};

export default SearchCardList;
