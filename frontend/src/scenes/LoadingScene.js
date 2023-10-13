import Phaser from "phaser";

export class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: "LoadingScene" });
  }

  preload() {
  }

  create() {
    this.add.text(400, 300, "Loading...", { color: "#0f0" })
    this.scene.start("MainScene");
  }

  update() {

  }
}