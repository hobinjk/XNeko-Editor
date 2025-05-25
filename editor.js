import { ActionManager } from './ActionManager.js';
import { AnimatingCatsSpotPalette } from './AnimatingCatsSpotPalette.js';
import { Neko, Spritesheet, catNames } from './Neko.js';
import { Prop } from './Prop.js';
import { PropTemplate } from './PropTemplate.js';

import GUI from 'lil-gui';

const gui = new GUI();

let spotId = 1;
const ALLOWED_ACTIONS = Object.keys(Spritesheet);

const uploadImageInput = document.getElementById('upload-image');

let prop = {
  isFloorProp: false,
  width: 32,
  height: 32,
  spots: [],
  src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAbCAYAAAAdx42aAAAA0GVYSWZJSSoACAAAAAoAAAEEAAEAAAAgAAAAAQEEAAEAAAAbAAAAAgEDAAMAAACGAAAAEgEDAAEAAAABAAAAGgEFAAEAAACMAAAAGwEFAAEAAACUAAAAKAEDAAEAAAACAAAAMQECAA0AAACcAAAAMgECABQAAACqAAAAaYcEAAEAAAC+AAAAAAAAAAgACAAIAEgAAAABAAAASAAAAAEAAABHSU1QIDIuMTAuMzgAADIwMjU6MDI6MTYgMTk6MDY6MzEAAQABoAMAAQAAAAEAAAAAAAAAj/EGhAAAAYRpQ0NQSUNDIHByb2ZpbGUAAHicfZE9SMNQFIVPU6UiFRE7iDhkqE52URHBpVahCBVCrdCqg8lL/6BJQ5Li4ii4Fhz8Waw6uDjr6uAqCII/IO6Ck6KLlHhfUmgR44PH+zjvncN99wJCo8I0qysOaLptppMJMZtbFUOvEDAAoBuzMrOMOUlKwXd93SPAz7sYz/J/9+fqU/MWAwIicZwZpk28QTy9aRuc94kjrCSrxOfE4yYVSPzIdcXjN85FlwWeGTEz6XniCLFY7GClg1nJ1IiniKOqplO+kPVY5bzFWavUWKtO/sNwXl9Z5jrtESSxiCVIEKGghjIqsBGjUyfFQpruEz7+YdcvkUshVxmMHAuoQoPs+sFn8Lu3VmFywksKJ2gwL47zMQqEdoFm3XG+jx2neQIEn4Erve2vNoCZT9LrbS16BPRvAxfXbU3ZAy53gKEnQzZlVwrSFgoF4P2MxpQDBm+B3jWvb617nD4AGepV6gY4OATGipS97vPvns6+/fum1b8fbzlypfQET1kAAA14aVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOjE2ZWQxMmNmLTFmNzAtNDM5My1hNTM4LWFkNjU5OTMzYzlmMyIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3MWNmNzRhNC02NmQ1LTQzZDYtYWQ5MS1hNGEwNjhhZTg3ZmMiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjOWNhY2ZmNC1lYzAyLTRkYWItOWU0Mi1jMTMyZjA3N2U1Y2QiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJMaW51eCIKICAgR0lNUDpUaW1lU3RhbXA9IjE3Mzk3NTA3OTMyNTM2MTEiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4zOCIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjU6MDI6MTZUMTk6MDY6MzEtMDU6MDAiCiAgIHhtcDpNb2RpZnlEYXRlPSIyMDI1OjAyOjE2VDE5OjA2OjMxLTA1OjAwIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MTUyZWQ0MzktMTgxYi00YTk5LWE1ZTUtN2I5YTg4ODBmNjEyIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKExpbnV4KSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNS0wMi0xNlQxOTowNjozMy0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz52CQ0MAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH6QIRAAYhdck0qAAAAstJREFUSMelV89rE0EU/mYJ2JuoSUN+7KFlbWC7YCGHUrDSSump9/wN3griUaT0KII3j96EHPRUvVRB1IuHgkJcqAY9LJuQJk3xVi8dL7717ctMdqMDYXcnb9/3vW/evHmrkHM8f/NChx/eTcz3fv5C9fKl1NzcvAsAuL21heb1G2qaX5UF/PDJI31+EiVg4/jP/WCY2FTLJfQGQ1TLJVytuRjHEQLfSxG6d+eumonA/t6upvtO2P0bMQPuj2JUijXj+9VyKUXCRkSZpH798jCR1QTOncv/+6M4eSZyZE/Ldf/BY2UkYIuanG9vrk2sMwAsLi3g+9cfoKXqhF0cffmEs9ML+A0X/VGM5vJKShEioTi4TKhO2E2i3t5cw9y8i/OTKLlKefkckTApwUkUuJNxHGEcA4HvpRSgyAlAgpvmCIjnDB/k3wGAVmtHS8nJQbVcwv8OnheEE/gejr591g490I+MuKFtSNKmIGQApEgn7OLVs6dQ+3u7qei5/BJc2uUZlEeUiPL9gg3MBpAXWNqHx1FSrIhY4HtwZNSmiCVJk23W8BtuUjH5UjimyPi9JGFSgWoCrw22RCQFaGc5tohIIgKbJj1twcWlBfg3bxlV5IWoNxgmiV6Y5jxLejlPpKUNL2hya6v1jVVtOjg4uMlx1ta05ZUkVpDVikuelWymHcRV4dHTmnM1eoMhlBfUdaVYSx00WSBckSySNjsioVqtHW07ZmfZ8zYi3B/HAYB2+0ApAFjfWNX8j6zyO2s+yMipKrbbB8qR+5S2SB5J8xak3mCYyjNekpN+wAvq+uz0AleuOagUa8aWapbl4ElMUZNfkn+iI/KCuuYNhNyz/1ovJIn3bz8qa0/IlaBrc3kldZCYTk6b9DIIinxqV0xKyOaSy2giZGrVTVHn/i4gItRchscR/Iabqy2nYQPO/WEiFakUawmwvM4CTOM3laLxwu8VRakAAAAASUVORK5CYII=',
  addSpot: function() {
    let spot = {
      id: spotId,
      x: Math.round(prop.width / 4 * (Math.random() * 2 + 1)),
      y: Math.round(prop.height / 4 * (Math.random() * 2 + 1)),
      allowedActions: ['sleep', 'alert'],
    };
    prop.spots.push(spot);
    let folder = gui.addFolder('Spot');
    spot.controlX = folder.add(spot, 'x').onChange(onPropChange);
    spot.controlY = folder.add(spot, 'y').onChange(onPropChange);
    let aaFolder = folder.addFolder('Allowed Actions');
    let aaMap = {
    };
    for (let allowedAction of ALLOWED_ACTIONS) {
      aaMap[allowedAction] = false;
      let control = aaFolder.add(aaMap, allowedAction);
      control.onChange(() => {
        spot.allowedActions = ALLOWED_ACTIONS.filter(action => aaMap[action]);
        onPropChange();
      });
    }

    spotId += 1;
  },
  save: function() {
    const template = actionManager.props[0].propTemplate.serialize();
    const templateText = JSON.stringify(template, null, 2);
    navigator.clipboard.writeText(templateText).catch(e => {
      console.warn(e);
    });
    onPropChange();
  },
  uploadImage: function() {
    uploadImageInput.click();
  },
}

