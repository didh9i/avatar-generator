import Jimp from 'jimp'
import { Theme } from './themes'
import md5 from 'md5'
import arrayFromHash from './arrayFromHash'
import getThemeFromHash from './Theme'

let shadows = new Jimp(64, 64, (err) => {
  if (err) {
    throw err
  }
})

Jimp.read('./src/assets/shadows.png')
  .then((image) => {
    shadows = image
  })

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
    const image = this.image = new Jimp(64, 64, (err) => {
      if (err) {
        throw err
      }
    })
    const colors = this.theme.colors
    let hash = fHash
    const getHash = (): string => {
      hash = md5(hash)
      return hash
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

    // - Sides
    const faceSide = new Jimp(8, 8, (err) => {
      if (err) {
        throw err
      }
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
    const bodyShadow = image.clone()
      .crop(20, 16, 8, 4)
    image.composite(bodyShadow, 28, 16)
    // - Back
    arrayFromHash(getHash(), 48)
      .forEach((v, i) => {
        image.setPixelColor(colors[v], i % 4 + 32, Math.floor(i / 4) + 20)
        image.setPixelColor(colors[v], 7 - i % 4 + 32, Math.floor(i / 4) + 20)
      })
    // - Sides
    arrayFromHash(getHash(), 48)
      .forEach((v, i) => {
        image.setPixelColor(colors[v], i % 4 + 16, Math.floor(i / 4) + 20)
        image.setPixelColor(colors[v], 7 - i % 4 + 24, Math.floor(i / 4) + 20)
      })

    // Legs
    arrayFromHash(getHash(), 64)
      .forEach((v, i) => {
        image.setPixelColor(colors[v], i % 4 + 4, Math.floor(i / 4) + 16)
      })
    arrayFromHash(getHash(), 64)
      .forEach((v, i) => {
        image.setPixelColor(colors[v], 7 - i % 4 + 4, Math.floor(i / 4) + 16)
      })
    arrayFromHash(getHash(), 48)
      .forEach((v, i) => {
        image.setPixelColor(colors[v], i % 4, Math.floor(i / 4) + 20)
        image.setPixelColor(colors[v], 7 - i % 4 + 8, Math.floor(i / 4) + 20)
      })
    image.composite(image.clone()
      .crop(0, 16, 16, 16), 16, 48)
    // Arms
    arrayFromHash(getHash(), 64)
      .forEach((v, i) => {
        image.setPixelColor(colors[v], i % 4 + 44, Math.floor(i / 4) + 16)
      })
    arrayFromHash(getHash(), 64)
      .forEach((v, i) => {
        image.setPixelColor(colors[v], 7 - i % 4 + 44, Math.floor(i / 4) + 16)
      })
    arrayFromHash(getHash(), 48)
      .forEach((v, i) => {
        image.setPixelColor(colors[v], i % 4 + 40, Math.floor(i / 4) + 20)
        image.setPixelColor(colors[v], 7 - i % 4 + 48, Math.floor(i / 4) + 20)
      })
    image.composite(image.clone()
      .crop(40, 16, 16, 16), 32, 48)
    image.composite(shadows, 0, 0)

    return image
  }

  save (scale = 1, dir = 'skins') {
    if (scale > 1) {
      const image = this.image.clone()

      image.resize(8 * scale, 8 * scale, Jimp.RESIZE_NEAREST_NEIGHBOR)
      image.write(`${dir}/${this.username}.png`, (err) => {
        if (err) {
          throw err
        }
      })
    } else {
      this.image.write(`${dir}/${this.username}.png`, (err) => {
        if (err) {
          throw err
        }
      })
    }
  }
}
