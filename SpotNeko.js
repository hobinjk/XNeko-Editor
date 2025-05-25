import { Z_INDEX_BASE } from './constants.js';
import { Spritesheet } from './Neko.js';

const ANIMATION_FPS = 10;

export class SpotNeko {
  constructor(name, propTemplate, spotId) {
    this.spot = propTemplate.spots.find(spot => spot.id === spotId);

    this.name = name;
    this.x = 0;
    this.y = 0;

    this.z = this.y;
    this.elt = document.createElement('div');
    this.elt.classList.add('cat');
    this.elt.style.backgroundImage = `url(spritesheets/${name}.png)`;
    document.body.appendChild(this.elt);
    this.lastFrame = -1;
    this.animation = 'wrun';
    this.animationIndex = 0;
    this.animationScale = 1;

    this.dragging = false;

    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);

    window.addEventListener('pointermove', this.onPointerMove);
    window.addEventListener('pointerup', this.onPointerUp);
    this.elt.addEventListener('pointerdown', this.onPointerDown);
  }

  remove() {
    document.body.removeChild(this.elt);
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
    this.elt.removeEventListener('pointerdown', this.onPointerUp);
    this.actionManager = null;
  }

  onPointerDown() {
    this.dragging = true;
    document.body.classList.add('trash-visible');
  }

  onPointerMove(event) {
    if (!this.dragging) {
      return;
    }
    let x = Math.round(event.clientX - window.innerWidth / 2);
    let y = Math.round(event.clientY - window.innerHeight / 2);
    this.moveTo(x + window.innerWidth / 2, y + window.innerHeight / 2);
    this.spot.controlX.setValue(x);
    this.spot.controlY.setValue(y);
  }

  onPointerUp() {
    this.dragging = false;
    document.body.classList.remove('trash-visible');

    if (this.x < 100) {
      this.remove();
    }
  }
  update() {
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
    this.lastFrame = 0;
    this.updateAnimation();
  }


  moveTo(x, y) {
    this.x = x;
    this.y = y;
    this.z = this.y + 400; // always on top, bit of a hack
    this.elt.style.top = `${this.y}px`;
    this.elt.style.left = `${this.x}px`;
    this.elt.style.zIndex = Math.round(this.z + Z_INDEX_BASE);
  }
}

