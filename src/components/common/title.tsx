interface TitleProps {
  title: string;
  subtitle?: string;
}

const Title: React.FC<TitleProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center sm:text-left">
      <h1 className=" text-2xl sm:text-3xl lg:text-3xl font-bold">{title}</h1>
      <p className="mt-1 text-neutral text-sm md:text-base ">{subtitle}</p>
    </div>
  );
};

export default Title;
