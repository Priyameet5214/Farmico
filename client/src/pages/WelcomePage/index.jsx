import React from "react";
import Web3 from "web3";
import { Img, Text, Button } from "components";
import WelcomePageColumni3removebgprevi from "components/WelcomePageColumni3removebgprevi";
import { useNavigate } from "react-router-dom";
import { abi, contractAddress } from "../constants";

const WelcomePagePage = () => {
  let web3, myContractAddress, myContract;

  const navigate = useNavigate();

  const [isConnected, setIsConnected] = React.useState(false);

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

  const handleLogin = async () => {
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

      // Check if the current account is registered
      const isFarmer = await myContract.methods.isFarmer(currentAccount).call();
      const isTransporter = await myContract.methods
        .isTransporter(currentAccount)
        .call();
      const isRetailer = await myContract.methods
        .isRetailer(currentAccount)
        .call();

      if (isFarmer) {
        navigate("/farmerlogin");
      } else if (isTransporter) {
        navigate("/transporterlogin");
      } else if (isRetailer) {
        navigate("/retailerlogin");
      } else {
        window.alert("Your account is not registered");
      }
    } catch (error) {
      console.error(error);
      window.alert(error);
    }
  };

  const onDisconnect = async () => {
    setIsConnected(false);
  };

  return (
    <>
      <div className="bg-orange_50 font-inriaserif h-[864px] mx-auto pb-[5px] relative w-full">
        <Img
          src="images/img_vector2.svg"
          className="absolute h-[199px] right-[0] top-[19%] w-auto"
          alt="vectorTwo"
        />
        <Img
          src="images/img_vector3.svg"
          className="h-[77px] ml-auto w-auto"
          alt="vectorThree"
        />
        <div className="absolute h-[859px] inset-[0] justify-center m-auto md:px-5 w-full">
          <Img
            src="images/img_618419569561.png"
            className="h-[859px] m-auto object-cover w-full"
            alt="618419569561"
          />
          <div className="absolute flex sm:flex-col flex-row gap-10 h-[46px] md:h-auto items-center justify-start left-[3%] px-5 self-stretch top-[0] w-auto">
            <div className="cursor-pointer flex flex-col items-center justify-center p-2.5 self-stretch w-auto">
              <button
                className="cursor-pointer flex flex-col items-center justify-center p-2.5 self-stretch w-auto"
                onClick={handleLogin}
              >
                <Text
                  className="cursor-pointer not-italic text-black_900 text-center w-auto"
                  as="h3"
                  variant="h3"
                >
                  Login
                </Text>
              </button>
            </div>
            <div
              className="common-pointer cursor-pointer flex flex-col items-center justify-center p-2.5 self-stretch w-auto"
              onClick={() => navigate("/trackpage")}
            >
              <Text
                className="cursor-pointer not-italic text-black_900 text-center w-auto"
                as="h3"
                variant="h3"
              >
                Track
              </Text>
            </div>
            <div className="cursor-pointer flex flex-col items-center justify-center p-2.5 self-stretch w-auto">
              <Text
                className="cursor-pointer not-italic text-black_900 text-center w-auto"
                as="h3"
                variant="h3"
              >
                About us
              </Text>
            </div>
          </div>
          <div className="absolute flex flex-col justify-start left-[1%] top-[7%] w-[45%]">
            <WelcomePageColumni3removebgprevi className="flex flex-col items-center justify-start mr-[19px] w-auto md:w-full" />
            <Text
              className="font-inter md:ml-[0] ml-[41px] mt-[13px] not-italic text-black_900 text-left w-[95%] sm:w-full"
              as="h4"
              variant="h4"
            >
              Farmico is a revolutionary traceability system for the
              agricultural industry. Our blockchain-based platform enables
              farmers to create unique digital identities for each batch of
              products, allowing for complete transparency and accountability
              throughout the entire supply chain.Join us today to revolutionize
              the future of agriculture with Farmico!
            </Text>
            <Button
              className="common-pointer cursor-pointer flex font-inriaserif font-normal h-[59px] items-center justify-center leading-[normal] md:ml-[0] ml-[265px] mr-[285px] mt-[68px] not-italic text-3xl sm:text-[26px] md:text-[28px] text-black_900 text-center w-[138px]"
              onClick={() => navigate("/registerpage")}
              shape="RoundedBorder10"
              size="md"
              variant="FillGreen500"
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePagePage;

// import React from "react";

// import { Img, Text, Button } from "components";
// import WelcomePageColumni3removebgprevi from "components/WelcomePageColumni3removebgprevi";
// import { useNavigate } from "react-router-dom";

// const WelcomePagePage = () => {
//   const navigate = useNavigate();

//   return (
//     <>
//       <div className="bg-orange_50 font-inriaserif h-[864px] mx-auto pb-[5px] relative w-full">
//         <Img
//           src="images/img_vector2.svg"
//           className="absolute h-[199px] right-[0] top-[19%] w-auto"
//           alt="vectorTwo"
//         />
//         <Img
//           src="images/img_vector3.svg"
//           className="h-[77px] ml-auto w-auto"
//           alt="vectorThree"
//         />
//         <div className="absolute h-[859px] inset-[0] justify-center m-auto md:px-5 w-full">
//           <Img
//             src="images/img_618419569561.png"
//             className="h-[859px] m-auto object-cover w-full"
//             alt="618419569561"
//           />
//           <div className="absolute flex sm:flex-col flex-row gap-10 h-[46px] md:h-auto items-center justify-start left-[3%] px-5 self-stretch top-[0] w-auto">
//             <div className="cursor-pointer flex flex-col items-center justify-center p-2.5 self-stretch w-auto">
//               <Text
//                 className="cursor-pointer not-italic text-black_900 text-center w-auto"
//                 as="h3"
//                 variant="h3"
//               >
//                 Login
//               </Text>
//             </div>
//             <div
//               className="common-pointer cursor-pointer flex flex-col items-center justify-center p-2.5 self-stretch w-auto"
//               onClick={() => navigate("/trackpage")}
//             >
//               <Text
//                 className="cursor-pointer not-italic text-black_900 text-center w-auto"
//                 as="h3"
//                 variant="h3"
//               >
//                 Track
//               </Text>
//             </div>
//             <div className="cursor-pointer flex flex-col items-center justify-center p-2.5 self-stretch w-auto">
//               <Text
//                 className="cursor-pointer not-italic text-black_900 text-center w-auto"
//                 as="h3"
//                 variant="h3"
//               >
//                 About us
//               </Text>
//             </div>
//           </div>
//           <div className="absolute flex flex-col justify-start left-[1%] top-[7%] w-[45%]">
//             <WelcomePageColumni3removebgprevi className="flex flex-col items-center justify-start mr-[19px] w-auto md:w-full" />
//             <Text
//               className="font-inter md:ml-[0] ml-[41px] mt-[13px] not-italic text-black_900 text-left w-[95%] sm:w-full"
//               as="h4"
//               variant="h4"
//             >
//               Farmico is a revolutionary traceability system for the
//               agricultural industry. Our blockchain-based platform enables
//               farmers to create unique digital identities for each batch of
//               products, allowing for complete transparency and accountability
//               throughout the entire supply chain.Join us today to revolutionize
//               the future of agriculture with Farmico!
//             </Text>
//             <Button
//               className="common-pointer cursor-pointer flex font-inriaserif font-normal h-[59px] items-center justify-center leading-[normal] md:ml-[0] ml-[265px] mr-[285px] mt-[68px] not-italic text-3xl sm:text-[26px] md:text-[28px] text-black_900 text-center w-[138px]"
//               onClick={() => navigate("/registerpage")}
//               shape="RoundedBorder10"
//               size="md"
//               variant="FillGreen500"
//             >
//               Register
//             </Button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default WelcomePagePage;
