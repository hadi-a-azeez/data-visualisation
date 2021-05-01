import { Bar } from "react-chartjs-2";

const RevenueTotalChart = ({ datas }) => {
  const revenueLabels = [];
  const revenueData = [];

  for (let i = 0; i < 6; i++) {
    revenueLabels.push(datas[i].dates);
    revenueData.push(datas[i].total);
  }

  const data = {
    labels: revenueLabels,
    datasets: [
      {
        label: "Revenue",
        data: revenueData,
        backgroundColor: "#fd7670",
        borderColor: "#fd7670",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <>
      <Bar data={data} options={options} width={300} height={150} />
    </>
  );
};

export default RevenueTotalChart;
