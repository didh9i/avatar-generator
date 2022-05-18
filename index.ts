import * as readline from 'readline'
import Avatar from './src/Avatar'
import usernameRegExp from './src/usernameRegExp'
import Skin from './src/Skin'
import ConsoleImage from './src/ConsoleImage'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

let mode = 'default'

rl.addListener('line', line => {
  if (line[0] === '/') {
    if (line === '/exit') {
      rl.close()
      process.exit(0)
    }

    if (line === '/skin') {
      mode = 'skin'
      console.log('Mode set to "skin"')
      return
    }

    if (line === '/avatar') {
      mode = 'avatar'
      console.log('Mode set to "avatar"')
      return
    }

    if (line === '/default') {
      mode = 'default'
      console.log('Mode set to "default"')
      return
    }

    console.warn('Unknown command')
  } else if (usernameRegExp.test(line)) {
    if (mode === 'avatar' || mode === 'default') {
      const avatar = new Avatar(line)
      // ConsoleImage(avatar.image)
      avatar.save()
    }
    if (mode === 'skin' || mode === 'default') {
      const skin = new Skin(line)
      ConsoleImage(skin.image.clone().crop(0, 0, 64, 32))
      skin.save()
    }
  } else {
    console.warn('Invalid Username')
  }
})
