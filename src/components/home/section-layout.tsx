import React from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import Layout from "../common/layout";
import ForgottedChart from "./forgotted-chart";

interface SectionLayoutProps {
  imgUrl: string;
  title: string;
  desc: string;
  isReverse?: boolean;
  textColor?: string;
  bgColor?: string;
  isImage: boolean;
  isLast?: boolean;
  isSecondary?: boolean;
}

const SectionLayout: React.FC<SectionLayoutProps> = ({
  imgUrl = "/logo512.png",
  title = "Box Office News!",
  desc = "Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae eta id nisi.",
  isReverse = false,
  textColor = "text-white",
  bgColor = "bg-white",
  isImage = true,
  isLast = false,
  isSecondary = false,
}) => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div
        className={clsx(
          "hero min-h-screen lg:min-h-[760px]",
          isLast ? "border-primary border-t-2" : "",
          textColor,
          bgColor
        )}
      >
        <div
          className={clsx(
            "hero-content gap-10 lg:text-left xl:gap-64",
            isReverse
              ? "flex-col lg:flex-row justify-between"
              : "flex-col-reverse  lg:flex-row-reverse justify-between"
          )}
        >
          {isImage ? (
            <img
              alt="banner"
              src={clsx(imgUrl)}
              className="max-w-xs lg:max-w-md rounded-xl shadow-2xl"
            />
          ) : (
            <ForgottedChart />
          )}

          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="text-3xl sm:text-5xl font-bold max-w-sm lg:leading-[58px]">
              {title?.split("\n")?.map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </h1>
            <p className="py-6 text-base font-light max-w-sm">
              {desc?.split("\n")?.map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
            <button
              onClick={() => navigate("/mystudy")}
              className={clsx(
                "btn btn-wide font-bold text-white",
                isSecondary ? "btn-primary" : "btn-secondary"
              )}
            >
              지금 시작하기
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SectionLayout;
