import { Actions } from "./Neko";

export class PropTemplate {
  constructor(width, height, spots, isFloorProp) {
    this.width = width;
    this.height = height;
    this.spots = spots;
    this.isFloorProp = isFloorProp;
    this.container = document.createElement('div');
    this.container.classList.add('prop');
  }

  create() {
    return this.container.cloneNode(true);
  }
}

class Spot {
  constructor(x, y, allowedActions) {
    this.x = x;
    this.y = y;
    this.allowedActions = allowedActions;
    this.occupied = false;
  }

  clone() {
    return new Spot(this.x, this.y, this.allowedActions);
  }
}

export class BedTemplate extends PropTemplate {
  constructor() {
    super(32, 32, [
      new Spot(16, 16, [Actions.sleep]),
    ], true);
    this.container.style.background = 'white';
    this.container.style.width = '32px';
    this.container.style.height = '32px';
  }
}

export class BookshelfTemplate extends PropTemplate {
  constructor() {
    super(64, 128 + 32, [], false);
    for (let y = 0; y < this.height; y += 32) {
      let actions = [Actions.sleep];
      if (y === 0) {
        actions.push(Actions.sleep);
        actions.push(Actions.itch);
      }
      for (let x = 0; x < this.width; x += 32) {
        this.spots.push(new Spot(x + 16, y - 16, actions));
      }
    }
    this.spots.push(new Spot(-16, this.height - 16, [Actions.escratch]));
    this.spots.push(new Spot(this.width + 16, this.height - 16, [Actions.wscratch]));

    this.container.style.background = '#ccf';
    this.container.style.width = `${this.width}px`;
    this.container.style.height = `${this.height}px`;
  }
}
