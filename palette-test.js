import { ActionManager } from "./ActionManager";
import { Neko } from "./Neko";
import { getBestSpritesheetForImage } from "./palette";

let input = document.getElementById('image-input');

function onUploadImageChange(event) {
  let file = event.target.files[0];
  if (!file) {
    return;
  }
  let reader = new FileReader();
  reader.onload = () => {
    let image = document.createElement('img');
    image.src = reader.result;
    image.onload = async () => {
      let sheetUrl = await getBestSpritesheetForImage(image);
      cats.push(new Neko('custom', sheetUrl));
    };
  };
  reader.readAsDataURL(file);
}

input.onchange = onUploadImageChange;

let cats = [];

// Preview
let actionManager = new ActionManager(cats, [], false);
function update() {
  actionManager.update();
  window.requestAnimationFrame(update);
}

update();
