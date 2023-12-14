import React from "react";
import { useNavigate } from "react-router-dom";

interface MyStudyCardProps {}

const MyStudyCard = () => {
  const nav = useNavigate();

  return (
    <div className="w-full p-4 border rounded-lg border-primary cursor-pointer shadow-sm">
      <h2 className="text-xl font-semibold">나의 첫 영어 공부</h2>
      <div className="flex justify-between mt-4">
        <div className="flex gap-x-2">
          <div className="badge badge-primary">#단어</div>
          <div className="badge badge-primary">#대화</div>
        </div>
        <time className="text-neutral">2022.01.03</time>
      </div>
    </div>
  );
};

export default MyStudyCard;
