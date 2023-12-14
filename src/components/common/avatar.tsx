import clsx from "clsx";
import { Plus } from "lucide-react";

interface AvatarProps {
  className?: string;
  indicatorNum?: number;
  isIndicator?: boolean;
  imgUrl?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  isIndicator,
  indicatorNum,
  className,
  imgUrl,
}) => {
  return (
    <div className="avatar indicator placeholder">
      {isIndicator && (
        <span className="indicator-item badge badge-success text-white text-xs">
          <Plus size={10} />
          {indicatorNum || 0}
        </span>
      )}
      {imgUrl ? (
        <div className={clsx("rounded-full", className)}>
          <img
            alt="avatar"
            src={
              "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            }
          />
        </div>
      ) : (
        <div
          className={clsx(
            "bg-neutral text-neutral-content rounded-full w-10 ",
            className
          )}
        >
          <span className="text-xs">MX</span>
        </div>
      )}
    </div>
  );
};

export default Avatar;
