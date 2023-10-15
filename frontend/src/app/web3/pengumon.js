import React from "react";
import { useContractWrite, useContractRead, useAccount } from "wagmi";

const CONTRACT_ADDRESS = "0x687A92D123130d79c098ca3bC906718100698a36";
const PENGUMON_ABI_JSON = require("../create/pengumon.abi.json");

export const useMintPengu = () => {
  const { data, isLoading, isSuccess, writeAsync } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: PENGUMON_ABI_JSON,
    functionName: "createCharacter",
  });

  return {
    mintPengu: writeAsync,
  };
};

export const usePengumon = () => {
  const { address } = useAccount();

  const { data } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: PENGUMON_ABI_JSON,
    functionName: "balanceOf",
    args: [address],
  });

  return {
    hasUserMinted: data && data > 0,
  };
};

export const usePengumonStats = () => {
  const { address } = useAccount();

  const { data: pengumonId } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: PENGUMON_ABI_JSON,
    functionName: "tokenOfOwnerByIndex",
    args: [address, 0],
  });
  const { data, refetch } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: PENGUMON_ABI_JSON,
    functionName: "getPengumon",
    args: [pengumonId],
  });
  const { data: lastData, refetch: refetchLastData } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: PENGUMON_ABI_JSON,
    functionName: "tokenIdToLastChangeStats",
    args: [pengumonId],
  });
  console.log(lastData)

  React.useEffect(() => {
    const id = setInterval(() => {
      refetch();
      refetchLastData();
    }, 2000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return {
    pengumonId,
    pengumon: data,
    lastData,
    refetchLastData
  };
};

export const usePengumonAction = () => {
  const { pengumonId, lastData, refetchLastData } = usePengumonStats();


  const { writeAsync: sleep } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: PENGUMON_ABI_JSON,
    functionName: "penguSleep",
    args: [pengumonId],
  });
  const { writeAsync: wilderness } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: PENGUMON_ABI_JSON,
    functionName: "penguWilderness",
    args: [pengumonId],
  });

  return {
    sleep,
    wilderness,
    refetchLastData: refetchLastData,
    lastChangeStats: lastData,
  };
};
