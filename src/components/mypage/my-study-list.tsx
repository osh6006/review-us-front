import React from "react";
import MyStudyCard from "./my-study-card";

interface MyPageStudyListProps {
  list: [];
}

const MyPageStudyList = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
      {[1, 2, 3, 4, 5, 6].map((el) => (
        <MyStudyCard key={el} />
      ))}
    </div>
  );
};

export default MyPageStudyList;
