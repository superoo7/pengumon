import Phaser from "phaser";

const SPEED = 32;

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
    this.load.on("complete", () => {});
  }

  create() {
    const SCALE = 1.5;
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
    this.pengu = this.physics.add.sprite(
      11 * SCALE * 32,
      4 * SCALE * 32,
      "pengu"
    );
    this.map.setScale(SCALE);
    this.pengu.setScale(SCALE);
    this.camera = this.cameras.main;
    this.camera.setZoom(2);
    this.camera.setBounds(0, 0, window.innerWidth * 2, window.innerHeight * 2);
    this.camera.setDeadzone(0);
    this.camera.startFollow(this.pengu, true, 0.1, 0.1, -40, -40);

    this.birdSound = this.sound.add("birds");
    this.walkSound = this.sound.add("footstep");
    this.birdSound.play({
      loop: true,
      delay: 5,
    });
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    let moving = false;

    if (cursors.left.isDown) {
      this.pengu.setVelocityX(-SPEED);
      this.pengu.anims.play("left", true);
      this.playWalkSound();
      moving = true;
    } else if (cursors.right.isDown) {
      this.pengu.setVelocityX(SPEED);
      this.pengu.anims.play("right", true);
      this.playWalkSound();
      moving = true;
    } else {
      this.pengu.setVelocityX(0);
    }

    if (cursors.up.isDown) {
      this.pengu.setVelocityY(-SPEED);
      this.pengu.anims.play("up", true);
      this.playWalkSound();
      moving = true;
    } else if (cursors.down.isDown) {
      this.pengu.setVelocityY(SPEED);
      this.pengu.anims.play("down", true);
      this.playWalkSound();
      moving = true;
    } else {
      this.pengu.setVelocityY(0);
    }

    if (!moving) {
      this.pengu.anims.stop();
      this.walkSound.stop();
    }
  }

  playWalkSound() {
    if (!this.walkSound.isPlaying) {
      this.walkSound.play({ rate: 4, volume: 0.2 });
    }
  }
}
