import supabase from "../supabase";
//import date from "date-and-time";

export const getCustomerAdrress = async () => {
  let { data, error } = await supabase
    .from("orders")
    .select("customer_address");
  return data;
};
