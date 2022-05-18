import Jimp from 'jimp'
import { Theme } from './themes'
import md5 from 'md5'
import arrayFromHash from './arrayFromHash'
import getThemeFromHash from './Theme'

export default class Avatar {
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

  createImageFromHash (hash = this.hash): Jimp {
    const image = this.image = new Jimp(8, 8, (err, image) => {
      if (err) throw err
    })
    const colors = this.theme.colors

    arrayFromHash(hash)
      .forEach((elem, index) => {
        image.setPixelColor(colors[elem], index % 4, Math.floor(index / 4))
        image.setPixelColor(colors[elem], 7 - index % 4, Math.floor(index / 4))
      })

    return image
  }

  save (scale = 1, dir = 'avatars') {
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
