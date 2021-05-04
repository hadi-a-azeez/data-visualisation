import { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import style from "./css/customers.module.scss";
import { getCustomerAdrress } from "../api/customer";
import CustomerLocation from "../components/charts/customerLocation";

const Customers = () => {
  const [customerAddressData, setCustomerAddressData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const customerAddress = await getCustomerAdrress();

      setCustomerAddressData(customerAddress);
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
        <div className={style.chart_wraper}>
          {customerAddressData.length > 0 && (
            <CustomerLocation datas={customerAddressData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Customers;
