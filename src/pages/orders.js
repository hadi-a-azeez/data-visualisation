import { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import style from "./css/orders.module.scss";

import Search from "../components/search";

const Orders = () => {
  useEffect(() => {
    const getData = async () => {};
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
        {/*   <div className={style.wrapper}>
          <div className={style.chart_wraper}>
            {customerAddressData.length > 0 && allOrderCount > 0 && (
              <CustomerLocation
                datas={customerAddressData}
                orderCount={allOrderCount}
              />
            )}
          </div>
          <div className={style.chart_wraper}>
            {customerType.length > 0 && <CustomerType datas={customerType} />}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Orders;
