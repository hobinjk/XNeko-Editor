import { ActionManager } from './ActionManager.js';
import { Inventory } from './Inventory.js';
import { Neko, catNames } from './Neko.js';
import { templates } from './PropTemplate.js';
import { Settings } from './Settings.js';


const props = [];
const cats = [];
let actionManager = new ActionManager(cats, props, false);
catNames.forEach(name => {
  cats.push(new Neko(actionManager, name, '', 10000, {
  }));
});

const bedTemplate = templates[0];
const bookshelfTemplate = templates[1];

const inventory = new Inventory(
  new Settings(),
  actionManager, [
  bedTemplate,
  bookshelfTemplate,
  bedTemplate,
  bookshelfTemplate,
  bedTemplate,
  bookshelfTemplate,
  bedTemplate,
  bookshelfTemplate,
  bedTemplate,
  bookshelfTemplate,
  bedTemplate,
  bookshelfTemplate,
  bedTemplate,
  bookshelfTemplate,
  bedTemplate,
  bookshelfTemplate,
  bedTemplate,
  bookshelfTemplate,
  bedTemplate,
  bookshelfTemplate,
  bedTemplate,
  bookshelfTemplate,
  bedTemplate,
  bookshelfTemplate,
  bedTemplate,
  bookshelfTemplate,
  bedTemplate,
  bookshelfTemplate,
  bedTemplate,
  bookshelfTemplate,
  bedTemplate,
  bookshelfTemplate,
  bedTemplate,
  bookshelfTemplate,
  bedTemplate,
  bookshelfTemplate,
  bedTemplate,
  bookshelfTemplate,
  bedTemplate,
  bookshelfTemplate,
  bedTemplate,
  bookshelfTemplate,
  bedTemplate,
  bookshelfTemplate,
  bedTemplate,
  bookshelfTemplate,
  bedTemplate,
  bookshelfTemplate,
  bedTemplate,
  bookshelfTemplate,
]);
inventory.add();

function update() {
  actionManager.update();
  window.requestAnimationFrame(update);
}

update();
