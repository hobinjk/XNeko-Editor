import { Z_INDEX_BASE } from "./constants";

const ANIMATION_FPS = 10;
export const Actions = {
  sleep: 'sleep',
  itch: 'itch',
  scratch: 'scratch',
  wscratch: 'wscratch',
  escratch: 'escratch',
  wash: 'wash',
  alert: 'alert',
  still: 'still',
  yawn: 'yawn',
};

export const Spritesheet = {
  wash: [{ x: 0, y: 0 }],
  alert: [{ x: 32, y: 0 }],
  sleep: [{ x: 0, y: 32 }, { x: 32, y: 32 }],
  itch: [{ x: 0, y: 64 }, { x: 32, y: 64 }],
  still: [{ x: 0, y: 96 }],
  yawn: [{ x: 32, y: 96 }],
  wscratch: [{ x: 0, y: 128 }, { x: 32, y: 128 }],
  sscratch: [{ x: 0, y: 160 }, { x: 32, y: 160 }],
  escratch: [{ x: 0, y: 192 }, { x: 32, y: 192 }],
  nscratch: [{ x: 0, y: 224 }, { x: 32, y: 224 }],
  nwrun: [{ x: 0, y: 256 }, { x: 32, y: 256 }],
  wrun: [{ x: 0, y: 288 }, { x: 32, y: 288 }],
  swrun: [{ x: 0, y: 320 }, { x: 32, y: 320 }],
  srun: [{ x: 0, y: 352 }, { x: 32, y: 352 }],
  serun: [{ x: 0, y: 384 }, { x: 32, y: 384 }],
  erun: [{ x: 0, y: 416 }, { x: 32, y: 416 }],
  nerun: [{ x: 0, y: 448 }, { x: 32, y: 448 }],
  nrun: [{ x: 0, y: 480 }, { x: 32, y: 480 }],
};

export class Neko {
  constructor(name) {
    this.name = name;
    this.x = Math.random() * innerWidth;
    this.y = Math.random() * innerHeight;
    this.z = this.y;
    this.elt = document.createElement('div');
    this.elt.classList.add('cat');
    this.elt.style.backgroundImage = `url(spritesheets/${name}.png)`;
    document.body.appendChild(this.elt);
    this.lastFrame = -1;
    this.animation = 'wrun';
    this.animationIndex = 0;
    this.animationScale = 1;
  }

  update() {
    this.updateMovement();
    this.updateAnimation();
  }

  updateAnimation() {
    if (Date.now() - this.lastFrame < 1000 * this.animationScale / ANIMATION_FPS) {
      return;
    }
    this.lastFrame = Date.now();

    const sprites = Spritesheet[this.animation];
    const sprite = sprites[this.animationIndex];
    this.animationIndex = (this.animationIndex + 1) % sprites.length;
    this.elt.style.backgroundPosition = `${sprite.x}px ${512 - sprite.y}px`;
  }

  setAnimation(animation) {
    this.animation = animation;
    this.animationIndex = 0;
    this.animationScale = 1;
    switch (this.animation) {
      case 'sleep':
        this.animationScale = 5;
        break;
      case 'itch':
      case 'wscratch':
      case 'sscratch':
      case 'escratch':
      case 'nscratch':
        this.animationScale = 2;
        break;
      default:
        break;
    }
  }

  updateMovement() {
    this.elt.style.top = `${this.y}px`;
    this.elt.style.left = `${this.x}px`;
    this.elt.style.zIndex = Math.round(this.z + Z_INDEX_BASE);
  }
}
