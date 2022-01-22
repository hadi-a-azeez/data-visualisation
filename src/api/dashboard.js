import supabase from "../supabase";
import date from "date-and-time";

export const getAllOrderCount = async (payload) => {
  const {
    data,
    error,
    count: allorder,
  } = await supabase
    .from("orders")
    .select("id", { count: "exact" })
    .neq("order_status", "CANCELLED")
    .neq("order_status", "RETURNED")
    .neq("order_status", "REFUNDED")
    .gte("order_date", `${payload.startDate}`)
    .lte("order_date", `${payload.endDate}`);

  return allorder;
};

export const getOrderCountToday = async () => {
  const today = date.format(new Date(), "YYYY-M-DD");
  const {
    data,
    error,
    count: allordertoday,
  } = await supabase
    .from("orders")
    .select("order_date", { count: "exact" })
    .eq("order_date", today);

  return allordertoday;
};

export const getTotalReveneu = async (payload) => {
  // const { data: amounts, error } = await supabase
  //   .from("order_products")
  //   .select("product_price");
  // console.log(amounts, error);

  const { data: amounts, error } = await supabase
    .from("orders")
    .select(`order_products (product_price)`)
    .neq("order_status", "CANCELLED")
    .neq("order_status", "RETURNED")
    .neq("order_status", "REFUNDED")
    .gte("order_date", `${payload.startDate}`)
    .lte("order_date", `${payload.endDate}`);
  const { data: shippingCharges, error: errorshipping } = await supabase
    .from("orders")
    .select("shipping_charge")
    .neq("order_status", "CANCELLED")
    .neq("order_status", "RETURNED")
    .neq("order_status", "REFUNDED")
    .gte("order_date", `${payload.startDate}`)
    .lte("order_date", `${payload.endDate}`);
  const sumOfShippingCharge = shippingCharges.reduce(
    (acc, obj) => acc + obj.shipping_charge,
    0
  );
  const sumOforders = amounts.reduce((acc, obj) => {
    return (
      acc + obj.order_products.reduce((acc, obj) => acc + obj.product_price, 0)
    );
  }, 0);
  const sum = sumOfShippingCharge + sumOforders;
  return sum;
};

export const getTodayReveneu = async () => {
  const today = date.format(new Date(), "YYYY-M-DD");
  const { data, error } = await supabase
    .from("orders")
    .select(`shipping_charge,order_products (product_price)`)
    .eq("order_date", today);
  const sum = data.reduce(
    (acc, obj) =>
      acc + obj.order_products.reduce((acc, obj) => acc + obj.product_price, 0),
    data.reduce((acc, obj) => acc + obj.shipping_charge, 0)
  );

  return sum;
};

export const getData = async () => {
  let { data, error } = await supabase.rpc("ordercount");

  if (error) console.error(error);
  else return data;
};

export const getRevenueTotal = async () => {
  let { data, error } = await supabase.rpc("revenuetotal");

  if (error) console.error(error);
  else return data;
};

export const getCustomerAdrress = async () => {
  let { data, error } = await supabase
    .from("orders")
    .select("customer_address");
  return data;
};
