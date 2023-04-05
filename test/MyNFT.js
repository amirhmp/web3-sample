import { expect } from "chai";
import HardHat from "hardhat";

const { ethers } = HardHat;

describe("MyNFT", function () {
  it("should mint and transfer an NFT to someone", async () => {
    const AmirContractFactory = await ethers.getContractFactory("AmirContract");
    const amirContract = await AmirContractFactory.deploy();
    await amirContract.deployed(); // contract deploy shod, hala niaz be yek ether net va yek wallet address vase test darim, az hardhat estefade mikonim ta fake generate konim

    const recipient = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const metadataURI = "cid/test.png";

    // now we can calling the methods on the deployed smart contract
    let balance = await amirContract.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await amirContract.payToMint(
      recipient,
      metadataURI,
      {
        value: ethers.utils.parseEther("0.05"),
      }
    );

    // wait until the transaction is mined
    await newlyMintedToken.wait();
    balance = await amirContract.balanceOf(recipient);
    expect(balance).to.equal(1);
    expect(await amirContract.isContentOwned(metadataURI)).to.equal(true);
  });
});
