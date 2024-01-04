// import { useNavigate } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { MyStudy } from "../../types/interface/response-interface";
import { formatDate } from "../../utils/date";

interface MyStudyCardProps {
  study: Omit<MyStudy, "alarm" | "content"> & { tagList: string[] };
}

const MyStudyCard: React.FunctionComponent<MyStudyCardProps> = ({ study }) => {
  const nav = useNavigate();

  return (
    <div
      className="w-full border rounded-lg border-primary cursor-pointer shadow-md px-4 py-2 transition-all
    hover:translate-x-1 hover:-translate-y-1
    "
      onClick={() => {
        nav(`/mystudy/${study.boardNumber}`);
      }}
    >
      <h2 className="text-xl font-semibold">{study.title}</h2>
      <div className="flex justify-between mt-4">
        <div className="flex gap-x-2">
          {study.tagList.map((el) => {
            return <span className="badge badge-primary">{el}</span>;
          })}
        </div>
      </div>
      <div className="flex justify-end mt-1">
        <time className="text-xs text-neutral">
          {formatDate(study.writeDatetime)}
        </time>
      </div>
    </div>
  );
};

export default MyStudyCard;
