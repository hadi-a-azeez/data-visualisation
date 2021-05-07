import { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import style from "./css/orders.module.scss";
import { getOrderPayment } from "../api/orders";
import OrderPayment from "../components/charts/orderPayment";

import Search from "../components/search";

const Orders = () => {
  const [orderPayment, setOrderPayment] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const orderpayment = await getOrderPayment();

      setOrderPayment(orderpayment);
      console.log(orderpayment);
    };
    getData();
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
          <div className={style.chart_wraper}>
            {orderPayment.length > 0 && <OrderPayment datas={orderPayment} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
