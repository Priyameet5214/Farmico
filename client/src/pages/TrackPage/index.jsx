import React, { useState } from "react";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import { abi, contractAddress } from "../constants";
import { Input, Button, Text } from "components";

const TrackPage = () => {
  let web3, myContractAddress, myContract, box;
  const [isConnected, setIsConnected] = React.useState(false);
  const navigate = useNavigate();
  // Initialize state for the input value and product details
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productOrigin, setProductOrigin] = useState("");
  const [productDate, setProductDate] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [locationUpdates, setLocationUpdates] = useState([]);
  const [dates, setDates] = useState([]);

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

  const handleProductIDChange = (value) => {
    setProductId(value);
  };

  const handleSearch = async () => {
    try {
      // Initialize your web3 provider here
      const currentProvider = detectCurrentProvider();
      console.log(currentProvider);
      if (currentProvider) {
        await currentProvider.request({ method: "eth_requestAccounts" });
        web3 = new Web3(currentProvider);
        myContractAddress = contractAddress;
        myContract = new web3.eth.Contract(abi, myContractAddress);
        setIsConnected(true);
      }

      // Call the getProduct function with the input productId
      const productDetails = async () => {
        let result = await myContract.methods.getProduct(productId).call();
        return {
          name: result[0],
          origin: result[1],
          dateOfHarvest: result[2],
          farmer: result[3],
          transporters: result[4],
          locationUpdates: result[5],
          dates: result[6],
          retailer: result[7],
          price: result[8],
        };
      };
      // Update the state with the returned product details
      setProductName(productDetails[0]);
      setProductOrigin(productDetails[1]);
      setProductDate(productDetails[2]);
      setProductPrice(productDetails[8]);
      setLocationUpdates(productDetails[5]);
      setDates(productDetails[6]);
      box = true;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-gray_900 min-h-screen flex flex-col font-inriaserif items-center justify-start mx-auto p-[52px] md:px-10 sm:px-5">
        <form
          className="flex flex-col items-center justify-end w-full"
          onSubmit={handleSearch}
        >
          <Input
            wrapClassName="mt-1 w-[81%]"
            className="font-normal leading-[normal] md:text-[28px] not-italic p-0 placeholder:text-black_900 sm:text-[26px] text-3xl text-black_900 text-center w-full"
            name="productID"
            placeholder="Enter Product Id"
            shape="RoundedBorder20"
            size="sm"
            variant="FillLightgreen100"
            value={productId}
            onChange={handleProductIDChange}
          ></Input>
          <Button
            type="submit"
            className="cursor-pointer font-normal leading-[normal] min-w-[257px] mt-[46px] not-italic text-3xl sm:text-[26px] md:text-[28px] text-black_900 text-center w-auto"
            shape="RoundedBorder24"
            size="sm"
            style={{ cursor: "pointer" }}
            variant="FillLightgreen100"
          >
            Search
          </Button>
          {isConnected && (
            <div className="bg-light_green_100 flex flex-col items-start justify-center max-w-[1367px] mt-[30px] mx-auto md:px-5 px-[55px] py-[59px] rounded-[20px] w-full">
              <div className="flex flex-col items-start justify-start pr-[3px] py-[3px] w-auto md:w-full">
                <Text
                  className="not-italic text-black_900 text-left w-auto"
                  as="h2"
                  variant="h2"
                >
                  Name: {productName}
                </Text>
                <Text
                  className="mt-[59px] not-italic text-black_900 text-left w-auto"
                  as="h2"
                  variant="h2"
                >
                  Location of origin: {productOrigin}
                </Text>
                <Text
                  className="md:ml-[0] ml-[5px] mt-[52px] not-italic text-black_900 text-left w-auto"
                  as="h2"
                  variant="h2"
                >
                  Date of Harvest: {productDate}
                </Text>
                <Text
                  className="mb-[68px] mt-[57px] not-italic text-black_900 text-left w-auto"
                  as="h2"
                  variant="h2"
                >
                  Price: {productPrice}
                </Text>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default TrackPage;
