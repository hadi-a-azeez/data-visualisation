import React, { useState, useEffect } from "react";
import SideBar from "../components/sideBar";
import style from "./css/dashboard.module.scss";
import {
  getOrderCountToday,
  getTodayReveneu,
  getTotalReveneu,
  getAllOrderCount,
  getData,
  getRevenueTotal,
} from "../api/dashboard";
import OrdersCountChart from "../components/charts/ordersCount";
import RevenueTotalChart from "../components/charts/revenueTotal";
import Search from "../components/search";

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
        <Search />
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
