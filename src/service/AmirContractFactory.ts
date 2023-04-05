import AmirContract from "../artifacts/contracts/MyNFT.sol/AmirContract.json";
import { Contract, Signer, ethers } from "ethers";

export default class AmirContractFactory {
  private contract: Contract;
  private signer: Signer;

  constructor(private contractAddress: string) {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );

    // get the end user
    this.signer = provider.getSigner();

    // get the smart contract
    this.contract = new ethers.Contract(
      contractAddress,
      AmirContract.abi,
      this.signer
    );
  }

  isContentOwned = (metadataURI: string): Promise<boolean> => {
    return this.contract.isContentOwned(metadataURI);
  };

  public async getTotalMinted(): Promise<number> {
    const count = await this.contract.count();
    return parseInt(count);
  }

  public async getURI(tokenId: number): Promise<string> {
    const uri = await this.contract.tokenURI(tokenId);
    return uri;
  }

  public async mintToken(metadataURI: string) {
    const connection = this.contract.connect(this.signer);
    const addr = connection.address;

    const result = await this.contract.payToMint(addr, metadataURI, {
      value: ethers.utils.parseEther("0.05"),
    });

    await result.wait();
  }
}
