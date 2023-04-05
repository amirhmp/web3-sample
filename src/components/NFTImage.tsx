import { Contract, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import amirContract from "../service/contract";

interface IProps {
  tokenId: number;
  onImageMinted?: () => void;
}

const NFTImage: React.FC<IProps> = ({ tokenId, onImageMinted }) => {
  const contentId = "some_digital_asset_on_IPFS"; // comes from pinata
  const metadataURI = `${contentId}/${tokenId}.json`;
  const imageURI = `img/${tokenId}.jpg`;
  //   const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;

  const [isMinted, setMinted] = useState(false);

  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    const isOwned = await amirContract.isContentOwned(metadataURI);
    setMinted(isOwned);
  };

  const mintToken = async () => {
    await amirContract.mintToken(metadataURI);
    await getMintedStatus();
    if (onImageMinted) await onImageMinted();
  };

  async function getURI() {
    console.log({ tokenId });
    const uri = await amirContract.getURI(tokenId - 1);
    toast.info(uri);
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
