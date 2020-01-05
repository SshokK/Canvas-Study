import { Loader, Sprite } from 'pixi.js'

export const loadSprite = (sprite, callback) => {
  if (Array.isArray(sprite)) {
    sprite.forEach((item) => {
      Loader.shared.add(item)
    })
  } else {
    Loader.shared.add(sprite)
  }

  Loader.shared.load(() => callback && callback(sprite))
}

export const getSprite = (sprite) => {
  return new Sprite(
    Loader.shared.resources[sprite].texture
  )
}
