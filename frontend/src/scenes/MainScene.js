import Phaser from "phaser";

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
    this.load.image("logo", "next.svg");
  }

  create() {
    this.add.image(400, 300, "logo");
  }
}