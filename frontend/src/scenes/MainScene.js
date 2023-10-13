import Phaser from "phaser";

const SPEED = 32;

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
    this.load.image("map", "game/testmap.png");
    this.load.spritesheet("pengu", "game/pengu.png", {
      frameWidth: 32,
      frameHeight: 32,
      endFrame: 23,
    });
  }

  create() {
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("pengu", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("pengu", { start: 6, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("pengu", { start: 12, end: 17 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("pengu", { start: 18, end: 23 }),
      frameRate: 10,
      repeat: -1,
    });
    this.map = this.add.image(0, 0, "map").setOrigin(0, 0);
    this.pengu = this.physics.add.sprite(4 * 32, 3 * 32, "pengu");
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    let moving = false; // Variable to track if any movement key is pressed

    // Handle horizontal movement
    if (cursors.left.isDown) {
      this.pengu.setVelocityX(-SPEED);
      this.pengu.anims.play("left", true);
      moving = true;
    } else if (cursors.right.isDown) {
      this.pengu.setVelocityX(SPEED);
      this.pengu.anims.play("right", true);
      moving = true;
    } else {
      this.pengu.setVelocityX(0);
    }

    // Handle vertical movement
    if (cursors.up.isDown) {
      this.pengu.setVelocityY(-SPEED);
      this.pengu.anims.play("up", true);
      moving = true;
    } else if (cursors.down.isDown) {
      this.pengu.setVelocityY(SPEED);
      this.pengu.anims.play("down", true);
      moving = true;
    } else {
      this.pengu.setVelocityY(0);
    }

    // If no movement keys are pressed, stop the animation
    if (!moving) {
      this.pengu.anims.stop();
    }
  }
}
