import ApexChart from "react-apexcharts";

const ForgottedChart = () => {
  const series = [
    {
      name: "",
      data: [100, 60, 45, 35, 25, 20, 15],
    },
    {
      name: "",
      data: [80, 45, 35, 25, 20, 15],
    },
    {
      name: "",
      data: [60, 45, 35, 25, 20, 15],
    },
  ];

  return (
    <div className="w-full lg:max-w-md">
      <ApexChart
        type="line"
        series={series}
        options={{
          theme: {
            mode: "light",
          },
          chart: {
            width: "100%",
            height: "100%",
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          grid: { show: false },
          stroke: {
            curve: "smooth",
            width: 2,
          },
          xaxis: {
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { show: false },
            type: "category",
            crosshairs: { show: false },
          },
          yaxis: {
            show: false,
          },
          tooltip: {
            y: {
              formatter: (value) => `${value}`,
            },
          },
        }}
      />
    </div>
  );
};

export default ForgottedChart;
