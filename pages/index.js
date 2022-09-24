import Head from "next/head";
import Image from "next/image";
import Main from "../components/Main";
import Whitelist from "../components/Whitelist";
import profilePic from "../pages/images/pexels-photo-2387793.jpeg";

export default function Home() {
  return (
    <div className=" font-Josefin bg-[url('../pages/images/pexels-photo-2387793.jpeg')] bg-cover w-full h-full">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          src="my-app/pages/images/favicon-32x32.png"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@200;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div>
        <Main />
        <Whitelist />
      </div>
      <footer className="text-white flex flex-row justify-end md:text-2xl p-2 ">
        Created by Ikone.eth
      </footer>
    </div>
  );
}
