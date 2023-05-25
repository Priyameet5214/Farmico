import React, { useState } from "react";
import { Input, Button } from "components";

const TrackPagePage = ({ myContract }) => {
  const [productId, setProductId] = useState("");
  const [productInfo, setProductInfo] = useState(null);

  const handleSearch = async () => {
    try {
      const product = await myContract.methods.getProduct(productId).call();
      setProductInfo(product);
    } catch (error) {
      console.error(error);
      // handle error
    }
  };

  const handleSave = async () => {
    try {
      const product = await myContract.methods.getProduct(productId).call();
      setProductInfo(product);
      // display product info in a newly created container
      const productDetails = (
        <div
          className="bg-fillLightgreen100 rounded-xl p-4 mt-4"
          style={{ width: "fit-content" }}
        >
          <p className="text-lg">Name: {product.name}</p>
          <p className="text-lg">Origin: {product.origin}</p>
          <p className="text-lg">Date of Harvest: {product.dateOfHarvest}</p>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {product.dates.map((date, index) => (
                <tr key={index}>
                  <td>{date}</td>
                  <td>{product.locationUpdates[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      const container = document.createElement("div");
      container.appendChild(productDetails);
      document.body.appendChild(container);
    } catch (error) {
      console.error(error);
      // handle error
    }
  };

  return (
    <div className="bg-gray-900 flex flex-col font-inriaserif gap-4 items-center justify-start mx-auto p-14 md:px-10 sm:px-5 w-full">
      <Input
        wrapClassName="w-4/5"
        className="text-3xl font-normal leading-normal md:text-4xl not-italic p-0 placeholder-black_900 sm:text-3xl text-black_900 text-center w-full"
        name="frameTen"
        placeholder="Enter Product Id"
        shape="RoundedBorder20"
        size="sm"
        variant="FillLightgreen100"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <Button
        className="cursor-pointer text-3xl font-normal leading-normal mb-16 min-w-64 not-italic text-black_900 text-center w-auto"
        shape="RoundedBorder24"
        size="sm"
        variant="FillLightgreen100"
        onClick={handleSearch}
      >
        Search
      </Button>
      {productInfo && (
        <Button
          className="cursor-pointer text-3xl font-normal leading-normal mb-16 min-w-64 not-italic text-black_900 text-center w-auto"
          shape="RoundedBorder24"
          size="sm"
          variant="FillLightgreen100"
          onClick={handleSave}
        >
          Save
        </Button>
      )}
    </div>
  );
};

export default TrackPagePage;
