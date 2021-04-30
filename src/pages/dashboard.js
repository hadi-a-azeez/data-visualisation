import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import React, { useState, useEffect } from "react";
import SideBar from "../components/sideBar";
import style from "./css/dashboard.module.scss";
import { SearchIcon } from "@chakra-ui/icons";
import {
  getOrderCountToday,
  getTodayReveneu,
  getTotalReveneu,
  getAllOrderCount,
  getData,
} from "../api/dashboard";
import { Bar } from "react-chartjs-2";

const Dashboard = () => {
  const [orderCount, setOrderCount] = useState();
  const [orderCountToday, setOrderCountToday] = useState();
  const [totalReveneu, setTotalReveneu] = useState();
  const [todayReveneu, setTodayReveneu] = useState();

  useEffect(() => {
    const getAllData = async () => {
      const orderCount = await getAllOrderCount();
      const todayOrder = await getOrderCountToday();
      const ReveneuTotal = await getTotalReveneu();
      const ReveneuToday = await getTodayReveneu();
      const data = await getData();

      setOrderCount(orderCount);
      setOrderCountToday(todayOrder);
      setTotalReveneu(ReveneuTotal);
      setTodayReveneu(ReveneuToday);
      console.log(data);
    };

    getAllData();
  }, []);

  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
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
    <div className={style.container}>
      <div style={{ width: "20%" }}>
        <SideBar />
      </div>
      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <InputGroup size="lg" p="2" mt="8" w="35%">
          <InputLeftElement width="4.5rem">
            <SearchIcon mt="5" color="gray.400" />
          </InputLeftElement>
          <Input
            pr="4.5rem"
            placeholder="Search"
            borderRadius="full"
            borderColor="gray.100"
            bg="gray.100"
          />
        </InputGroup>
        <div className={style.wrapper}>
          <div className={style.report_wrapper}>
            <h1 className={style.report_heading}>Total orders</h1>
            <h1 className={style.report_stat}>
              {orderCount > 0 ? orderCount : "-"}
            </h1>
            <h1 className={style.report_percentage}>+33%</h1>
          </div>
          <div className={style.report_wrapper}>
            <h1 className={style.report_heading}>Order Today</h1>
            <h1 className={style.report_stat}>
              {orderCountToday > 0 ? orderCountToday : "-"}
            </h1>
            <h1 className={style.report_percentage}>+33%</h1>
          </div>
          <div className={style.report_wrapper}>
            <h1 className={style.report_heading}>Total revenue</h1>
            <h1 className={style.report_stat}>
              {totalReveneu > 0 ? `₹${totalReveneu}` : "-"}
            </h1>
            <h1 className={style.report_percentage}>+33%</h1>
          </div>
          <div className={style.report_wrapper}>
            <h1 className={style.report_heading}>Revenue Today</h1>
            <h1 className={style.report_stat}>
              {todayReveneu > 0 ? `₹${todayReveneu}` : "-"}
            </h1>
            <h1 className={style.report_percentage}>+33%</h1>
          </div>
        </div>
        <div style={{ width: "40%", height: "auto", marginTop: "2rem" }}>
          <Bar data={data} options={options} width={300} height={150} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
