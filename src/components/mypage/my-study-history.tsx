import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReactCalendarHeatmap from "react-calendar-heatmap";
import "./custom-heatmap.css";

const MyStudyHistory = () => {
  const [selectDate, setSelectDate] = useState(new Date().getFullYear());

  return (
    <div
      className="w-full flex flex-col-reverse items-center my-8 gap-y-4
    sm:flex-row sm:gap-x-5 
    "
    >
      <div className="w-full sm:flex-1 overflow-x-scroll">
        <ReactCalendarHeatmap
          startDate={new Date(`${selectDate}-01-01`)}
          endDate={new Date(`${selectDate}-12-31`)}
          values={[
            { date: "2023-01-01", count: 12 },
            { date: "2023-01-22", count: 122 },
            { date: "2023-01-30", count: 38 },
            { date: "2023-11-27", count: 1 },
          ]}
          showMonthLabels
          showWeekdayLabels
          onClick={(value) => {
            if (value) {
              alert(value.count);
            }
          }}
          titleForValue={(value) => {
            if (value) return `${value.date} - ${value.count}`;
          }}
          tooltipDataAttrs={(value: any) => {
            return { "data-tooltip": "Tooltip: " + value };
          }}
          monthLabels={[
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
          ]}
          weekdayLabels={["일", "월", "화", "수", "목", "금", "토"]}
          classForValue={(value) => {
            if (!value) {
              return "color-empty";
            }
            if (value.count > 0 && value.count <= 2) {
              return "color-primary-1";
            }
            if (value.count > 2 && value.count <= 4) {
              return "color-primary-2";
            }
            if (value.count > 4 && value.count <= 6) {
              return "color-primary-3";
            }
            if (value.count > 6 && value.count <= 8) {
              return "color-primary-3";
            }
            if (value.count > 8) {
              return "color-primary-4";
            }
          }}
        />
      </div>
      <div className="flex sm:flex-col  items-center justify-center gap-x-4">
        <button onClick={() => setSelectDate(selectDate + 1)}>
          <ChevronUp className="hover:text-primary transition-colors" />
        </button>
        <p className="text-2xl">{selectDate}</p>
        <button onClick={() => setSelectDate(selectDate - 1)}>
          <ChevronDown className="hover:text-primary transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default MyStudyHistory;
