"use client";

import dynamic from "next/dynamic";
import React from "react";
import { usePengumon } from "../web3/pengumon";
import Link from "next/link";
import { Stats } from "../../components/Stats";

const DynamicComponentWithNoSSR = dynamic(() => import("./game"), {
  ssr: false,
});

const HomePage = () => {
  const { hasUserMinted } = usePengumon();

  if (hasUserMinted)
    return (
      <>
        <Stats />
        <DynamicComponentWithNoSSR />
      </>
    );
  else
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-4xl md:text-8xl py-8 text-center">
          You don&apos;t have Wizzy NFT
        </h1>
        <Link className="text-2xl" href="/create">
          Create it here
        </Link>
      </div>
    );
};

export default HomePage;
