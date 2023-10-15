"use client";
import React from "react";
import Phaser from "phaser";
import { MainScene } from "@/scenes/MainScene";
import { LoadingScene } from "@/scenes/LoadingScene";
import FontFaceObserver from "fontfaceobserver";
import { usePengumonAction } from "../web3/pengumon";

const Game = () => {
  const { sleep, wilderness, refetchLastData, lastChangeStats } =
    usePengumonAction();

  const counter = React.useRef(0);

  React.useEffect(() => {
    if (counter.current < 2) {
      counter.current++;
    } else {
      alert(
        `Your pengumon's stats have changed: 
      Cuteness: ${lastChangeStats[0].toString()}
      Intelligence: ${lastChangeStats[1].toString()}
      Magic: ${lastChangeStats[2].toString()}
      Strength: ${lastChangeStats[3].toString()}
      Health: ${lastChangeStats[4].toString()}
      Soul: ${lastChangeStats[5].toString()}` 
      );
    }
  }, [lastChangeStats]);

  React.useEffect(() => {
    window.penguSleep = async () => {
      let c = confirm("Are you sure you want to put your pengumon to sleep?");
      if (c) {
        await sleep();
        await refetchLastData();
      }
    };
    window.penguWilderness = async () => {
      let c = confirm(
        "Are you sure you want to put your pengumon in the wilderness?"
      );
      if (c) {
        await wilderness();
        await refetchLastData();
      }
    };
  }, [sleep, wilderness]);

  React.useEffect(() => {
    const font1 = new FontFaceObserver("JollyLodger");
    const font2 = new FontFaceObserver("MetalMania");
    Promise.all([font1.load(), font2.load()]).then(() => {
      loadGame();
    });
  }, []);

  const loadGame = async () => {
    if (typeof window !== "object") {
      return;
    }

    const config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: "#4eb3e7",
      pixelArt: true,
      scene: [LoadingScene, MainScene],
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
    };
    var game = new Phaser.Game(config);
  };

  return null;
};

export default Game;
