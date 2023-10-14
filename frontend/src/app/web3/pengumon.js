import { useContractWrite, useContractRead, useAccount } from "wagmi";

const CONTRACT_ADDRESS = "0x8d996BeF15814F025064BE83590587dACC33e77D";
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
  const { address } = useAccount()

  const {
    data
  } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: PENGUMON_ABI_JSON,
    functionName: "balanceOf",
    args: [address]
  });

  return {
    hasUserMinted: data && data > 0,
  }
};

export const usePengumonStats = () => {
  const { address } = useAccount()

  const {
    data: pengumonId
  } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: PENGUMON_ABI_JSON,
    functionName: "tokenOfOwnerByIndex",
    args: [address, 0]
  });
  const {
    data
  } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: PENGUMON_ABI_JSON,
    functionName: "getPengumon",
    args: [pengumonId]
  });

  console.log({ pengumonId, data })

  return {
    pengumonId,
    pengumon: data,
  }
}