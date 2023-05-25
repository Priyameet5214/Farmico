import React, { useState } from "react";
import { Button, Input } from "components";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import { abi, contractAddress } from "../constants";

const RetailerLoginPage = () => {
  const [productID, setProductID] = useState("");
  const [price, setPrice] = useState("");
  let web3, myContractAddress, myContract;
  const [isConnected, setIsConnected] = React.useState(false);
  const navigate = useNavigate();

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      provider = null;
      console.log("No provider found");
    }
    return provider;
  };

  const handleSave = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      let accounts = [];
      console.log(currentProvider);
      if (currentProvider) {
        await currentProvider.request({ method: "eth_requestAccounts" });
        web3 = new Web3(currentProvider);
        myContractAddress = contractAddress;
        myContract = new web3.eth.Contract(abi, myContractAddress);
        accounts = await web3.eth.getAccounts();
        setIsConnected(true);
      }
      await myContract.methods
        .claimProduct(productID, price)
        .send({ from: accounts[0] });
      navigate("/");
    } catch (error) {
      console.error(error);
      window.alert(error);
    }

    console.log("Product ID:", productID);
    console.log("Price:", price);
  };

  const handleProductIDChange = (value) => {
    setProductID(value);
  };

  const handlePriceChange = (value) => {
    setPrice(value);
  };

  return (
    <>
      <div className="bg-gray_900 flex flex-col font-inriaserif items-center justify-start mx-auto p-[59px] md:px-10 sm:px-5 w-full">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSave();
          }}
          className="flex flex-col md:gap-10 gap-[93px] items-center justify-start max-w-[1404px] mb-[475px] mx-auto w-full"
        >
          <div className="flex sm:flex-col flex-row md:gap-10 items-center justify-between w-full">
            <label htmlFor="productID">Product ID:</label>
            <Input
              className="font-normal leading-[normal] md:text-[28px] not-italic p-0 placeholder:text-black_900 sm:text-[26px] text-3xl text-black_900 text-center"
              id="productID"
              name="productID"
              type="number"
              wrapClassName="w-full"
              placeholder="Product ID"
              shape="RoundedBorder20"
              size="sm"
              variant="FillLightgreen100"
              onChange={handleProductIDChange}
              value={productID}
            />
            <label htmlFor="price">Price:</label>
            <Input
              wrapClassName="w-full"
              type="number"
              className="font-normal leading-[normal] md:text-[28px] not-italic p-0 placeholder:text-black_900 sm:text-[26px] text-3xl text-black_900 text-center"
              id="price"
              name="price"
              placeholder="Price"
              shape="RoundedBorder20"
              size="sm"
              variant="FillLightgreen100"
              onChange={handlePriceChange}
              value={price}
            />
          </div>
          <Button
            className="cursor-pointer font-normal leading-[normal] min-w-[638px] md:min-w-full not-italic sm:text-[40px] md:text-[46px] text-[50px] text-black_900 text-center w-auto"
            shape="RoundedBorder20"
            size="lg"
            variant="FillLightgreen100"
            type="submit"
          >
            Claim Product!
          </Button>
        </form>
      </div>
    </>
  );
};

export default RetailerLoginPage;

// import React from "react";

// import { Button } from "components";

// const RetailerLoginPage = () => {
//   return (
//     <>
//       <div className="bg-gray_900 flex flex-col font-inriaserif items-center justify-start mx-auto p-[59px] md:px-10 sm:px-5 w-full">
//         <div className="flex flex-col md:gap-10 gap-[93px] items-center justify-start max-w-[1404px] mb-[475px] mx-auto w-full">
//           <div className="flex sm:flex-col flex-row md:gap-10 items-center justify-between w-full">
//             <div className="bg-light_green_100 h-20 rounded-[20px] w-[47%]"></div>
//             <div className="bg-light_green_100 h-20 rounded-[20px] w-[47%]"></div>
//           </div>
//           <Button
//             className="cursor-pointer font-normal leading-[normal] min-w-[638px] md:min-w-full not-italic sm:text-[40px] md:text-[46px] text-[50px] text-black_900 text-center w-auto"
//             shape="RoundedBorder20"
//             size="lg"
//             variant="FillLightgreen100"
//           >
//             Claim Product!
//           </Button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RetailerLoginPage;
