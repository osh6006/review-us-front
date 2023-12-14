import { useNavigate } from "react-router-dom";
import { MyStudy } from "../../types/interface/response-interface";
import DOMPurify from "dompurify";
import { ImageOff } from "lucide-react";

interface CardProps {
  data: MyStudy;
  type: "list" | "card";
}

const Card: React.FC<CardProps> = ({ data, type }) => {
  const nav = useNavigate();
  const purifiedHTML = DOMPurify.sanitize(data.content);
  const parser = new DOMParser();
  const doc = parser.parseFromString(purifiedHTML, "text/html");
  const images = doc.querySelectorAll("img");
  const text = doc.body.textContent;

  const title = data.title;
  const thumbnail = images.length > 0 ? images[0].src : null;
  const dateTime = data.writeDatetime.split(" ")[0];

  const cutNum = type === "card" ? 50 : 120;
  const content =
    text && text.length < cutNum ? text : text?.slice(0, cutNum) + "...";

  return (
    <>
      {type === "card" ? (
        <li
          onClick={() => nav(`/mystudy/${data.boardNumber}`)}
          className="relative card w-full bg-base-100 shadow-xl cursor-pointer
          hover:opacity-50 transition-opacity
      "
        >
          <figure>
            {thumbnail ? (
              <img src={thumbnail} alt="thumbnail" className="w-full h-52" />
            ) : (
              <div className="w-full flex items-center justify-center h-52 bg-neutral text-white">
                <ImageOff size={50} />
              </div>
            )}
          </figure>
          <div className="card-body border-t-2">
            <h2 className="card-title text-xl">{title}</h2>
            <div className="card-actions justify-end text-sm text-neutral">
              {dateTime}
            </div>
            <div className="mt-4">{content}</div>
          </div>
        </li>
      ) : (
        <li
          className="w-full flex justify-center cursor-pointer hover:opacity-70 transition-opacity"
          onClick={() => nav(`/mystudy/${data.boardNumber}`)}
        >
          <div className="w-full relative flex gap-x-4 flex-rowspace-x-5 space-y-3 rounded-xl shadow-lg p-3  max-w-3xl mx-auto border border-white bg-white">
            <div className="hidden max-w-[150px] sm:grid place-items-center">
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt="thumbnail"
                  className="rounded-xl aspect-square"
                />
              ) : (
                <div className="rounded-xl w-[150px] aspect-square flex items-center justify-center bg-neutral text-white">
                  <ImageOff size={50} />
                </div>
              )}
            </div>
            <div className="w-full flex flex-col flex-1 bg-white space-y-2 p-3 md:w-2/3 ">
              <h3 className="font-black text-gray-800 md:text-2xl text-xl">
                {title}
              </h3>
              <div className="card-actions justify-end text-sm text-neutral">
                {dateTime}
              </div>
              <p className="md:text-lg text-gray-500 text-base">{content}</p>
            </div>
          </div>
        </li>
      )}
    </>
  );
};

export default Card;
