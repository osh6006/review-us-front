import clsx from "clsx";
import DOMPurify from "dompurify";

import { useNavigate, useParams } from "react-router-dom";

import { Switch } from "@headlessui/react";
import { PenSquare, Trash2 } from "lucide-react";

import Inner from "../../components/common/inner";
import Loading from "../../components/common/loading";

import { useRecoilValue } from "recoil";

import { useMyStudyDetailQuery } from "../../hooks/use-study";
import { useFakeMyStudyDetailQuery } from "../../hooks/use-fake-study";
import { deleteModalState, useDeleteModal } from "../../hooks/use-delete-modal";

export default function MyStudyDetail() {
  const nav = useNavigate();
  const { studyId } = useParams();

  const { isDelete } = useRecoilValue(deleteModalState);
  const { onOpen } = useDeleteModal();

  if (isDelete) {
    nav("/mystudy", { replace: false });
  }

  const { data, isLoading, isError, error } = useMyStudyDetailQuery(
    Number(studyId) || undefined
  );

  // const { data, isLoading, isError, error } = useFakeMyStudyDetailQuery(
  //   Number(studyId) || undefined
  // );

  const title = data?.title;
  const isAlram = data?.alarm;
  const date = data?.writeDatetime.split(" ")[0];
  const tags = data?.tagList;
  const contents = DOMPurify.sanitize(String(data?.content));

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
      <div className="min-h-screen max-w-5xl mx-auto">
        <section>
          <h1
            className="text-2xl font-bold text-center
            md:text-left
            sm:text-3xl
            lg:text-4xl
            "
          >
            {title}
          </h1>
          <p className="mt-10 text-end text-neutral md:text-lg tracking-widest">
            {date}
          </p>
        </section>
        <section className="w-full flex items-center justify-between mt-2">
          <div className="flex gap-x-2">
            {tags?.map((tag, i) => (
              <div
                key={i}
                className="text-sm font-semibold text-primary
              sm:text-xl
              "
              >
                #{tag}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-x-2">
            <Switch.Group>
              <Switch.Label
                className={clsx(
                  "mr-1 font-bold text-sm transition-all sm:text-xl",
                  isAlram ? " text-primary " : "text-neutral"
                )}
              >
                {"망각곡선 알림"}
              </Switch.Label>
              <Switch
                checked={isAlram}
                onChange={() => {}}
                className={clsx(
                  isAlram ? "bg-primary" : "bg-neutral",
                  "relative inline-flex w-9 h-5 items-center rounded-full sm:h-6 sm:w-11"
                )}
              >
                <span className="sr-only">Enable notifications</span>
                <span
                  className={`${
                    isAlram ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </Switch.Group>
            <PenSquare
              onClick={() => {
                nav(`/mystudy/write?id=${studyId}`);
              }}
              className="text-neutral hover:text-primary transition-colors cursor-pointer"
            />
            <Trash2
              onClick={() => onOpen(Number(studyId) || null)}
              className="text-neutral hover:text-primary transition-colors cursor-pointer"
            />
          </div>
        </section>
        <section className="mt-8">
          <div
            className="preview-container"
            dangerouslySetInnerHTML={{
              __html: contents,
            }}
          />
        </section>
      </div>
    </Inner>
  );
}
