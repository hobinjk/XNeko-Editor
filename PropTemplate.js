import { Actions } from "./Neko";

export class PropTemplate {
  constructor(height, spots) {
    this.height = height;
    this.spots = spots;
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
    super(32, [
      new Spot(16, 16, [Actions.sleep]),
    ]);
    this.container.style.background = 'white';
    this.container.style.width = '32px';
    this.container.style.height = '32px';
  }
}
