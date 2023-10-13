"use client";
import React from "react";
import Phaser from "phaser";
import { MainScene } from "@/scenes/MainScene";
import { LoadingScene } from "@/scenes/LoadingScene";
import { IntroScene } from "@/scenes/IntroScene";
import FontFaceObserver from "fontfaceobserver";

const Game = () => {
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
      width: window.innerWidth * window.devicePixelRatio,
      height: window.innerHeight * window.devicePixelRatio,
      backgroundColor: "#4eb3e7",
      pixelArt: true,
      scene: [LoadingScene, IntroScene, MainScene],
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

  return <div />;
};

export default Game;
