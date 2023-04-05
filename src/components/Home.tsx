import React, { useEffect, useState } from "react";
import WalletBalance from "./WalletBalance";
import AmirContract from "../artifacts/contracts/MyNFT.sol/AmirContract.json";
import { ethers } from "ethers";
import NFTImage from "./NFTImage";

const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const provider = new ethers.providers.Web3Provider((window as any).ethereum);

// get the end user
export const signer = provider.getSigner();

// get the smart contract
export const contract = new ethers.Contract(
  contractAddress,
  AmirContract.abi,
  signer
);

const Home = () => {
  const [totalMinted, setTotalMinted] = useState(0);

  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const count = await contract.count();
    setTotalMinted(parseInt(count));
  };



  return (
    <div>
      <WalletBalance />
      {Array(totalMinted + 1)
        .fill(0)
        .map((_, i) => (
          <div key={i}>
            <NFTImage tokenId={i}  />
          </div>
        ))}
    </div>
  );
};

export default Home;
