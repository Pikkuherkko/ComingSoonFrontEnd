import Image from "next/image";
import logo from "../pages/images/JuhoSwap.png";
import arrow from "../pages/images/icon-arrow.svg";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Main() {
  const [emails, setEmails] = useState([]);
  const [email, setEmail] = useState("");

  const invalid = (e) => {
    const emailmsg = document.querySelector(".emailmsg");
    e.preventDefault();
    emailmsg.textContent = "Please provide a valid email";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("api/emails", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="flex flex-col items-start md:items-start md:ml-16 lg:ml-32 ml-6 md:mr-32 mr-10">
      <div className="md:items-end mt-5 mb-5 p-2 max-w-4 max-h-4">
        <Image src={logo} layout="fixed" height={70} width={120} />
      </div>
      <div className="lg:mt-24 md:mt-18 mt-12 md:p-5 p-3 lg:text-6xl md:text-3xl uppercase tracking-widest bg-slate-700 bg-opacity-30 rounded-3xl">
        <h1 className="text-red-700 font-thin">We are</h1>
        <h1 className="">coming</h1>
        <h1 className="">soon</h1>
      </div>

      <p className="text-white md:text-xl lg:text-2xl mt-8 bg-slate-600 bg-opacity-50 rounded-3xl p-3">
        Whats up cryptoheads! A new DeFi project is brewing. Add your email
        below to stay up-to-date with announcements and launch deals. Sign up
        for whitelist to gain access to NFT minting (Metamask required).
      </p>
      <form
        className="flex flex-row items-center mt-10 form"
        id="form"
        action="submit"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="email"
          className="border-red-700 focus:outline-none border-solid border-2 rounded-full py-4 px-8 lg:w-72 email "
          placeholder="Email Address"
          required
          onChange={(event) => setEmail(event.target.value)}
          onInvalid={invalid}
          onClick={<p>Success</p>}
        />
        <button
          className="p-4 px-8 bg-red-700 hover:bg-red-300 rounded-full flex items-center"
          type="submit"
        >
          <Image src={arrow} />
        </button>
      </form>
      <p className="ml-4 p-3 text-red-700 emailmsg"></p>
    </div>
  );
}
