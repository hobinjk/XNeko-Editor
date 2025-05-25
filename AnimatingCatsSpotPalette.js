import { Neko, Spritesheet, catNames } from './Neko.js';
import { SpotNeko } from './SpotNeko.js';

const animations = Object.keys(Spritesheet);

export class AnimatingCatsSpotPalette {
  constructor(propTemplate) {
    this.cats = [];

    this.spotCats = [];
    for (let i = 0; i < animations.length; i++) {
      let animCat = new Neko(null, 'kina-nothoughts', null, 10000000, null);
      let animation = animations[i];
      animCat.setAnimation(animation);
      animCat.x = 44;
      animCat.y = 40 + 40 * i;
      this.cats.push(animCat);

      animCat.elt.addEventListener('pointerdown', (event) => {
        console.log('yep clock');
        propTemplate.addSpot();
        let spotId = propTemplate.spots.at(-1).id;
        let spotCat = new SpotNeko('kina-nothoughts', propTemplate, spotId);
        spotCat.setAnimation(animation);
        spotCat.moveTo(event.clientX, event.clientY);
        spotCat.onPointerDown();
        this.spotCats.push(spotCat);
      });
    }
  }

  update() {
    for (let cat of this.cats) {
      cat.update(0);
    }
    for (let cat of this.spotCats) {
      cat.update(0);
    }
  }
}
