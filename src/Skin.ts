import Jimp from 'jimp'
import themes, { Theme } from './themes'
import md5 from 'md5'
import arrayFromHash from './arrayFromHash'
import getThemeFromHash from './Theme'

export default class Skin {
  username: string
  hash: string
  theme: Theme
  image: Jimp

  constructor (username: string) {
    this.username = username
    this.hash = md5(username)
    this.theme = getThemeFromHash(this.hash)
    this.image = this.createImageFromHash()
  }

  createImageFromHash (fHash = this.hash): Jimp {
    const image = this.image = new Jimp (64, 64, (err) => {
      if (err) throw err
    })
    const colors = this.theme.colors
    let hash = fHash
    const getHash = (): string => {
      const newHash = hash = md5(hash)
      return newHash
    }

    // Head
    // - Face
    arrayFromHash(fHash)
      .forEach((v, i) => {
        image.setPixelColor(colors[v], i % 4 + 8, Math.floor(i / 4) + 8)
        image.setPixelColor(colors[v], 7 - i % 4 + 8, Math.floor(i / 4) + 8)
      })

    // - Back
    arrayFromHash(getHash())
      .forEach((v, i) => {
        image.setPixelColor(colors[v], i % 4 + 24, Math.floor(i / 4) + 8)
        image.setPixelColor(colors[v], 7 - i % 4 + 24, Math.floor(i / 4) + 8)
      })

    // - Top & Bottom
    arrayFromHash(getHash())
      .forEach((v, i) => {
        image.setPixelColor(colors[v], i % 4 + 8, Math.floor(i / 4))
        image.setPixelColor(colors[v], 7 - i % 4 + 8, Math.floor(i / 4))
        image.setPixelColor(colors[v], i % 4 + 16, Math.floor(i / 4))
        image.setPixelColor(colors[v], 7 - i % 4 + 16, Math.floor(i / 4))
      })
    // - - Bottom Shadow
    image.composite(image.clone().crop(18, 2, 4, 4).brightness(-0.75), 18, 2)

    // - Sides
    const faceSide = new Jimp (8, 8, (err) => {
      if (err) throw err
    })
    arrayFromHash(getHash())
      .forEach((v, i) => {
        faceSide.setPixelColor(colors[v], Math.floor(i / 4), i % 4)
        faceSide.setPixelColor(colors[v], Math.floor(i / 4), 7 - i % 4)
      })
    image.composite(faceSide, 0, 8)
    image.composite(faceSide.mirror(false, true), 16, 8)

    // Body
    // - Front, Top & Bottom
    arrayFromHash(getHash(), 64)
      .forEach((v, i) => {
        image.setPixelColor(colors[v], i % 4 + 20, Math.floor(i / 4) + 16)
        image.setPixelColor(colors[v], 7 - i % 4 + 20, Math.floor(i / 4) + 16)
      })
    const bodyShadow = image.clone().crop(20, 16, 8, 4)
    image.composite(bodyShadow, 28, 16)
    image.composite(bodyShadow.crop(1, 1, 6, 2).brightness(-0.75), 29, 17)
    image.composite(bodyShadow.crop(1, 0, 4, 2), 22, 17)
    // - Back
    arrayFromHash(getHash(), 48)
      .forEach((v, i) => {
        image.setPixelColor(colors[v], i % 4 + 28, Math.floor(i / 4) + 20)
        image.setPixelColor(colors[v], 7 - i % 4 + 28, Math.floor(i / 4) + 20)
      })
    // - Sides
    arrayFromHash(getHash(), 48)
      .forEach((v, i) => {
        image.setPixelColor(colors[v], i % 4 + 16, Math.floor(i / 4) + 20)
        image.setPixelColor(colors[v], 7 - i % 4 + 32, Math.floor(i / 4) + 20)
      })
    const sideShadow = image.clone().crop(17, 21, 2, 2).brightness(-0.75)
    image.composite(sideShadow, 17, 21)
    image.composite(sideShadow.flip(false, true), 37, 21)

    return image
  }

  save (scale = 1, dir = 'skins') {
    if (scale > 1) {
      const image = this.image.clone()

      image.resize(8 * scale, 8 * scale, Jimp.RESIZE_NEAREST_NEIGHBOR)
      image.write(`${dir}/${this.username}.png`, (err) => {
        if (err) throw err
      })
    } else {
      this.image.write(`${dir}/${this.username}.png`, (err) => {
        if (err) throw err
      })
    }
  }
}
