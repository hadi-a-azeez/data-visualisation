//import axios from "axios";
import { Pie } from "react-chartjs-2";

const CustomerType = ({ datas }) => {
  const cusotmerData = [datas[0].counts, datas[1].counts];
  const labels = ["Customer", "Reseller"];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Orders",
        data: cusotmerData,
        backgroundColor: ["rgba(255, 99, 132, 0.9)", "rgba(54, 162, 235, 0.9)"],
        borderColor: "#fd7670",
        borderColor: "white",
        borderWidth: 1,
      },
    ],
  };

  const options = {};

  return (
    <>
      <Pie data={data} options={options} width={300} height={150} />
    </>
  );
};

export default CustomerType;
