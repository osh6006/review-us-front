import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import Inner from "../../components/common/inner";
import Title from "../../components/common/title";
import StudyForm from "../../components/study/study-form";
import Preview from "../../components/study/preview";

import { MyStudyFormData } from "../../types/interface";
import { useFakeMyStudyDetailQuery } from "../../hooks/use-fake-study";
import { useMyStudyDetailQuery } from "../../hooks/use-study";
import Loading from "../../components/common/loading";

export default function MyStudyWrite() {
  const [searchParams, setSearchParams] = useSearchParams();
  const studyId = searchParams.get("id");
  const title = studyId
    ? "공부에 잘못된 내용이 있었나요?"
    : "오늘은 어떤 공부를 하셨나요?";

  const { data, isLoading, isError, error } = useMyStudyDetailQuery(
    Number(studyId) || undefined
  );

  // const { data, isLoading, isError, error } = useFakeMyStudyDetailQuery(
  //   Number(studyId) || undefined
  // );

  // 데이터를 가져오기 가져온 데이터가 있으면 그대로 아니면 초기 값 설정
  const [myStudyData, setMyStudyData] = useState<MyStudyFormData>({
    content: "",
    alarm: false,
    title: "",
    tagList: [],
    boardFileList: [],
  });

  useEffect(() => {
    if (studyId && data) {
      setMyStudyData({
        title: data.title,
        alarm: data.alarm,
        tagList: data.tagList,
        content: data.content,
        boardFileList: data.boardFileList,
      });
    }
  }, [studyId, data]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <Loading size="lg" type="svg" />
      </div>
    );
  }

  if (isError) {
    const errorData = error.response?.data as { code: number; message: string };
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <h1 className="uppercase tracking-widest text-xl text-gray-500">
          {` ${errorData.code} | ${errorData.message}`}
        </h1>
      </div>
    );
  }

  return (
    <Inner>
      <div className="flex flex-col gap-2 md:flex-row">
        <section className="flex-1">
          {/* 글쓰기 */}
          <div className="sm:max-w-[266px]">
            <Title title={title} />
          </div>
          <StudyForm
            myStudyData={myStudyData}
            setMyStudyData={setMyStudyData}
            studyId={studyId ? Number(studyId) : null}
          />
        </section>
        <div className="hidden lg:divider lg:divider-horizontal"></div>
        <section className="hidden lg:block flex-1 border-2 border-primary border-dashed rounded-lg ">
          {/* 미리보기 */}
          <Preview priviewData={myStudyData} />
        </section>
      </div>
    </Inner>
  );
}
