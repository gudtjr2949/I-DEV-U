import Phaser from 'phaser';

const ASSETS = {
  'A': '/assets/L1-B1.png',
  'B': '/assets/L1-C4.png',
  'C': '/assets/L1-A4.png',
};

const pattern = `
BBBBBBBBBBBBBBBB
BAAAAAAAAAAAAAAB
BCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCB
BBBBBBBBBBBBBBBB
`;

export class Ssize1Scene extends Phaser.Scene {

  private character?: Phaser.Physics.Arcade.Sprite;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private walls?: Phaser.Physics.Arcade.StaticGroup;

  constructor() {
    super({ key: 'Ssize1Scene' });
  }

  preload() {
    for (let char in ASSETS) {
        this.load.image(char, (ASSETS as Record<string, string>)[char]);
    }

    this.load.image('character', 'assets/admin_character.png');
  }

  create() {
    const rows = pattern.trim().split('\n');
    const tileSize = 32;  

    this.walls = this.physics.add.staticGroup();

    rows.forEach((row, rowIndex) => {
      Array.from(row).forEach((char, colIndex) => {
        if ((ASSETS as Record<string, string>)[char]) {
          if (char === 'A' || char === 'B') {
            const wallTile = this.walls?.create(colIndex * tileSize + tileSize / 2, rowIndex * tileSize + tileSize / 2, char);
            wallTile.setSize(tileSize, tileSize);  // 벽 타일의 크기 설정
          } else {
            this.add.image(colIndex * tileSize, rowIndex * tileSize, char).setOrigin(0, 0);
          }
        }
      });
    });

    const mapCenterX = rows[0].length * tileSize / 2;
    const mapCenterY = rows.length * tileSize / 2;

    this.character = this.physics.add.sprite(mapCenterX, mapCenterY, 'character');
    this.character.setCollideWorldBounds(true);
    this.physics.add.collider(this.character, this.walls);  // 캐릭터와 벽 사이의 충돌 설정

    this.cursors = this.input.keyboard?.createCursorKeys();
    this.cameras.main.startFollow(this.character);
    // this.physics.world.createDebugGraphic();  // 디버그 그래픽
}


  update() {
    if (this.cursors && this.character) {
      if (this.cursors.left?.isDown) {
        this.character.setVelocityX(-1280);
      } else if (this.cursors.right?.isDown) {
        this.character.setVelocityX(1280);
      } else {
        this.character.setVelocityX(0);
      }

      if (this.cursors.up?.isDown) {
        this.character.setVelocityY(-1280);
      } else if (this.cursors.down?.isDown) {
        this.character.setVelocityY(1280);
      } else {
        this.character.setVelocityY(0);
      }
    }
  }
}