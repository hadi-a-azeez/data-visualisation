import { Line } from "react-chartjs-2";

const OrdersCountChart = ({ datas }) => {
  const ordersCountLabels = [];
  const ordersCountData = [];

  for (let i = 0; i < 20; i++) {
    ordersCountLabels.push(datas[i].dates);
    ordersCountData.push(datas[i].counts);
  }

  //inverse the data
  ordersCountData.reverse();
  ordersCountLabels.reverse();

  const data = {
    labels: ordersCountLabels,
    datasets: [
      {
        label: "Orders",
        data: ordersCountData,
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
      <Line data={data} options={options} width={300} height={150} />
    </>
  );
};

export default OrdersCountChart;
