import supabase from "../supabase";

export const getOrderPayment = async () => {
  const { data, error } = await supabase.rpc("orderpayment");
  if (error) return error;
  if (data) return data;
};
