//import axios from "axios";
import { Doughnut } from "react-chartjs-2";

const CustomerLocation = ({ datas, orderCount }) => {
  const Malappuram = [];
  const Calicut = [];
  const Kannur = [];
  const Kasargod = [];
  const labels = ["Malappuram", "Calicut", "Kannur", "Kasaragod"];

  datas.map((location) => {
    const district = location.customer_address.toLowerCase();
    if (district.includes("malappuram")) {
      Malappuram.push(location);
    }
    if (district.includes("kozhikode") || district.includes("calicut")) {
      Calicut.push(location);
    }
    if (district.includes("kannur")) {
      Kannur.push(location);
    }
    if (district.includes("kas")) {
      Kasargod.push(location);
    }
  });

  const percentage = [
    ((Malappuram.length / orderCount) * 100).toFixed(2),
    ((Calicut.length / orderCount) * 100).toFixed(2),
    ((Kannur.length / orderCount) * 100).toFixed(2),
    ((Kasargod.length / orderCount) * 100).toFixed(2),
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Orders",
        data: percentage,
        backgroundColor: [
          "rgba(255, 99, 132, 0.9)",
          "rgba(54, 162, 235, 0.9)",
          "rgba(255, 206, 86, 0.9)",
          "rgba(75, 192, 192, 0.9)",
        ],
        borderColor: "#fd7670",
        borderColor: "white",
        borderWidth: 1,
      },
    ],
  };

  const options = {};

  return (
    <>
      <Doughnut data={data} options={options} width={300} height={150} />
    </>
  );
};

export default CustomerLocation;