function onPropChange() {
  for (let prop of actionManager.props) {
    prop.remove();
  }
  actionManager.props = [];

  let template = PropTemplate.deserialize(prop)
  template.addSpotMarkers();
  let x = innerWidth / 2;
  let y = innerHeight / 2;
  actionManager.props.push(new Prop(null, x, y, template));
  // for (let i = 0; i < 5; i++) {
  //   let x = innerWidth / 6 * (Math.random() * 4 + 1);
  //   let y = innerHeight / 6 * (Math.random() * 4 + 1);
  //   actionManager.props.push(new Prop(null, x, y, template));
  // }
}
gui.add(prop, 'isFloorProp').name('Prop lies flat on floor').onChange(onPropChange);
let widthControl = gui.add(prop, 'width').onChange(onPropChange);
let heightControl = gui.add(prop, 'height').onChange(onPropChange);
gui.add(prop, 'uploadImage').name('Upload Image');
gui.add(prop, 'addSpot').onChange(onPropChange);
gui.add(prop, 'save');

uploadImageInput.onchange = onUploadImageChange;

function onUploadImageChange(event) {
  let file = event.target.files[0];
  if (!file) {
    return;
  }
  let reader = new FileReader();
  reader.onload = () => {
    prop.src = reader.result;
    let image = document.createElement('img');
    image.onload = () => {
      widthControl.setValue(image.naturalWidth);
      heightControl.setValue(image.naturalHeight);
    };
    image.src = prop.src;
    onPropChange();
  };
  reader.readAsDataURL(file);
}

let cats = [];

// Preview
let actionManager = new ActionManager(cats, [], true);
function update() {
  actionManager.update();
  palette.update();
  window.requestAnimationFrame(update);
}

// for (let i = 0; i < 4; i++) {
//   let name = catNames[i];
//   cats.push(new Neko(actionManager, name, null, 10000000, {
//     avatarSrc: '',
//     postUrl: '',
//   }));
// }

let palette = new AnimatingCatsSpotPalette(prop);

update();
