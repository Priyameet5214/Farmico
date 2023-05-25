import React, { useRef, useState } from "react";
import Web3 from "web3";
import { Text } from "components";
import { useNavigate } from "react-router-dom";
import { abi, contractAddress } from "../constants";

const FarmerLoginPage = () => {
  let web3, myContractAddress, myContract;
  const [isConnected, setIsConnected] = React.useState(false);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

  const nameRef = useRef(null);
  const dateRef = useRef(null);
  const locRef = useRef(null);

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
    const name = nameRef.current.value;
    const date = dateRef.current.value;
    const loc = locRef.current.value;
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

      const currentAccount = accounts[0];

      let receipt = await myContract.methods
        .createProduct(name, loc, date)
        .send({ from: currentAccount });
      let productId = receipt.events.ProductCreated.returnValues.productId;
      window.alert("Product created with id: " + productId);
    } catch (error) {
      console.error(error);
      window.alert(error);
    }
    console.log(name, date, loc);
  };

  return (
    <>
      <div className="bg-gray_900 flex flex-col font-inriaserif items-center justify-start mx-auto p-[98px] md:px-10 sm:px-5 w-full">
        <div className="bg-light_green_100 flex flex-col gap-[34px] h-[667px] md:h-auto items-center justify-center max-w-[688px] md:px-5 px-[70px] py-5 rounded-[20px] w-full">
          <Text
            className="not-italic text-black_900 text-center w-auto"
            as="h1"
            variant="h1"
          >
            Create your product!
          </Text>
          <div className="flex flex-col gap-[34px] items-center justify-start self-stretch w-auto">
            <div className="flex flex-col h-[42px] md:h-auto items-center justify-center p-2.5 w-[115px]">
              <Text
                className="not-italic text-black_900 text-center w-auto"
                as="h2"
                variant="h2"
              >
                Name
              </Text>
            </div>
            <div className="flex flex-col gap-[34px] items-center justify-start w-full">
              <input
                type="text"
                ref={nameRef}
                className="bg-white_A700 h-9 p-2.5 rounded-[5px] w-full"
              />
              <div className="flex flex-col items-center justify-center p-2.5 self-stretch w-auto">
                <Text
                  className="not-italic text-black_900 text-center w-auto"
                  as="h2"
                  variant="h2"
                >
                  Date of Harvest
                </Text>
              </div>
              <input
                type="text"
                ref={dateRef}
                className="bg-white_A700 h-[39px] p-2.5 rounded-[5px] w-full"
              />
              <div className="flex flex-col h-[50px] md:h-auto items-center justify-center p-2.5 w-[290px]">
                <Text
                  className="not-italic text-black_900 text-center w-auto"
                  as="h2"
                  variant="h2"
                >
                  Location Of Harvest
                </Text>
              </div>
              <input
                type="text"
                ref={locRef}
                className="bg-white_A700 h-9 p-2.5 rounded-[5px] w-full"
              />
              <Text
                className="bg-green_500 h-[59px] justify-center not-italic px-5 rounded-[10px] text-black_900 text-center w-[138px]"
                as="h1"
                variant="h1"
                onClick={handleSave}
              >
                Save
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FarmerLoginPage;

/* import React from "react";

import { Text } from "components";

const FarmerLoginPage = () => {
  return (
    <>
      <div className="bg-gray_900 flex flex-col font-inriaserif items-center justify-start mx-auto p-[98px] md:px-10 sm:px-5 w-full">
        <div className="bg-light_green_100 flex flex-col gap-[34px] h-[667px] md:h-auto items-center justify-center max-w-[688px] md:px-5 px-[70px] py-5 rounded-[20px] w-full">
          <Text
            className="not-italic text-black_900 text-center w-auto"
            as="h1"
            variant="h1"
          >
            Create your product!
          </Text>
          <div className="flex flex-col gap-[34px] items-center justify-start self-stretch w-auto">
            <div className="flex flex-col h-[42px] md:h-auto items-center justify-center p-2.5 w-[115px]">
              <Text
                className="not-italic text-black_900 text-center w-auto"
                as="h2"
                variant="h2"
              >
                Name
              </Text>
            </div>
            <div className="flex flex-col gap-[34px] items-center justify-start w-full">
              <div className="bg-white_A700 h-9 p-2.5 rounded-[5px] w-full"></div>
              <div className="flex flex-col items-center justify-center p-2.5 self-stretch w-auto">
                <Text
                  className="not-italic text-black_900 text-center w-auto"
                  as="h2"
                  variant="h2"
                >
                  Date of Harvest
                </Text>
              </div>
              <div className="bg-white_A700 h-[39px] p-2.5 rounded-[5px] w-full"></div>
              <div className="flex flex-col h-[50px] md:h-auto items-center justify-center p-2.5 w-[290px]">
                <Text
                  className="not-italic text-black_900 text-center w-auto"
                  as="h2"
                  variant="h2"
                >
                  Location Of Harvest
                </Text>
              </div>
              <div className="bg-white_A700 h-9 p-2.5 rounded-[5px] w-full"></div>
              <Text
                className="bg-green_500 h-[59px] justify-center not-italic px-5 rounded-[10px] text-black_900 text-center w-[138px]"
                as="h1"
                variant="h1"
              >
                Save
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FarmerLoginPage;
 */
