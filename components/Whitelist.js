import { abi, address } from "../constants/index.js";
import { useState, useEffect, useRef } from "react";
import { Contract, providers, ethers } from "ethers";
import Web3Modal from "web3modal";
import Image from "next/image";
import fox from "../pages/images/Fox.png";

export default function Whitelist() {
  const [currentAddress, setCurrentAddress] = useState("");
  const [inWhitelist, setInWhitelist] = useState(false);
  const web3ModalRef = useRef();

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider; // if not signer then return provider
  };

  async function addAddressToWhitelist() {
    try {
      const signer = await getProviderOrSigner(true);
      const whiteListAddress = new Contract(address, abi, signer);
      const tx = await whiteListAddress.addWhitelistAddress();
      await tx.wait(1);
    } catch (err) {
      console.log(err);
    }
  }

  async function checkWhitelist() {
    try {
      const signer = await getProviderOrSigner(true);
      const whiteListAddress = new Contract(address, abi, signer);
      const signerAddress = await signer.getAddress();
      const tx = await whiteListAddress.whitelistAddresses(signerAddress);
      console.log(tx);
      setInWhitelist(tx);
      setCurrentAddress(signerAddress);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    web3ModalRef.current = new Web3Modal({
      network: "localhost",
      providerOptions: {},
      disableInjectedProvider: false,
    });
  }, []);

  return (
    <div className="flex flex-col items-start md:items-start md:ml-16 lg:ml-32 ml-6 md:mr-32 mr-10 mt-8 pb-5">
      <div className="flex flex-row items-center">
        <button
          className="text-2xl p-3 bg-white rounded-full flex   hover:bg-black hover:text-white"
          onClick={async () => {
            await addAddressToWhitelist();
          }}
        >
          Get whitelisted
          <Image src={fox} height={30} width={30} />
        </button>
        <p className="text-white px-12">(Görli testnet)</p>
      </div>

      <div className="mt-5">
        <button
          className="text-white bg-slate-600 rounded-full p-3 text-xl flex hover:bg-black"
          onClick={() => {
            checkWhitelist();
          }}
        >
          Check whitelist status
          <Image src={fox} height={30} width={30} />
        </button>
        {inWhitelist ? (
          <div>
            <p className="text-white mt-5 ml-3">
              You are whitelisted! Address: {currentAddress}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-white mt-5 ml-3">
              You are NOT whitelisted! Address: {currentAddress}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
