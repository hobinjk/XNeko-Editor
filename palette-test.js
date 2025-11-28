import { ActionManager } from "./ActionManager";
import { Neko } from "./Neko";
import { getBestPaletteAndSpritesheetForImage, getSpritesheetFromSavedResults } from "./palette";

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
      let results = await getBestPaletteAndSpritesheetForImage(image);
      const sheetUrl = await getSpritesheetFromSavedResults(results.sheetName, results.palette);
      cats.push(new Neko(actionManager, 'custom', sheetUrl, 90000000, {
        avatarSrc: reader.result,
        postUrl: '',
        visitCount: 0,
      }));
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
