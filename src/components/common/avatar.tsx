import clsx from "clsx";

interface AvatarProps {
  className?: string;
  imgUrl?: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ className, imgUrl }) => {
  return (
    <div className="avatar placeholder relative">
      {imgUrl ? (
        <div className={clsx("rounded-full", className)}>
          <img alt="avatar" src={imgUrl} />
        </div>
      ) : (
        <div className={clsx("rounded-full", className)}>
          <img alt="avatar" src={"/images/no-profile.png"} />
        </div>
      )}
    </div>
  );
};

export default Avatar;
