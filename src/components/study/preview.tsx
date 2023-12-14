import React from "react";
import DOMPurify from "dompurify";
import clsx from "clsx";

import { Switch } from "@headlessui/react";

import { MyStudyFormData } from "../../types/interface";
import "./custom-quill-result.css";

interface PreviewProps {
  priviewData: MyStudyFormData;
}

const Preview: React.FC<PreviewProps> = ({ priviewData }) => {
  return (
    <div className="p-5">
      <h1 className="font-bold text-4xl text-center">{priviewData.title}</h1>
      <div className="flex mt-10 gap-x-3 ">
        {priviewData?.tagList?.map((tag, i) => (
          <div key={i} className="badge badge-primary">
            {tag}
          </div>
        ))}
      </div>
      <div className="w-full flex justify-end my-3">
        <Switch.Group>
          <Switch.Label
            className={clsx(
              "mr-1 font-bold sm:text-lg transition-all",
              priviewData.alarm ? " text-primary " : "text-neutral"
            )}
          >
            망각곡선 알림
          </Switch.Label>
          <Switch
            disabled
            checked={priviewData.alarm}
            className={`${
              priviewData.alarm ? "bg-primary" : "bg-neutral"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                priviewData.alarm ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </Switch.Group>
      </div>
      {
        <div
          className="preview-container"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(String(priviewData.content)),
          }}
        />
      }
    </div>
  );
};

export default Preview;
