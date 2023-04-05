import { Contract, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { contract, signer } from "./Home";

interface IProps {
  tokenId: number;
}

const NFTImage: React.FC<IProps> = ({ tokenId }) => {
  const contentId = ""; // comes from pinata
  const metadataURI = `${contentId}/${tokenId}.json`;
  //   const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;
  const imageURI = `img/${tokenId}.png`;

  const [isMinted, setMinted] = useState(false);

  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI);
    console.log(result);
    setMinted(result);
  };

  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.payToMint(addr, metadataURI, {
      value: ethers.utils.parseEther("0.05"),
    });

    await result.wait();
    await getMintedStatus();
  };

  async function getURI() {
    const uri = await contract.tokenURI(tokenId);
    return uri;
  }

  return (
    <div
      style={{
        borderRadius: 8, 
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      }}
    >
      <img
        style={{ border: "1px solid black" }}
        width={100}
        height={100}
        src={isMinted ? imageURI : "img/placeholder.png"}
        alt=""
      />
      <div>
        <h5>ID #{tokenId}</h5>
        {!isMinted ? (
          <button onClick={mintToken}>Mint</button>
        ) : (
          <button onClick={getURI}>Taken! Show URI</button>
        )}
      </div>
    </div>
  );
};

export default NFTImage;
