import React, { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";

const WalletBalance = () => {
  const [balance, setBalance] = useState("-");
  const [loading, setLoading] = useState(true);

  const handleRefreshBalance = useCallback(async () => {
    setLoading(true);
    const balance = await fetchBalanceFromMetaMask();
    setLoading(false);
    setBalance(balance);
  }, []);

  useEffect(() => {
    handleRefreshBalance();
  }, []);

  return (
    <div>
      <div>Balance: {loading ? "wait.." : balance}</div>
      <div>
        <button onClick={handleRefreshBalance}>refresh</button>
      </div>
    </div>
  );
};

export default WalletBalance;

async function fetchBalanceFromMetaMask() {
  const accounts = await (window as any).ethereum.request({
    method: "eth_requestAccounts",
  });
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);

  // console.log(accounts);
  const balance = await provider.getBalance(accounts[0]);
  return ethers.utils.formatEther(balance);
}
