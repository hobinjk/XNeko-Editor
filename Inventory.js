import { Prop } from './Prop.js';

export class Inventory {
  constructor(settings, actionManager, propTemplates) {
    this.settings = settings;
    this.actionManager = actionManager;
    this.propTemplates = propTemplates;
    this.propTemplatesById = {};
    this.nextPTId = 0;

    this.container = document.createElement('div');
    this.container.classList.add('inventory');
    this.open = false;

    this.activeDrag = null;
    this.onPropTemplatePointerDown = this.onPropTemplatePointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);

    window.addEventListener('pointermove', this.onPointerMove, { passive: true });
    window.addEventListener('pointerup', this.onPointerUp, { passive: true });


    this.addPropTemplates();
  }

  addPropTemplates() {
    for (let propTemplate of this.propTemplates) {
      this.addPropTemplate(propTemplate);
    }
  }

  addPropTemplate(propTemplate) {
    let propTemplateContainer = propTemplate.create();
    propTemplateContainer.dataset.id = this.nextPTId;
    this.propTemplatesById[this.nextPTId] = propTemplate;
    this.nextPTId += 1;

    propTemplateContainer.addEventListener('pointerdown', this.onPropTemplatePointerDown);
    this.container.appendChild(propTemplateContainer);
  }

  onPropTemplatePointerDown(event) {
    let ptId = event.currentTarget.dataset.id;
    if (!ptId) {
      console.warn('event without ptId', event);
      return;
    }
    let pt = this.propTemplatesById[ptId];
    if (!pt) {
      console.warn('ptId refers to missing prop', event, this.propTemplatesById);
      return;
    }
    let x = event.clientX;
    let y = event.clientY;
    if (this.settings.snapToGrid) {
      x = this.settings.snapToGrid(x);
      y = this.settings.snapToGrid(y);
    }

    let prop = new Prop(x, y, pt);
    this.activeDrag = {
      prop,
    };

    this.bounds = this.container.getBoundingClientRect();
    this.container.classList.add('trash');
  }

  onPointerMove(event) {
    if (!this.activeDrag) {
      return;
    }
    let x = event.clientX;
    let y = event.clientY;
    if (this.settings.snapToGrid) {
      x = this.settings.snapToGrid(x);
      y = this.settings.snapToGrid(y);
    }
    let { prop } = this.activeDrag;
    prop.moveTo(x - prop.width / 2, y - prop.height / 2);
  }

  onPointerUp(event) {
    if (!this.activeDrag) {
      return;
    }
    let x = event.clientX;
    let y = event.clientY;

    let prop = this.activeDrag.prop;
    this.activeDrag = null;
    this.container.classList.remove('trash');

    if (x > this.bounds.left && x < this.bounds.right &&
      y > this.bounds.top && y < this.bounds.bottom) {
      // Cancel, prop was dropped in the trash
      prop.remove();
      return;
    }

    this.actionManager.addProp(prop);
  }
}
