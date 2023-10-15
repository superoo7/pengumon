import { usePengumonStats } from "@/app/web3/pengumon";

export const Stats = () => {
  const { pengumonId, pengumon, lastData } = usePengumonStats();

  return (
    <>
      <div className="absolute top-5 left-5 bg-white border-2 border-black z-100 p-2">
        <h2 className="text-black">Stats for #{pengumonId.toString()}</h2>
        <div className="flex flex-col">
          <span className="text-black">
            Cuteness: {pengumon.cuteness.toString()}
          </span>
          <span className="text-black">
            Intelligence: {pengumon.intelligence.toString()}
          </span>
          <span className="text-black">Magic: {pengumon.magic.toString()}</span>
          <span className="text-black">
            Strength: {pengumon.strength.toString()}
          </span>
          <span className="text-black">
            Health: {pengumon.health.toString()}
          </span>
          <span className="text-black">Soul: {pengumon.soul.toString()}</span>
        </div>
      </div>
      <div className="absolute bottom-5 right-5 bg-white border-2 border-black z-100 p-2">
        <h2 className="text-black">What happened?</h2>
        <div className="flex flex-col">
          <span className="text-black">
            Cuteness: {lastData[0].toString()}
          </span>
          <span className="text-black">
            Intelligence: {lastData[1].toString()}
          </span>
          <span className="text-black">Magic: {lastData[2].toString()}</span>
          <span className="text-black">
            Strength: {lastData[3].toString()}
          </span>
          <span className="text-black">
            Health: {lastData[4].toString()}
          </span>
          <span className="text-black">Soul: {lastData[5].toString()}</span>
        </div>
      </div>
    </>
  );
};
