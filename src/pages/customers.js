import { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import style from "./css/customers.module.scss";
import { getCustomerAdrress, getResellerCount, allData } from "../api/customer";
import { getAllOrderCount } from "../api/dashboard";
import CustomerLocation from "../components/charts/customerLocation";
import CustomerType from "../components/charts/customerType";
import Search from "../components/search";
import { ExportCSV } from "../components/sheet";
import dayjs from "dayjs";

const Customers = () => {
  const [customerAddressData, setCustomerAddressData] = useState([]);
  const [allOrderCount, setAllOrderCount] = useState([]);
  const [customerType, setCustomerType] = useState([]);
  const [fullData, setFullData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const customerAddress = await getCustomerAdrress();
      const orderCount = await getAllOrderCount({
        startDate: "2020-01-01",
        endDate: dayjs().format("YYYY-MM-DD"),
      });
      const resellerCount = await getResellerCount();
      const allDataresponse = await allData();

      setCustomerAddressData(customerAddress);
      setAllOrderCount(orderCount);
      setCustomerType(resellerCount);
      setFullData(allDataresponse);
    };
    getData();
  }, []);

  const fileName = "alldata";

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
        </div>
        <ExportCSV csvData={fullData} fileName={fileName} />
      </div>
    </div>
  );
};

export default Customers;
