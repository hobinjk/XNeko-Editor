export class Prop {
  constructor(x, y, propTemplate) {
    this.x = x;
    this.y = y;
    this.height = propTemplate.height;
    this.propTemplate = propTemplate;
    this.spots = this.propTemplate.spots.map(spot => spot.clone());
    this.elt = this.propTemplate.create();
    this.elt.style.top = `${this.y}px`;
    this.elt.style.left = `${this.x}px`;
    document.body.appendChild(this.elt);
  }
}
