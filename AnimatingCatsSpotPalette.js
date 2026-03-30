import { SpotNeko } from './SpotNeko.js';

export class AnimatingCatsSpotPalette {
  constructor(propTemplate) {
    this.spotCats = [];
    this.propTemplate = propTemplate;
    this.animationIndex = 0;
    this.showCatsForSpots();
    this.showingCats = true;
  }

  toggleCatsForSpots() {
    if (this.showingCats) {
      this.hideCatsForSpots();
    } else {
      this.showCatsForSpots(true);
    }
  }

  showCatsForSpots(updateAnimation) {
    this.showingCats = true;
    while (this.spotCats.length > this.propTemplate.spots.length) {
      this.spotCats.pop().remove();
    }
    for (let i = 0; i < this.propTemplate.spots.length; i++) {
      let spot = this.propTemplate.spots[i];
      const addingCat = !this.spotCats[i];
      if (addingCat) {
        let cat = new SpotNeko('kina-nothoughts', this.propTemplate, spot.id);
        this.spotCats.push(cat);
      }
      let cat = this.spotCats[i];
      cat.moveTo(spot.x + window.innerWidth / 2, spot.y + window.innerHeight / 2);
      if (addingCat || updateAnimation) {
        let animation = spot.allowedActions[this.animationIndex % spot.allowedActions.length];
        this.animationIndex += 1;
        cat.setAnimation(animation);
      }
    }
  }

  hideCatsForSpots() {
    this.showingCats = false;
    for (const cat of this.spotCats) {
      cat.remove();
    }
    this.spotCats = [];
  }

  update() {
    for (let cat of this.spotCats) {
      cat.update(0);
    }
    if (this.showingCats) {
      this.showCatsForSpots(false);
    }
  }
}
