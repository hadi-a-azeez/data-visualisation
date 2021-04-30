import supabase from "../supabase";
import date from "date-and-time";

export const getAllOrderCount = async () => {
  const { data, error, count: allorder } = await supabase
    .from("orders")
    .select("id", { count: "exact" });
  console.log(allorder);

  return allorder;
};

export const getOrderCountToday = async () => {
  const today = date.format(new Date(), "YYYY-M-DD");
  const { data, error, count: allordertoday } = await supabase
    .from("orders")
    .select("order_date", { count: "exact" })
    .eq("order_date", today);
  console.log(allordertoday);

  return allordertoday;
};

export const getTotalReveneu = async () => {
  const { data: amounts, error } = await supabase
    .from("order_products")
    .select("product_price");

  const { data: shippingCharges, error: errorshipping } = await supabase
    .from("orders")
    .select("shipping_charge");
  const sumOfShippingCharge = shippingCharges.reduce(
    (acc, obj) => acc + obj.shipping_charge,
    0
  );
  const sumOforders = amounts.reduce((acc, obj) => {
    return acc + obj.product_price;
  }, 0);
  const sum = sumOfShippingCharge + sumOforders;
  console.log(sum);
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

/* SELECT order_date,COUNT(*) as order_date
FROM orders
GROUP BY order_date
ORDER BY order_date DESC; */
