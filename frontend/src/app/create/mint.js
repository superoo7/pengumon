import { useContractWrite } from "wagmi";

const CONTRACT_ADDRESS = "0x6723eE457A9d76AC7DEc45435b77627E138646E3";

export const useMintPengu = () => {
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: require("./pengumon.abi.json"),
    functionName: "createCharacter",
  });

  return {
    mintPengu: write,
  }
};
