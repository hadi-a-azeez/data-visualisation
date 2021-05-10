import { Pie } from "react-chartjs-2";

const ProductType = ({ datas, orderCount }) => {
  const productTypeLabels = ["Pant", "Full set", "Top"];
  const productTypeData = [];

  datas.map((item) => productTypeData.push((item.counts / orderCount) * 100));

  const data = {
    labels: productTypeLabels,
    datasets: [
      {
        label: "Orders",
        data: productTypeData,
        backgroundColor: [
          "#fd7670",
          "rgba(255, 99, 132, 0.9)",
          "rgba(54, 162, 235, 0.9)",
        ],
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

export default ProductType;
