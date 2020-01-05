import * as PIXI from 'pixi.js'
import Dyno from 'Sprites/test.png'
import { getSprite, loadSprite } from 'Utils/sprites-helpers'

let app = new PIXI.Application({
    width: 256,
    height: 256,
    antialias: true,
    transparent: false,
    resolution: 1
  }
);

document.getElementById('root').appendChild(app.view);

loadSprite(Dyno, (sprite) => {
  let Dyno = getSprite(sprite)
  app.stage.addChild(Dyno);
})
