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
  getRevenueTotal,
  getCustomerAdrress,
} from "../api/dashboard";
import OrdersCountChart from "../components/charts/ordersCount";
import RevenueTotalChart from "../components/charts/revenueTotal";

const Dashboard = () => {
  const [orderCount, setOrderCount] = useState();
  const [orderCountToday, setOrderCountToday] = useState();
  const [totalReveneu, setTotalReveneu] = useState();
  const [todayReveneu, setTodayReveneu] = useState();
  const [orderCountData, setOrderCountData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const getAllData = async () => {
      const orderCount = await getAllOrderCount();
      const todayOrder = await getOrderCountToday();
      const ReveneuTotal = await getTotalReveneu();
      const ReveneuToday = await getTodayReveneu();
      const totalOrderCount = await getData();
      const totalRevenue = await getRevenueTotal();

      setOrderCount(orderCount);
      setOrderCountToday(todayOrder);
      setTotalReveneu(ReveneuTotal);
      setTodayReveneu(ReveneuToday);
      setOrderCountData(totalOrderCount);
      setRevenueData(totalRevenue);
    };

    getAllData();
  }, []);

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
        <div className={style.wrapper}>
          <div className={style.chart_wraper}>
            {orderCountData.length > 0 && (
              <OrdersCountChart datas={orderCountData} />
            )}
          </div>
          <div className={style.chart_wraper}>
            {revenueData.length > 0 && (
              <RevenueTotalChart datas={revenueData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
