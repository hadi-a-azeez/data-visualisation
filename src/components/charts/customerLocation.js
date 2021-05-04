const CustomerLocation = ({ datas }) => {
  const Malappuram = [];
  console.log(datas);
  datas.map((location) => {
    //console.log(location.customer_address);
    if (location.customer_address.toLowerCase().includes("malappuram")) {
      Malappuram.push(location);
    }
  });
  console.log(Malappuram.length);

  return <h1>{Malappuram.length}</h1>;
};

export default CustomerLocation;
