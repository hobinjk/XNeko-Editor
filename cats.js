import { ActionManager } from './ActionManager.js';
import { Neko } from './Neko.js';
import { Prop } from './Prop.js';
import { BedTemplate } from './PropTemplate.js';

const catNames = [
  'ace',
  'air',
  // 'alien',
  'black',
  'black2',
  // 'blue-marine',
  'blue-tabby',
  'blue',
  'boobookitty',
  // 'brown-bsd-daemon',
  'brown-dog',
  'calico-tabby',
  'calico',
  // 'captain-goodnight',
  // 'caz',
  // 'coke-bottle',
  'colourful',
  'dave',
  'deedee',
  'dog',
  // 'doom',
  'earth',
  'face',
  'fancy',
  // 'ff3mog',
  'fire',
  'ghetto',
  'ghost',
  'gray',
  // 'green-ghost',
  'holiday',
  'jess',
  'kina',
  'kuramecha',
  'lucky',
  'lucy-dog',
  'lucy',
  'marmalade',
  'mermaid',
  // 'metroid',
  'mike',
  // 'mini',
  'moka',
  'multi',
  'nekocool',
  'neon',
  'orange',
  // 'pac-man',
  'peach',
  // 'penguin-2',
  // 'penguin',
  'pink-nose-neko',
  'pink',
  'rainbow',
  // 'red-bsd-daemon',
  'robot',
  // 'rocket',
  'rose',
  'royal',
  'silver',
  'silversky',
  'skunk',
  'socks',
  // 'sonic',
  'spirit',
  'spooky',
  'tabby',
  // 'tentacle',
  // 'tie-fighter',
  'turtle',
  'usa',
  'valentine',
  'water',
  'white',
  // 'worms',
  // 'zelda3',
];

const cats = catNames.map(name => new Neko(name));
const props = [];
const bedTemplate = new BedTemplate();
for (let i = 0; i < 10; i++) {
  let x = Math.round((Math.random() * 0.8 + 0.1) * window.innerWidth / 16) * 16;
  let y = Math.round((Math.random() * 0.8 + 0.1) * window.innerHeight / 16) * 16;

  props.push(new Prop(x, y, bedTemplate));
}

let actionManager = new ActionManager(cats, props);
function update() {
  actionManager.update();
  window.requestAnimationFrame(update);
}

update();
