import { usePengumonStats } from "@/app/web3/pengumon"


export const Stats = () => {
    const {
        pengumonId,
        pengumon
    } = usePengumonStats();

    return <div className="absolute top-5 left-5 bg-white border-2 border-black z-100 p-2">
        <h2 className="text-black">Stats for #{pengumonId.toString()}</h2>
        <div className="flex flex-col">
            <span className="text-black">Cuteness: {pengumon.cuteness.toString()}</span>
            <span className="text-black">Intelligence: {pengumon.intelligence.toString()}</span>
            <span className="text-black">Magic: {pengumon.magic.toString()}</span>
            <span className="text-black">Strength: {pengumon.strength.toString()}</span>
            <span className="text-black">Health: {pengumon.health.toString()}</span>
            <span className="text-black">Soul: {pengumon.soul.toString()}</span>
        </div>
    </div>
}