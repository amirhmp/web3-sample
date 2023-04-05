import React, { useEffect, useState } from "react";
import WalletBalance from "./WalletBalance";

import NFTImage from "./NFTImage";
import amirContract from "../service/contract";

const Home = () => {
  const [totalMinted, setTotalMinted] = useState(0);

  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const count = await amirContract.getTotalMinted();
    setTotalMinted(count);
  };

  return (
    <div>
      <WalletBalance />
      <br />
      <div>
        {Array(totalMinted + 1)
          .fill(0)
          .map((_, i) => (
            <div key={i}>
              <NFTImage tokenId={i + 1} onImageMinted={getCount} />
              <br />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
