import Phaser from "phaser";

const width = window.innerWidth;
const height = window.innerHeight;

export class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: "LoadingScene" });
  }

  preload() {
    this.cameras.main.setBackgroundColor("#000000");
    const progressBox = this.add.graphics();
    const progressBar = this.add.graphics();
    const progressX = width / 2 - 160;
    const progressY = height / 2 + 150;
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(progressX, progressY, 320, 30);

    // Load Assets
    this.load.spritesheet("pengu", "game/pengu.png", {
      frameWidth: 32,
      frameHeight: 32,
      endFrame: 23,
    });
    this.load.image("map", "game/testmap.png");
    this.load.audio("birds", "game/Retro Birds 07.wav");
    this.load.audio("footstep", "game/Retro FootStep Mud 01.wav");
    this.load.spritesheet("pengu-action", "game/pengu-action.png", {
      frameWidth: 32,
      frameHeight: 32,
      endFrame: 30,
    });

    // Track Progress
    this.load.on("progress", function (value) {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(progressX, progressY, 320 * value, 30);
    });
    this.load.on("complete", () => {
      progressBar.destroy();
      progressBox.destroy();
      this.scene.start("MainScene");
    });
  }

  create() {
    const pengu = this.add
      .image(width / 2, height / 2, "pengu")
      .setOrigin(0.5, 0.5);
    pengu.setScale(6);
    this.add
      .text(width / 2, height / 2 + 120, "Loading...", {
        color: "#fff",
        fontSize: "32px",
        fontFamily: "JollyLodger",
      })
      .setOrigin(0.5, 0.5);
  }

  update() {}
}
