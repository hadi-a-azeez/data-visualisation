import supabase from "../supabase";
//import date from "date-and-time";

export const getCustomerAdrress = async () => {
  let { data, error } = await supabase
    .from("orders")
    .select("customer_address");
  return data;
};

export const getResellerCount = async () => {
  let { data, error } = await supabase.rpc("resellercount");

  if (error) return error;
  else return data;
};

export const allData = async () => {
  let { data, error } = await supabase
    .from("orders")
    .select(`*,order_products(*)`);
  console.log(data);
  console.log(error);
  return data;
};
