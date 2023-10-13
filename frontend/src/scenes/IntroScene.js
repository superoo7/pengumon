import Phaser from "phaser";

const dpr = window.devicePixelRatio;

export class IntroScene extends Phaser.Scene {
  constructor() {
    super({ key: "IntroScene" });
  }

  preload() {
    this.load.image("scene1-background", "scenes/scene1.png");
    this.load.audio("scene1-audio", "scenes/scene1.mp3");
    this.load.image("button", "game/button.png");
  }

  create() {
    // Get the dimensions of the game area
    const { width, height } = this.scale;

    // Get the dimensions of the image
    const image = this.textures.get("scene1-background").getSourceImage();
    const imageWidth = image.width;
    const imageHeight = image.height;

    // Calculate the scaling factors and use the larger of the two to ensure the image covers the entire game area
    const scaleX = width / imageWidth;
    const scaleY = height / imageHeight;
    const scale = Math.max(scaleX, scaleY);

    const halfWidth = (width * dpr) / 2;
    const halfHeight = (height * dpr) / 2;
    // Create the background image and scale it
    this.bgImage = this.add
      .image(halfWidth, halfHeight, "scene1-background")
      .setScale(scale);

    this.text = this.add
      .text(halfWidth, 50, "PenguMon", {
        fontSize: "256px",
        fontFamily: "JollyLodger",
        fill: "#fff",
        shadow: {
          offsetX: 5, // Horizontal shadow offset
          offsetY: 5, // Vertical shadow offset
          color: "#000", // Shadow color
          blur: 5, // Shadow blur radius
          stroke: true, // Whether the shadow should be applied to the stroke of the text
          fill: true, // Whether the shadow should be applied to the fill of the text
        },
      })
      .setOrigin(0.5, 0);

    // Continue with the rest of your create method...
    this.button = this.add
      .image(halfWidth, height - 300, "button")
      .setInteractive();
    this.button.setTint(0xddd);
    this.buttonText = this.add
      .text(halfWidth, height - 300, "Start Game", {
        fontFamily: "MetalMania",
        fontSize: "64px",
        fill: "#fff",
      })
      .setOrigin(0.5, 0.5);

    this.button.on("pointerdown", () => {
        this.scene.start("MainScene");
    });
    this.button.on("pointerover", () => {
      this.button.setTint(0x333); 
      this.buttonText.setStyle({ fill: "#fff" }); 
    });
    this.button.on("pointerout", () => {
      this.button.setTint(0xddd);
      this.buttonText.setStyle({ fill: "#fff" }); 
    });
  }

  update() {}
}
