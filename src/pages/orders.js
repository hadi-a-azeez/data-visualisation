import { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import style from "./css/orders.module.scss";
import { getOrderPayment, getProductType } from "../api/orders";
import OrderPayment from "../components/charts/orderPayment";
import ProductType from "../components/charts/productType";

import Search from "../components/search";

const Orders = () => {
  const [orderPayment, setOrderPayment] = useState([]);
  const [productType, setProductType] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const orderpayment = await getOrderPayment();
      const producttype = await getProductType();

      setOrderPayment(orderpayment);
      setProductType(producttype);
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
          <div className={style.chart_wraper}>
            {productType.length > 0 && <ProductType datas={productType} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
