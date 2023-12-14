import { useState } from "react";

import { Grid2X2, LayoutList } from "lucide-react";

import Inner from "../../components/common/inner";
import Title from "../../components/common/title";
import CardList from "../../components/study/card-list";

export default function MyStudy() {
  const today = new Date();
  const [cardType, setCardType] = useState<"list" | "card">("card");

  return (
    <Inner>
      <section className="">
        <Title
          title="어서오세요 0 0 0 님!"
          subtitle={`${today.getFullYear()}년 ${today.getMonth()}월 ${today.getDay()}일 까지 공부한 내용을 확인해 보세요`}
        />
        <div
          className="mt-5 flex flex-col px-2 items-center gap-y-2 
        sm:px-0 sm:gap-y-0 sm:justify-between sm:flex-row
        "
        >
          <input
            type="text"
            placeholder="제목으로 검색"
            className=" input input-bordered input-primary w-full max-w-sm rounded-full"
          />
          <div className="flex items-center gap-x-4">
            <select className="select-primary bg-transparent rounded-md px-3 py-1 ">
              <option>최신순</option>
              <option>필터1</option>
              <option>필터2</option>
            </select>
            <div className="join gap-x-1">
              <button
                className={"join-item"}
                style={{
                  color: `${(cardType === "card" && "#5964E0") || "#757575"}`,
                }}
                onClick={() => setCardType("card")}
              >
                <Grid2X2 />
              </button>
              <button
                className={"join-item"}
                style={{
                  color: `${(cardType === "list" && "#5964E0") || "#757575"}`,
                }}
                onClick={() => setCardType("list")}
              >
                <LayoutList />
              </button>
            </div>
          </div>
        </div>
      </section>
      <CardList type={cardType} />
    </Inner>
  );
}
