interface SkeletonCardProps {
  type: "card" | "list";
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ type }) => {
  if (type === "card") {
    return (
      <div className="flex flex-col gap-4 w-full">
        <div className="skeleton h-44 w-full "></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    );
  }

  if (type === "list") {
    return (
      <div className="w-full relative flex gap-x-4 flex-rowspace-x-5 space-y-3 rounded-xl shadow-lg p-3  max-w-3xl mx-auto border border-white bg-white">
        <div className="skeleton hidden max-w-[150px] sm:grid place-items-center">
          <div className="skeleton rounded-xl w-[150px] aspect-square flex items-center justify-center text-white"></div>
        </div>
        <div className="skeleton w-full flex flex-col flex-1 bg-white space-y-2 p-3 md:w-2/3 ">
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );
  }

  return null;
};

export default SkeletonCard;
