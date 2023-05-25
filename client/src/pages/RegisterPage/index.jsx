// import React from "react";

// import WelcomePageColumni3removebgprevi from "components/WelcomePageColumni3removebgprevi";
// import { Text, Img } from "components";
// import { useNavigate } from "react-router-dom";

// const RegisterPagePage = () => {
//   const navigate = useNavigate();

//   return (
//     <>
//       <div className="bg-gray_900 flex flex-col font-inriaserif items-start justify-start mx-auto p-[18px] w-full">
//         <div className="flex md:flex-col flex-row md:gap-10 gap-[82px] items-center justify-start mb-[352px] mt-[243px] md:px-5 w-[90%] md:w-full">
//           <WelcomePageColumni3removebgprevi className="flex flex-col items-center justify-start w-auto md:w-full" />
//           <div className="flex flex-col gap-[35px] items-center justify-start w-[45%] md:w-full">
//             <div className="bg-light_green_100 flex sm:flex-col flex-row gap-[30px] items-center justify-evenly p-[19px] rounded-[20px] w-[120%] md:w-full">
//               <Text
//                 className="not-italic text-black_900 text-center w-auto"
//                 as="h2"
//                 variant="h2"
//               >
//                 Account type
//               </Text>
//               <Text
//                 className="bg-white_A700 h-[42px] justify-center not-italic sm:px-5 px-[35px] py-0.5 rounded-[21px] text-black_900 text-center w-[322px]"
//                 as="h2"
//                 variant="h2"
//               >
//                 Select
//               </Text>
//             </div>
//             <div
//               className="common-pointer bg-deep_orange_800 cursor-pointer flex sm:flex-col flex-row gap-3.5 items-center justify-center p-2.5 rounded-[40px] w-[81%] md:w-full"
//               onClick={() => navigate("/")}
//             >
//               <Img
//                 src="images/img_metamaskfox1.png"
//                 className="cursor-pointer h-[60px] md:h-auto sm:ml-[0] ml-[18px] object-cover w-[15%] sm:w-full"
//                 alt="metamaskfoxOne"
//               />
//               <Text
//                 className="cursor-pointer mr-[21px] not-italic text-center text-white_A700 w-auto"
//                 as="h2"
//                 variant="h2"
//               >
//                 Register with Metamask
//               </Text>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RegisterPagePage;

import React, { useState } from "react";
import Web3 from "web3";
import WelcomePageColumni3removebgprevi from "components/WelcomePageColumni3removebgprevi";
import { Text, Img } from "components";
import { useNavigate } from "react-router-dom";
import { abi, contractAddress } from "../constants";

const RegisterPagePage = () => {
  let web3, myContractAddress, myContract;
  const [isConnected, setIsConnected] = React.useState(false);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

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

  const handleRegisterClick = async (accountType) => {
    if (!accountType) {
      window.alert("Please select account type");
      return;
    }
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

      if (accountType === "farmer") {
        await myContract.methods
          .registerAsFarmer()
          .send({ from: currentAccount });
      } else if (accountType === "transporter") {
        await myContract.methods
          .registerAsTransporter()
          .send({ from: currentAccount });
      } else if (accountType === "retailer") {
        await myContract.methods
          .registerAsRetailer()
          .send({ from: currentAccount });
      }
      navigate("/");
    } catch (error) {
      console.error(error);
      window.alert(error);
    }
  };

  return (
    <>
      <div className="bg-gray_900 flex flex-col font-inriaserif items-start justify-start mx-auto p-[18px] w-full">
        <div className="flex md:flex-col flex-row md:gap-10 gap-[82px] items-center justify-start mb-[352px] mt-[243px] md:px-5 w-[90%] md:w-full">
          <WelcomePageColumni3removebgprevi className="flex flex-col items-center justify-start w-auto md:w-full" />
          <div className="flex flex-col gap-[35px] items-center justify-start w-[45%] md:w-full">
            <div className="bg-light_green_100 flex sm:flex-col flex-row gap-[30px] items-center justify-evenly p-[19px] rounded-[20px] w-[120%] md:w-full">
              <Text
                className="not-italic text-black_900 text-center w-auto"
                as="h2"
                variant="h2"
              >
                Account type
              </Text>
              <select
                className="appearance-none bg-white_A700 border border-gray-300 hover:border-gray-400 rounded-md py-2 px-4 shadow-sm text-black_900 text-center w-[322px]"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="">Select</option>
                <option value="farmer">Farmer</option>
                <option value="transporter">Transporter</option>
                <option value="retailer">Retailer</option>
              </select>
            </div>
            <div
              className="common-pointer bg-deep_orange_800 cursor-pointer flex sm:flex-col flex-row gap-3.5 items-center justify-center p-2.5 rounded-[40px] w-[81%] md:w-full"
              onClick={handleRegisterClick(selectedOption)}
            >
              <Img
                src="images/img_metamaskfox1.png"
                className="cursor-pointer h-[60px] md:h-auto sm:ml-[0] ml-[18px] object-cover w-[15%] sm:w-full"
                alt="metamaskfoxOne"
              />
              <Text
                className="cursor-pointer mr-[21px] not-italic text-center text-white_A700 w-auto"
                as="h2"
                variant="h2"
              >
                Register with Metamask
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPagePage;
