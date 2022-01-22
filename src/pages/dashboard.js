import React, { useState, useEffect, useMemo } from "react";
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
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";

const Dashboard = () => {
  const [orderCount, setOrderCount] = useState();
  const [orderCountToday, setOrderCountToday] = useState();
  const [totalReveneu, setTotalReveneu] = useState();
  const [todayReveneu, setTodayReveneu] = useState();
  const [orderCountData, setOrderCountData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const INIT_DATE_RANGE = [
    dayjs().subtract(7, "days").startOf("day"),
    dayjs().endOf("day"),
  ];

  const [ChartDateRange, setChartDateRange] = useState([...INIT_DATE_RANGE]);

  const days = useMemo(() => {
    return dayjs(ChartDateRange[1]).diff(ChartDateRange[0], "day") + 1;
  }, [ChartDateRange]);

  const { RangePicker } = DatePicker;

  useEffect(() => {
    const getAllData = async () => {
      let payload = {
        startDate: dayjs(ChartDateRange[0]).format("YYYY-MM-DD"),
        endDate: dayjs(ChartDateRange[1]).format("YYYY-MM-DD"),
      };
      const orderCount = await getAllOrderCount(payload);
      const todayOrder = await getOrderCountToday();
      const ReveneuTotal = await getTotalReveneu(payload);
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
  }, [ChartDateRange]);

  const onChangeDate = (values) => {
    if (values && values.length > 0) {
      const [startDate, endDate] = values;
      setChartDateRange([dayjs(startDate), dayjs(endDate)]);
    } else {
      setChartDateRange([...INIT_DATE_RANGE]);
    }
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
        {/* <Search /> */}
        <RangePicker
          style={{ width: "300px", marginTop: "3rem" }}
          format="DD MMM YYYY"
          onChange={(e) => onChangeDate(e)}
        />
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
          <div className={style.report_wrapper}>
            <h1 className={style.report_heading}>Average order</h1>
            <h1 className={style.report_stat}>
              {/* remove decimal part */}
              {orderCount > 0 ? Math.trunc(orderCount / 21) : "-"}
            </h1>
            <h1 className={style.report_percentage}>+33%</h1>
          </div>
        </div>
        <div className={style.wrapper}>
          <div className={style.report_wrapper}>
            <h1 className={style.report_heading}>Average revenue</h1>
            <h1 className={style.report_stat}>
              {/* remove decimal part */}
              {orderCount > 0 ? Math.trunc(totalReveneu / days) : "-"}
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
