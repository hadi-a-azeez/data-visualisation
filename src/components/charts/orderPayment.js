import { Pie } from "react-chartjs-2";

const OrderPayment = ({ datas }) => {
  const ordersPaymentLabels = ["Bank", "Cash", "COD"];
  const ordersPaymentData = [];

  datas.map((item) => ordersPaymentData.push(item.counts));

  const data = {
    labels: ordersPaymentLabels,
    datasets: [
      {
        label: "Orders",
        data: ordersPaymentData,
        backgroundColor: [
          "#fd7670",
          "rgba(255, 99, 132, 0.9)",
          "rgba(54, 162, 235, 0.9)",
        ],
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
      <Pie data={data} options={options} width={300} height={150} />
    </>
  );
};

export default OrderPayment;
